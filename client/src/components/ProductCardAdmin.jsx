import React, { useState } from 'react';
import EditProductAdmin from './EditProductAdmin';
import { IoClose } from 'react-icons/io5';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id }
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchProductData) {
          fetchProductData();
        }
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className='w-full max-w-[180px] bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg'>
      {/* Product Image */}
      <div className='relative w-full h-32 mb-2'>
        <img
          src={data?.image[0] || '/placeholder-image.jpg'} // Fallback image if none exists
          alt={data?.name}
          className='w-full h-full object-contain rounded-md'
        />
      </div>

      {/* Product Info */}
      <div className='space-y-1'>
        <p className='text-sm font-semibold text-gray-800 line-clamp-2' title={data?.name}>
          {data?.name}
        </p>
        <p className='text-xs text-gray-500'>{data?.unit || 'N/A'}</p>
      </div>

      {/* Action Buttons */}
      <div className='grid grid-cols-2 gap-2 mt-3'>
        <button
          onClick={() => setEditOpen(true)}
          className='w-full py-1.5 px-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors duration-200'
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className='w-full py-1.5 px-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors duration-200'
        >
          Delete
        </button>
      </div>

      {/* Edit Product Modal */}
      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {openDelete && (
        <section className='fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-md'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-800'>Confirm Deletion</h3>
              <button
                onClick={() => setOpenDelete(false)}
                className='text-gray-500 hover:text-gray-700 transition-colors duration-200'
              >
                <IoClose size={24} />
              </button>
            </div>
            <p className='text-sm text-gray-600 mb-6'>
              Are you sure you want to permanently delete "{data?.name}"? This action cannot be undone.
            </p>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleDeleteCancel}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-200'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200'
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductCardAdmin;