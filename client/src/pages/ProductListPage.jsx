import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);

  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const category = params?.category || "";
  const subCategory = params?.subCategory || "";

  const categoryId = category?.split("-").pop();
  const subCategoryId = subCategory?.split("-").pop();

  const categoryNameFromUrl = category ? category.split("-").slice(0, -1).join(" ") : "";
  const subCategoryName = subCategory ? subCategory.split("-").slice(0, -1).join(" ") : "";

  // ✅ Fetch products based on category/subcategory
  const fetchProductData = async () => {
    if (!categoryId || !subCategoryId) return;

    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: { categoryId, subCategoryId, page, limit: 8 }
      });

          // Scroll to top when productId changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
      const resData = response.data;
      if (resData.success) {
        setData(page === 1 ? resData.data : [...data, ...resData.data]);
        setTotalPage(resData.totalCount);
      } else {
        setData([]);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset page and data when category changes
  useEffect(() => {
    setPage(1);
    setData([]);
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    fetchProductData();
  }, [categoryId, subCategoryId, page]);

  // ✅ Filter side list & get category name
  useEffect(() => {
    const sub = AllSubCategory.filter(s => s.category.some(el => el._id === categoryId));
    setDisplaySubCategory(sub);
    setCategoryName(sub.length > 0 && sub[0].category?.length > 0 
      ? sub[0].category[0].name 
      : categoryNameFromUrl);
  }, [categoryId, AllSubCategory]);

   


  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="bg-gray-200 w-full">
      <div className="container mx-auto px-4 w-full max-w-none">
        {/* Back Button */}
        <div className="pt-6 pb-2">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-black hover:text-gray-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to previous page
          </button>
        </div>

        {/* Toggle Filter on Mobile */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full p-3 bg-white rounded-lg shadow-md border border-gray-300 flex justify-between items-center"
          >
            <span className="font-semibold text-black">Filter Categories</span>
            <svg className={`w-5 h-5 transform ${isFilterOpen ? 'rotate-180' : ''}`} stroke="black" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 pb-6">
          {/* Sidebar */}
          <aside className={`w-full lg:w-1/4 bg-white rounded-lg shadow-md ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="p-4">
              {/* <h2 className="text-lg font-semibold mb-6 text-black capitalize pt-6 border-b border-gray-300 pb-2 hidden lg:block">
                {categoryName}
              </h2> */}
              <div className="space-y-2">
                {DisplaySubCatory.map((s) => {
                  const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
                  return (
                    <Link
                      to={link}
                      key={s._id}
                      onClick={() => setIsFilterOpen(false)}
                      className={`flex items-center gap-4 p-3 rounded-lg w-full border ${subCategoryId === s._id ? 'bg-black text-white' : 'bg-white hover:bg-gray-100  text-gray-800'}`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border p-1">
                        <img src={s.image} alt={s.name} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                      <span className="text-sm font-medium truncate flex-1">{s.name}</span>
                      <svg className="w-4 h-4" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
              <h1 className="text-xl font-bold text-black capitalize">{subCategoryName}</h1>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((product, index) => (
                  <CardProduct key={`${product._id}-${index}`} data={product} />
                ))}
              </div>

              {!loading && data.length === 0 && (
                <div className="text-center py-12 text-gray-500">No products found in this category</div>
              )}

              {loading && (
                <div className="flex justify-center py-8">
                  <Loading />
                </div>
              )}

              {data.length < totalPage && !loading && (
                <div className="mt-6 text-center pb-6">
                  <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
