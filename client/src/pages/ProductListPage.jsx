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
  const params = useParams();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  console.log("AllSubCategory:", AllSubCategory);
  console.log("Params:", params);

  // Prevent errors if params.category or params.subCategory is undefined
  const category = params?.category || "";
  const subCategory = params?.subCategory || "";

  // Extract category ID and subCategory ID safely
  const categoryId = category.split("-").pop();
  const subCategoryId = subCategory.split("-").pop();
  
  // Extract readable category and subcategory names
  const categoryNameFromUrl = category ? category.split("-").slice(0, -1).join(" ") : "";
  const subCategoryName = subCategory ? subCategory.split("-").slice(0, -1).join(" ") : "";

  const fetchProductdata = async () => {
    if (!categoryId || !subCategoryId) {
      console.warn("Category or SubCategory ID is missing!");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 8,
        }
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
    const sub = AllSubCategory.filter(s => 
      s.category.some(el => el._id === categoryId)
    );
    setDisplaySubCategory(sub);
    
    // Set category name from the first matched subcategory's category
    if (sub.length > 0 && sub[0].category && sub[0].category.length > 0) {
      setCategoryName(sub[0].category[0].name);
    } else {
      // Fallback to URL-derived name if no match in state
      setCategoryName(categoryNameFromUrl);
    }
  }, [params, AllSubCategory]);

  return (
    <section className="sticky top-24 lg:top-10">
      <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        
        {/** Subcategory Sidebar **/}
        <div className="min-h-[60vh] max-h-[60vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link 
                to={link} 
                key={s._id} 
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border">
                  <img src={s.image} alt="subCategory" className="w-14 lg:h-14 lg:w-12 h-full object-scale-down" />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">{s.name}</p>
              </Link>
            );
          })}
        </div>

        {/** Product Display Section **/}
        <div className="sticky top-20">
          {/* Category Heading */}
          {/* <div className="bg-green-600 text-white shadow-md p-3 z-10">
            <h2 className="font-bold text-lg capitalize">{categoryName}</h2>
          </div> */}
          
          {/* Subcategory Heading */}
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold capitalize">{subCategoryName}</h3>
          </div>

          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-x-72 gap-y-12">
              {data.map((p, index) => (
                <CardProduct data={p} key={`${p._id}-productSubCategory-${index}`} />
              ))}
            </div>
          </div>

          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;