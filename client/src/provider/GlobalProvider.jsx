import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";
import { handleAddItemWishlist } from "../store/wishlist";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const user = useSelector((state) => state?.user);

  // Cart Functions
  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // Wishlist Functions
  const fetchWishlistItems = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getWishlistItems,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemWishlist(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await Axios({
        ...SummaryApi.addToWishlist,
        data: {
          productId: productId,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchWishlistItems();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      const response = await Axios({
        ...SummaryApi.removeFromWishlist,
        data: {
          _id: wishlistId,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchWishlistItems();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId._id === productId);
  };

  const toggleWishlistItem = async (productId) => {
    const existingItem = wishlist.find((item) => item.productId._id === productId);
    if (existingItem) {
      return await removeFromWishlist(existingItem._id);
    } else {
      return await addToWishlist(productId);
    }
  };

  useEffect(() => {
    const qty = cartItem.reduce((preve, curr) => {
      return preve + curr.quantity;
    }, 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((preve, curr) => {
      const priceAfterDiscount = pricewithDiscount(
        curr?.productId?.price,
        curr?.productId?.discount
      );
      return preve + priceAfterDiscount * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);

    const notDiscountPrice = cartItem.reduce((preve, curr) => {
      return preve + curr?.productId?.price * curr.quantity;
    }, 0);
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  const handleLogoutOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
    dispatch(handleAddItemWishlist([]));
  };

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      // AxiosToastError(error)
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllOrder = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAllOrderItems,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItem();
      fetchWishlistItems();
      fetchAddress();
      fetchOrder();
      fetchAllOrder();
    } else {
      handleLogoutOut();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        // Cart related
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        
        // Address related
        fetchAddress,
        
        // Order related
        fetchOrder,
        fetchAllOrder,
        
        // Wishlist related
        fetchWishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlistItem,
        wishlist, // expose wishlist data
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;