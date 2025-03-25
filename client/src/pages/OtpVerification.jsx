import React, { useEffect, useRef, useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""]);
    const navigate = useNavigate();
    const inputRef = useRef([]);
    const location = useLocation();

    useEffect(() => {
        if(!location?.state?.email) {
            navigate("/forgot-password");
        }
    }, []);

    const valideValue = data.every(el => el);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            });
            
            if(response.data.error) {
                toast.error(response.data.message);
            }

            if(response.data.success) {
                toast.success(response.data.message);
                setData(["","","","","",""]);
                navigate("/reset-password", {
                    state: {
                        data: response.data,
                        email: location?.state?.email
                    }
                });
            }
        } catch (error) {
            console.log('error', error);
            AxiosToastError(error);
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && !data[index] && index > 0) {
            inputRef.current[index-1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        if (pastedData.length <= 6 && /^\d+$/.test(pastedData)) {
            const newData = [...data];
            for (let i = 0; i < pastedData.length; i++) {
                if (i < 6) {
                    newData[i] = pastedData[i];
                }
            }
            setData(newData);
            if (pastedData.length < 6) {
                inputRef.current[pastedData.length].focus();
            }
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-8 w-full max-w-md mx-auto rounded shadow-md p-8 border border-gray-200'>
                <h2 className='font-semibold text-xl text-gray-800 mb-2'>Verification Required</h2>
                <p className='text-gray-600 text-sm mb-6'>Please enter the 6-digit code sent to your email</p>
                
                <form className='grid gap-6' onSubmit={handleSubmit}>
                    <div className='grid gap-3'>
                        <label htmlFor='otp' className='text-sm font-medium text-gray-700'>Enter verification code:</label>
                        <div className='flex items-center gap-2 justify-between'>
                            {
                                data.map((element, index) => (
                                    <input
                                        key={"otp"+index}
                                        type='text'
                                        id={`otp-${index}`}
                                        ref={(ref) => {
                                            inputRef.current[index] = ref;
                                            return ref;
                                        }}
                                        value={data[index]}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                            if (value.length <= 1) {
                                                const newData = [...data];
                                                newData[index] = value;
                                                setData(newData);

                                                if (value && index < 5) {
                                                    inputRef.current[index+1].focus();
                                                }
                                            }
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={index === 0 ? handlePaste : null}
                                        maxLength={1}
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        className='bg-gray-50 w-12 h-12 border border-gray-300 rounded-md outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 text-center font-semibold text-gray-800 text-lg transition-all'
                                    />
                                ))
                            }
                        </div>
                        <p className='text-xs text-gray-500 mt-2'>Didn't receive a code? <button type="button" className='text-gray-800 font-medium underline'>Resend</button></p>
                    </div>
             
                    <button 
                        disabled={!valideValue} 
                        className={`${valideValue ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"} text-white py-3 rounded-md font-medium tracking-wide transition-colors duration-200`}
                    >
                        Verify Code
                    </button>

                </form>

                <div className='mt-6 text-center text-sm text-gray-600'>
                    <p>
                        Already have an account? <Link to="/login" className='font-medium text-black hover:underline'>Sign in</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OtpVerification;