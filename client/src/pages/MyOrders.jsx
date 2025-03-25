import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import { useGlobalContext } from '../provider/GlobalProvider'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
   const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContext()

  console.log("order Items",orders)
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id + index + "order"} className="order rounded p-4 text-sm border shadow-md">
              <p className="mb-3 font-semibold">Order No: {order?.orderId}</p>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Left: Product Details */}
                <div className="flex gap-4 items-center">
                  <img src={order.product_details.image[0]} className="w-16 h-16 object-cover rounded" />
                  <div className="space-y-1">
                    <p className="font-medium">{order.product_details.name}</p>
                    <p className="text-gray-600">Price: ₹{order.totalAmt}</p>
                    <p className="text-green-600">Discount: {order.product_details.discount}%</p>
                    <p>Quntity total</p>
                    <p className='flex items-center gap-2'>{totalQty} item</p>
                    <p className="text-gray-600">Size: {order.size}</p>
                    <p className="text-gray-600">Color: {order.product_details.colors}</p>
                    
                  </div>
                </div>
            
                {/* Right: Address Details */}
                <div className="md:text-start text-gray-700 text-sm leading-relaxed">
                  <p className="font-medium">{order.delivery_address?.mobile}</p>
                  <p>{order.delivery_address?.address_line}</p>
                  <p>
                    {order.delivery_address?.city}, {order.delivery_address?.state} - {order.delivery_address?.zipcode}
                  </p>
                </div>
              </div>
            </div>
            
            
            )
          })
        }
    </div>
  )
}

export default MyOrders