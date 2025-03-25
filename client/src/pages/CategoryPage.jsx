import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState({ name: "", image: "" })
    const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory, setDeleteCategory] = useState({ _id: "" })

    const fetchCategory = async () => {
        try {
            setLoading(true)
            const response = await Axios({ ...SummaryApi.getCategory })
            const { data: responseData } = response

            if (responseData.success) {
                setCategoryData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="p-4 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className='p-3 bg-white shadow-md flex items-center justify-between rounded-lg'>
                <h2 className='font-semibold text-lg'>Category</h2>
                <button 
                    onClick={() => setOpenUploadCategory(true)} 
                    className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'
                >
                    Add Category
                </button>
            </div>

            {/* No Data Component */}
            {!categoryData.length && !loading && <NoData />}

            {/* Category Grid */}
            <div className='p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                {
                    categoryData.map((category) => (
                        <div 
                            key={category._id} 
                            className='w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full shadow-md flex flex-col items-center justify-center bg-white p-2 relative'
                        >
                            <img 
                                alt={category.name}
                                src={category.image}
                                className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-300'
                            />
                            <h3 className='text-xs sm:text-sm font-medium text-center mt-1'>{category.name}</h3>
                            
                            {/* Buttons */}
                            <div className='absolute bottom-0 mb-2 flex gap-1'>
                                <button 
                                    onClick={() => { setOpenEdit(true); setEditData(category); }} 
                                    className='bg-green-100 hover:bg-green-200 text-green-600 text-xs font-medium py-1 px-2 rounded'
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => { setOpenConfirmBoxDelete(true); setDeleteCategory(category); }} 
                                    className='bg-red-100 hover:bg-red-200 text-red-600 text-xs font-medium py-1 px-2 rounded'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Loading Component */}
            {loading && <Loading />}

            {/* Upload Category Modal */}
            {openUploadCategory && <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />}

            {/* Edit Category Modal */}
            {openEdit && <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />}

            {/* Delete Confirmation Box */}
            {openConfimBoxDelete && (
                <CofirmBox 
                    close={() => setOpenConfirmBoxDelete(false)} 
                    cancel={() => setOpenConfirmBoxDelete(false)} 
                    confirm={handleDeleteCategory} 
                />
            )}
        </section>
    )
}

export default CategoryPage
