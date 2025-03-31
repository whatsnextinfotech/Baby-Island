import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { Link, useParams } from 'react-router-dom';
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
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const category = params?.category || "";
  const subCategory = params?.subCategory || "";
  const categoryId = category.split("-").pop();
  const subCategoryId = subCategory.split("-").pop();
  const categoryNameFromUrl = category ? category.split("-").slice(0, -1).join(" ") : "";
  const subCategoryName = subCategory ? subCategory.split("-").slice(0, -1).join(" ") : "";

  const fetchProductdata = async () => {
    if (!categoryId || !subCategoryId) return;

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: { categoryId, subCategoryId, page, limit: 8 }
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(page === 1 ? responseData.data : [...data, ...responseData.data]);
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, [params, page]);

  useEffect(() => {
    const sub = AllSubCategory.filter(s => s.category.some(el => el._id === categoryId));
    setDisplaySubCategory(sub);
    setCategoryName(sub.length > 0 && sub[0].category?.length > 0 
      ? sub[0].category[0].name 
      : categoryNameFromUrl);
  }, [params, AllSubCategory]);

  return (
    <section className="bg-gray-200 w-full">
      <div className="container mx-auto px-4 w-full max-w-none">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4 pt-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-md border border-gray-300"
          >
            <span className="font-semibold text-black">Filter Categories</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full pb-6">
          {/* Filters/Sidebar */}
          <aside className={`
            w-full lg:w-1/4 bg-white rounded-lg shadow-md
            ${isFilterOpen ? 'block' : 'hidden lg:block'}
            transition-all duration-300
          `}>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-6 text-black capitalize lg:block hidden pt-6 border-b border-gray-300 pb-2">
                {/* {categoryName} */}
              </h2>
              <div className="space-y-2">
                {DisplaySubCatory.map((s) => {
                  const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
                  return (
                    <Link
                      to={link}
                      key={s._id}
                      onClick={() => setIsFilterOpen(false)}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 w-full border border-gray-200
                        ${subCategoryId === s._id 
                          ? 'bg-black text-white shadow-md scale-105' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 hover:shadow-md'}`}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full overflow-hidden border border-gray-300 p-1">
                        <img 
                          src={s.image} 
                          alt={s.name}
                          className="w-full h-full object-contain rounded-full"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-sm font-medium truncate flex-1">{s.name}</span>
                      <svg 
                        className="w-4 h-4 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between w-full lg:pt-6">
              <h1 className="text-xl font-bold text-black capitalize">
                {subCategoryName}
              </h1>
              {/* <span className="text-sm text-gray-600">
                {data.length} {data.length === 1 ? 'item' : 'items'}
              </span> */}
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {data.map((p, index) => (
                  <CardProduct 
                    data={p} 
                    key={`${p._id}-product-${index}`} 
                    className="hover:shadow-lg transition-shadow duration-200 w-full"
                  />
                ))}
              </div>

              {data.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-500 w-full">
                  No products found in this category
                </div>
              )}

              {loading && (
                <div className="flex justify-center py-8 w-full">
                  <Loading />
                </div>
              )}

              {data.length < totalPage && !loading && (
                <div className="mt-6 text-center w-full pb-6">
                  <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 
                      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
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