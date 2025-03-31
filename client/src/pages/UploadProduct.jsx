import React, { useState, useEffect } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    colors: [],
    size: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    customerreview: ""
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector(state => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector(state => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [customerreviewInput, setCustomerreviewInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;
    setData((prev) => ({
      ...prev,
      image: [...prev.image, imageUrl]
    }));
    setImageLoading(false);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...data.image];
    newImages.splice(index, 1);
    setData((prev) => ({
      ...prev,
      image: newImages
    }));
  };

  const handleRemoveCategory = (index) => {
    const newCategories = [...data.category];
    newCategories.splice(index, 1);
    setData((prev) => ({
      ...prev,
      category: newCategories
    }));
  };

  const handleRemoveSubCategory = (index) => {
    const newSubCategories = [...data.subCategory];
    newSubCategories.splice(index, 1);
    setData((prev) => ({
      ...prev,
      subCategory: newSubCategories
    }));
  };

  const handleRemoveColor = (index) => {
    const newColors = [...data.colors];
    newColors.splice(index, 1);
    setData((prev) => ({
      ...prev,
      colors: newColors
    }));
  };

  const handleRemoveSize = (index) => {
    const newSizes = [...data.size];
    newSizes.splice(index, 1);
    setData((prev) => ({
      ...prev,
      size: newSizes
    }));
  };

  const handleAddField = () => {
    setData((prev) => ({
      ...prev,
      more_details: {
        ...prev.more_details,
        [fieldName]: ""
      }
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data
      });
      const { data: responseData } = response;
      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          colors: [],
          size: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
          customerreview: ""
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleAddColor = (event) => {
    if (event.key === 'Enter' && colorInput.trim()) {
      event.preventDefault();
      setData({ ...data, colors: [...data.colors, colorInput.trim()] });
      setColorInput('');
    }
  };

  const handleAddCustomerreview = (event) => {
    if (event.key === 'Enter' && customerreviewInput.trim()) {
      event.preventDefault();
      setData({ ...data, customerreview: customerreviewInput.trim() });
      setCustomerreviewInput('');
    }
  };

  const handleAddSize = (event) => {
    if (event.key === 'Enter' && sizeInput.trim()) {
      event.preventDefault();
      setData({ ...data, size: [...data.size, sizeInput.trim()] });
      setSizeInput('');
    }
  };

  return (
    <section className=''>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name' className='font-medium'>Name</label>
            <input 
              id='name'
              type='text'
              placeholder='Enter product name'
              name='name'
              value={data.name}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='description' className='font-medium'>Description</label>
            <textarea 
              id='description'
              type='text'
              placeholder='Enter product description'
              name='description'
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
            />
          </div>
          <div>
            <p className='font-medium'>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col'>
                  {imageLoading ? <Loading/> : (
                    <>
                      <FaCloudUploadAlt size={35}/>
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input 
                  type='file'
                  id='productImage'
                  className='hidden'
                  accept='image/*'
                  onChange={handleUploadImage}
                />
              </label>
              <div className='flex flex-wrap gap-4'>
                {data.image.map((img, index) => (
                  <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                    <img
                      src={img}
                      alt={img}
                      className='w-full h-full object-scale-down cursor-pointer' 
                      onClick={() => setViewImageURL(img)}
                    />
                    <div 
                      onClick={() => handleDeleteImage(index)} 
                      className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'
                    >
                      <MdDelete/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label className='font-medium'>Category</label>
            <div>
              <select
                className='bg-blue-50 border w-full p-2 rounded'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find(el => el._id === value);
                  setData((prev) => ({
                    ...prev,
                    category: [...prev.category, category]
                  }));
                  setSelectCategory("");
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <div className='flex flex-wrap gap-3'>
                {data.category.map((c, index) => (
                  <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                    <p>{c.name}</p>
                    <div 
                      className='hover:text-red-500 cursor-pointer' 
                      onClick={() => handleRemoveCategory(index)}
                    >
                      <IoClose size={20}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label className='font-medium'>Sub Category</label>
            <div>
              <select
                className='bg-blue-50 border w-full p-2 rounded'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(el => el._id === value);
                  setData((prev) => ({
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory]
                  }));
                  setSelectSubCategory("");
                }}
              >
                <option value="" className='text-neutral-600'>Select Sub Category</option>
                {allSubCategory.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <div className='flex flex-wrap gap-3'>
                {data.subCategory.map((c, index) => (
                  <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                    <p>{c.name}</p>
                    <div 
                      className='hover:text-red-500 cursor-pointer' 
                      onClick={() => handleRemoveSubCategory(index)}
                    >
                      <IoClose size={20}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="customerreview" className="font-medium">Customer Review</label>
            <input 
              id="customerreview"
              type="text"
              placeholder="Enter customer review"
              name="customerreview"
              value={customerreviewInput}
              onChange={(e) => setCustomerreviewInput(e.target.value)}
              onKeyDown={handleAddCustomerreview}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="colors" className="font-medium">Colors</label>
            <input 
              id="colors"
              type="text"
              placeholder="Enter product colors (press Enter)"
              name="colors"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={handleAddColor}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {data.colors.map((color, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1 px-2 py-1 rounded"
                  style={{ backgroundColor: color, color: '#fff' }}
                >
                  <span>{color}</span>
                  <button 
                    type="button"
                    onClick={() => handleRemoveColor(index)}
                    className="ml-1 text-white hover:text-gray-200"
                  >
                    <IoClose size={16}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="size" className="font-medium">Size</label>
            <input 
              id="size"
              type="text"
              placeholder="Enter product size (press Enter)"
              name="size"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              onKeyDown={handleAddSize}
              className="bg-blue-50 p-2 outline  focus-within:border-primary-200 rounded"
            />
            <div className="flex gap-2 flex-wrap mt-2 uppercase">
              {data.size.map((size, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1 px-2 py-1 border border-black rounded"
                >
                  <span>{size}</span>
                  <button 
                    type="button"
                    onClick={() => handleRemoveSize(index)}
                    className="ml-1 text-black hover:text-red-500"
                  >
                    <IoClose size={16}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor='stock' className='font-medium'>Number of Stock</label>
            <input 
              id='stock'
              type='number'
              placeholder='Enter product stock'
              name='stock'
              value={data.stock}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='price' className='font-medium'>Price</label>
            <input 
              id='price'
              type='number'
              placeholder='Enter product price'
              name='price'
              value={data.price}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='discount' className='font-medium'>Discount</label>
            <input 
              id='discount'
              type='number'
              placeholder='Enter product discount'
              name='discount'
              value={data.discount}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          {Object.keys(data.more_details).map((k, index) => (
            <div key={index} className='grid gap-1'>
              <label htmlFor={k} className='font-medium'>{k}</label>
              <input 
                id={k}
                type='text'
                value={data.more_details[k]}
                onChange={(e) => {
                  const value = e.target.value;
                  setData((prev) => ({
                    ...prev,
                    more_details: {
                      ...prev.more_details,
                      [k]: value
                    }
                  }));
                }}
                required
                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              />
            </div>
          ))}
          <button
            type="submit"
            className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
          >
            Submit
          </button>
        </form>
      </div>
      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")}/>
      )}
      {openAddField && (
        <AddFieldComponent 
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddField(false)} 
        />
      )}
    </section>
  );
};

export default UploadProduct;