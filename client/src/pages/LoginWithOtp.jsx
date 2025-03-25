import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const LoginWithOtp = () => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState(1); // 1: Enter mobile, 2: Enter OTP
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputRefs = useRef([]);

    // Initialize refs for OTP inputs
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        
        if (!mobile || mobile.length < 10) {
            toast.error('Please enter a valid mobile number');
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.requestSmsOtp,
                data: { mobile }
            });
            
            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message || 'OTP sent successfully');
                setStep(2);
                // Focus first OTP input after transitioning to step 2
                setTimeout(() => {
                    if (inputRefs.current[0]) {
                        inputRefs.current[0].focus();
                    }
                }, 100);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        // Update the OTP array with the new value at the given index
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1); // Only take the first character
        setOtp(newOtp);

        // If a digit was entered and there's a next input, focus it
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // If current field is empty and backspace is pressed, focus previous field
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        
        // If pasted content is numeric and has a reasonable length
        if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
            const newOtp = [...otp];
            
            // Fill in the OTP fields with the pasted digits
            for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
                newOtp[i] = pastedData[i];
            }
            
            setOtp(newOtp);
            
            // Focus the appropriate field based on paste length
            const focusIndex = Math.min(pastedData.length, 5);
            if (inputRefs.current[focusIndex]) {
                inputRefs.current[focusIndex].focus();
            }
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.verifySmsOtp,
                data: { mobile, otp: otpString }
            });
            
            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message || 'Login successful');
                
                // Store tokens
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                
                // Update user state
                dispatch(setUserDetails(response.data.data.user));
                
                // Redirect to dashboard
                navigate('/');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const resendOtp = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.requestSmsOtp,
                data: { mobile }
            });
            
            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message || 'OTP resent successfully');
                // Reset OTP fields
                setOtp(['', '', '', '', '', '']);
                // Focus first input
                if (inputRefs.current[0]) {
                    inputRefs.current[0].focus();
                }
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-8 w-full max-w-md mx-auto rounded-lg shadow-lg p-8 border border-gray-200'>
                <h2 className='text-2xl font-bold text-center text-black mb-2'>Welcome to BabyIsland</h2>
                <p className='text-gray-600 text-sm text-center mb-6'>
                    {step === 1 ? 'Login with your mobile number' : 'Verify your mobile number'}
                </p>

                {step === 1 ? (
                    <form className='grid gap-5 mt-4' onSubmit={handleRequestOtp}>
                        <div className='grid gap-2'>
                            <label htmlFor='mobile' className='text-sm font-medium text-gray-700'>Mobile Number</label>
                            <input
                                type='number'
                                id='mobile'
                                autoFocus
                                className='bg-gray-50 p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder='Enter your mobile number'
                                required
                            />
                            <p className='text-xs text-gray-500 mt-1'>We'll send a verification code to this number</p>
                        </div>

                        <button 
                            disabled={!mobile} 
                            className={`${mobile ? "bg-black hover:bg-gray-800" : "bg-gray-400"} text-white py-3 rounded-md font-medium tracking-wide transition-colors mt-2`}
                        >
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form className='grid gap-5 mt-4' onSubmit={handleVerifyOtp}>
                        <div className='grid gap-2'>
                            <label htmlFor='otp' className='text-sm font-medium text-gray-700'>Verification Code</label>
                            
                            <div className='flex justify-center gap-2 my-2' onPaste={handlePaste}>
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type='text'
                                        maxLength='1'
                                        className='w-10 h-12 text-center text-lg font-bold bg-gray-50 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all'
                                        value={otp[index]}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        inputMode='numeric'
                                    />
                                ))}
                            </div>
                            
                            <p className='text-xs text-gray-500 mt-1 text-center'>
                                Enter the 6-digit code sent to {mobile}
                            </p>
                        </div>

                        <button 
                            disabled={otp.join('').length !== 6} 
                            className={`${otp.join('').length === 6 ? "bg-black hover:bg-gray-800" : "bg-gray-400"} text-white py-3 rounded-md font-medium tracking-wide transition-colors mt-2`}
                        >
                            Verify &amp; Login
                        </button>
                        
                        <div className='flex justify-between mt-2'>
                            <button 
                                type="button"
                                onClick={() => setStep(1)} 
                                className="text-gray-600 hover:text-black transition-colors text-sm"
                            >
                                Change Mobile Number
                            </button>
                            <button
                                type="button"
                                onClick={resendOtp}
                                className="text-gray-600 hover:text-black transition-colors text-sm"
                            >
                                Resend OTP
                            </button>
                        </div>
                    </form>
                )}

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                    </div>
                </div>

                <div className="text-center">
                    <Link to="/login" className="font-medium text-black hover:underline transition-all inline-block py-2">
                        Login with Email
                    </Link>
                </div>

                <p className='mt-6 text-center text-gray-600'>
                    Don't have an account? <Link to="/register" className='font-medium text-black hover:underline transition-all'>Register</Link>
                </p>
            </div>
        </section>
    );
};

export default LoginWithOtp;