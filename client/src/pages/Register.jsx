import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(data.password !== data.confirmPassword){
            toast.error(
                "Password and confirm password must be same"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    mobile: "",
                    password : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }
    
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-8 w-full max-w-lg mx-auto rounded-md p-8 shadow-md border border-gray-200'>
                <h2 className='text-2xl font-bold text-black mb-2'>Create Account</h2>
                <p className='text-gray-600 mb-6'>Welcome to BabyIsland</p>

                <form className='grid gap-5 mt-4' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <label htmlFor='name' className='text-sm font-medium text-gray-700'>Full Name</label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='bg-gray-50 p-3 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-black focus:border-black transition-all'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email Address</label>
                        <input
                            type='email'
                            id='email'
                            className='bg-gray-50 p-3 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-black focus:border-black transition-all'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor='mobile' className='text-sm font-medium text-gray-700'>Mobile Number</label>
                        <input
                            type='text'
                            id='mobile'
                            className='bg-gray-50 p-3 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-black focus:border-black transition-all'
                            name='mobile'
                            value={data.mobile}
                            onChange={handleChange}
                            placeholder='Enter your mobile number'
                        />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor='password' className='text-sm font-medium text-gray-700'>Password</label>
                        <div className='bg-gray-50 p-3 border border-gray-300 rounded-md flex items-center focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none bg-transparent'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer text-gray-500 hover:text-black ml-2'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor='confirmPassword' className='text-sm font-medium text-gray-700'>Confirm Password</label>
                        <div className='bg-gray-50 p-3 border border-gray-300 rounded-md flex items-center focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full outline-none bg-transparent'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm your password'
                            />
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer text-gray-500 hover:text-black ml-2'>
                                {
                                    showConfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <button 
                        disabled={!valideValue} 
                        className={`${valideValue ? "bg-black hover:bg-gray-800" : "bg-gray-400"} 
                        text-white py-3 rounded-md font-medium mt-3 tracking-wide transition-colors`}
                    >
                        Create Account
                    </button>
                </form>

                <p className='mt-6 text-center text-gray-600'>
                    Already have an account? <Link to={"/login"} className='font-medium text-black hover:underline'>Log in</Link>
                </p>
            </div>
        </section>
    )
}

export default Register