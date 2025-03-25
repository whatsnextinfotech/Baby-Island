import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            });
            
            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                
                // Store tokens
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                
                // Update user state
                dispatch(setUserDetails(response.data.data.user));
                
                // Navigate to dashboard
                navigate('/');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-8 w-full max-w-md mx-auto rounded-lg shadow-lg p-8 border border-gray-200'>
                <h2 className='text-2xl font-bold text-center text-black mb-2'>Welcome to BabyIsland</h2>
                

                <form className='grid gap-5 mt-4' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email Address</label>
                        <input
                            type='email'
                            id='email'
                            autoFocus
                            className='bg-gray-50 p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor='password' className='text-sm font-medium text-gray-700'>Password</label>
                        <div className='bg-gray-50 p-3 border border-gray-300 rounded-md flex items-center focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-transparent transition-all'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full bg-gray-50 outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer text-gray-500 hover:text-black transition-colors ml-2'>
                                {
                                    showPassword ? (
                                        <FaRegEye size={18} />
                                    ) : (
                                        <FaRegEyeSlash size={18} />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-black transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    <button 
                        disabled={!validValue} 
                        className={`${validValue ? "bg-black hover:bg-gray-800" : "bg-gray-400"} text-white py-3 rounded-md font-medium tracking-wide transition-colors`}
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="text-center">
                    <Link to="/login-with-otp" className="font-medium text-black hover:underline transition-all inline-block py-2">
                        Login with OTP
                    </Link>
                </div>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account? <Link to="/register" className='font-medium text-black hover:underline transition-all'>Register</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;