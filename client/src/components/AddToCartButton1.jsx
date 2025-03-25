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
    const [qty, setQty] = useState(0)
    const [cartItemDetails,setCartItemsDetails] = useState()

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    //checking this item in cart or not
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item.productId._id === data._id)
        setQty(product?.quantity)
        setCartItemsDetails(product)
    }, [data, cartItem])


    const increaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
    
       const response = await  updateCartItem(cartItemDetails?._id,qty+1)
        
       if(response.success){
        toast.success("Item added")
       }
    }

    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        if(qty === 1){
            deleteCartItem(cartItemDetails?._id)
        }else{
            const response = await updateCartItem(cartItemDetails?._id,qty-1)

            if(response.success){
                toast.success("Item remove")
            }
        }
    }
    return (
        <div className="w-full max-w-full flex justify-center">
        <button      
           onClick={handleADDTocart}      
           className="border border-black text-black hover:bg-black hover:text-white 
                      px-2 py-1 
                      lg:px-4 lg:py-2 
                      rounded-md 
                      flex items-center justify-center text-center 
                      w-40 sm:w-48 md:w-56 
                      text-sm sm:text-base"
        >
          {loading ? <Loading /> : "Add to Cart"}
        </button>
     </div>
    )
// return (
//     <div className="w-full max-w-full flex justify-center">
//         <button 
//             onClick={handleADDTocart} 
//             className="relative overflow-hidden border border-current text-current font-semibold px-4 py-2 lg:p-2 rounded-md flex items-center justify-center text-center w-56 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg hover:bg-black hover:text-white"
//         >
//             {loading ? <Loading /> : "Add to Cart"}
//         </button>
//     </div>
// );

}

export default AddToCartButton
