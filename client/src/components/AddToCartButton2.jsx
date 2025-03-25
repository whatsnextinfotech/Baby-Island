import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [cartItemDetails, setCartItemsDetails] = useState()
    const [qty, setQty] = useState(1) // Default quantity before adding

    // Check if item is already in the cart
    useEffect(() => {
        const product = cartItem.find(item => item.productId._id === data._id)
        setIsAvailableCart(!!product)
        setCartItemsDetails(product)
        if (product) {
            setQty(product.quantity) // Update quantity if item exists in cart
        }
    }, [data, cartItem])

    const increaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setQty(prev => prev + 1)
    }

    const decreaseQty = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (qty > 1) {
            setQty(prev => prev - 1)
        }
    }

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id,
                    quantity: qty // Store selected quantity in cart
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCartItem && fetchCartItem() // Refresh cart
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    const increaseCartQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
    
        const response = await updateCartItem(cartItemDetails?._id, cartItemDetails?.quantity + 1)
        
        if (response.success) {
            toast.success("Item quantity increased")
        }
    }

    const decreaseCartQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (cartItemDetails?.quantity === 1) {
            deleteCartItem(cartItemDetails?._id)
        } else {
            const response = await updateCartItem(cartItemDetails?._id, cartItemDetails?.quantity - 1)
            if (response.success) {
                toast.success("Item quantity decreased")
            }
        }
    }

    return (
        <div className='w-full max-w-[180px]'>
            {!isAvailableCart ? (
                <div className="flex items-center gap-2">
                    <button onClick={decreaseQty} className='text-black p-1 border border-black rounded'><FaMinus /></button>
                    
                    <p className='font-semibold px-2'>{qty}</p>
                    
                    <button onClick={increaseQty} className='text-black p-1 border border-black rounded'><FaPlus /></button>

                    <button onClick={handleADDTocart} className='text-black border border-black px-4 py-1 rounded'>
                        {loading ? <Loading /> : "Add to Cart"}
                    </button>
                </div>
            ) : (
                <div className='flex w-full h-full'>
                    <button onClick={decreaseCartQty}
                        className='text-black flex-1 p-1 rounded border border-black flex items-center justify-center'>
                        <FaMinus />
                    </button>

                    <p className='flex-1 font-semibold px-1 flex items-center justify-center'>{cartItemDetails?.quantity}</p>

                    <button onClick={increaseCartQty}
                        className='text-black border border-black flex-1 p-1 rounded flex items-center justify-center'>
                        <FaPlus />
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddToCartButton
