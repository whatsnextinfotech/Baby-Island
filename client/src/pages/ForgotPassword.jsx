import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
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


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                  state : data
                })
                setData({
                    email : "",
                })
                
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-8 w-full max-w-lg mx-auto rounded-md p-8 shadow-md border border-gray-200'>
                <h2 className='text-2xl font-bold text-black mb-2'>Forgot Password</h2>
                <p className='text-gray-600 mb-4'>Enter your email to receive a password reset code</p>
                
                <form className='grid gap-5 py-4' onSubmit={handleSubmit}>
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
                            autoFocus
                        />
                    </div>
             
                    <button 
                        disabled={!valideValue} 
                        className={`${valideValue ? "bg-black hover:bg-gray-800" : "bg-gray-400"} 
                        text-white py-3 rounded-md font-medium mt-3 tracking-wide transition-colors`}
                    >
                        Send Verification Code
                    </button>
                </form>

                <div className='mt-6 text-center'>
                    <p className='text-gray-600'>
                        Remember your password? <Link to={"/login"} className='font-medium text-black hover:underline'>Log in</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword