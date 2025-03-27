export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
    // Add these to your SummaryApi.js file
requestSmsOtp: {
    url: '/api/user/request-sms-otp',
    method: 'POST',
  },
  verifySmsOtp: {
    url: '/api/user/verify-sms-otp',
    method: 'POST',
  },
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    forgot_password : {
        url : "/api/user/forgot-password",
        method : 'put'
    },
    forgot_password_otp_verification : {
        url : 'api/user/verify-forgot-password-otp',
        method : 'put'
    },
    // Add to SummaryApi.js
requestOtp: {
    url: '/api/user/request-otp',
    method: 'POST',
},
    resetPassword : {
        url : "/api/user/reset-password",
        method : 'put'
    },
    refreshToken : {
        url : 'api/user/refresh-token',
        method : 'post'
    },
    userDetails : {
        url : '/api/user/user-details',
        method : "get"
    },
    logout : {
        url : "/api/user/logout",
        method : 'get'
    },
    uploadAvatar : {
        url : "/api/user/upload-avatar",
        method : 'put'
    }, 
    updateUserDetails : {
        url : '/api/user/update-user',
        method : 'put'
    },
    addCategory : {
        url : '/api/category/add-category',
        method : 'post'
    },
    uploadImage : {
        url : '/api/file/upload',
        method : 'post'
    },
  
    getCategory : {
        url : '/api/category/get',
        method : 'get'
    },
    updateCategory : {
        url : '/api/category/update',
        method : 'put'
    },
    deleteCategory : {
        url : '/api/category/delete',
        method : 'delete'
    },
    createSubCategory : {
        url : '/api/subcategory/create',
        method : 'post'
    },
    getSubCategory : {
        url : '/api/subcategory/get',
        method : 'post'
    },
    updateSubCategory : {
        url : '/api/subcategory/update',
        method : 'put'
    },
    deleteSubCategory : {
        url : '/api/subcategory/delete',
        method : 'delete'
    },
    createProduct : {
        url : '/api/product/create',
        method : 'post'
    },
    getProduct : {
        url : '/api/product/get',
        method : 'post'
    },
    getProductByCategory : {
        url : '/api/product/get-product-by-category',
        method : 'post'
    },
    getProductByCategoryAndSubCategory : {
        url : '/api/product/get-pruduct-by-category-and-subcategory',
        method : 'post'
    },
    getProductDetails : {
        url : '/api/product/get-product-details',
        method : 'post'
    },
    updateProductDetails : {
        url : "/api/product/update-product-details",
        method : 'put'
    },
    deleteProduct : {
        url : "/api/product/delete-product",
        method : 'delete'
    },
    searchProduct : {
        url : '/api/product/search-product',
        method : 'post'
    },
    addTocart : {
        url : "/api/cart/create",
        method : 'post'
    },
    getCartItem : {
        url : '/api/cart/get',
        method : 'get'
    },
    updateCartItemQty : {
        url : '/api/cart/update-qty',
        method : 'put'
    },
    deleteCartItem : {
        url : '/api/cart/delete-cart-item',
        method : 'delete'
    },
        // Wishlist APIs
        addToWishlist: {
            url: '/api/wishlist/add',
            method: 'POST'
        },
        getWishlistItems: {
            url: '/api/wishlist/get',
            method: 'GET'
        },
        removeFromWishlist: {
            url: '/api/wishlist/remove',
            method: 'DELETE'
        },
        
         // Customer Review API
    createReview: {
        url: '/api/reviews/review',
        method: 'post'
    },
    getAllReviews: {
        url: '/api/reviews/review',
        method: 'get'
    },
    getReviewById: {
        url: '/api/reviews/review/:id',
        method: 'get'
    },
    updateReview: {
        url: '/api/reviews/review/',
        method: 'put'
    },
    deleteReview: {
        url: '/api/reviews/review/:id',
        method: 'delete'
    },

    createAddress : {
        url : '/api/address/create',
        method : 'post'
    },
    getAddress : {
        url : '/api/address/get',
        method : 'get'
    },
    updateAddress : {
        url : '/api/address/update',
        method : 'put'
    },
    disableAddress : {
        url : '/api/address/disable',
        method : 'delete'
    },
    CashOnDeliveryOrder : {
        url : "/api/order/cash-on-delivery",
        method : 'post'
    },
    payment_url : {
        url : "/api/order/checkout",
        method : 'post'
    },
    getOrderItems : {
        url : '/api/order/order-list',
        method : 'get'
    },
    getAllOrderItems : {
        url : '/api/order/all-orders',
        method : 'get'
    },


    // Carousel API
    getCarouselImages: {
        url: '/api/carousel/',
        method: 'get'
    },
    addCarouselImage: {
        url: '/api/carousel/add',
        method: 'post'
    },
    updateCarouselImage: {
        url: '/api/carousel/update',
        method: 'put'
    },
    deleteCarouselImage: {
        url: '/api/carousel/delete',
        method: 'delete'
    },
    createReview: {
        url: '/api/reviews/review',
        method: 'post'
      },
      getReviewById: {
        url: '/api/reviews/review/:id',
        method: 'get'
      }
}

export default SummaryApi