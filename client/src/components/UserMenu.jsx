import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout
      });
      if (response.data.success) {
        if (close) close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) close();
  };

  return (
    <div className="text-black">
      {/* My Account Section - Clickable */}
      <Link
        to="/dashboard/profile"
        onClick={handleClose}
        className="block hover:bg-gray-200 rounded px-2 py-1 transition-colors duration-200"
      >
        <div className="font-semibold text-base">My Account</div>
        <div className="text-sm flex items-center gap-2 mt-1">
          <span className="max-w-52 text-ellipsis line-clamp-1">
            {user.name || user.mobile}{' '}
            <span className="font-medium">{user.role === "ADMIN" ? "(Admin)" : ""}</span>
          </span>
          <HiOutlineExternalLink size={15} className="text-gray-600" />
        </div>
      </Link>

      {/* Divider */}
      <Divider className="my-2" />

      {/* Menu Items */}
      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/category"
            className="px-2 py-1 hover:bg-gray-200 rounded transition-colors duration-200"
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/subcategory"
            className="px-2 py-1 hover:bg-gray-200 rounded transition-colors duration-200"
          >
            Sub Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/upload-product"
            className="px-2 py-1 hover:bg-gray-200 rounded transition-colors duration-200"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to="/dashboard/product"
            className="px-2 py-1 hover:bg-gray-200 rounded transition-colors duration-200"
          >
            Product
          </Link>
        )}

        <Link
          onClick={handleClose}
          to="/dashboard/myorders"
          className="px-2 py-1 hover:bg-gray-200 rounded transition-colors duration-200"
        >
          My Orders
        </Link>

        <Link
          onClick={handleClose}
          to="/dashboard/address"
          className="px-2 py-1 hover:bg-gray-200 rounded transition-colors duration-200"
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className="text-left px-2 py-1 hover:bg-gray-200 rounded transition-colors duration-200"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;