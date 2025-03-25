import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const Recommedproduct = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const categoryData = useSelector(state => state.product.allCategory)

  // Extract categoryId from params safely
  const categoryId = params.category?.split("-").slice(-1)[0] || "";

  // Fetch recommended products based on category
  const fetchRecommendedProducts = async () => {
    if (!categoryId) return console.error("Category ID missing");

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id: categoryId }
      });

      if (response.data.success) {
        setRecommendedProducts(response.data.data.slice(0, 10)); // Limit to 10 recommendations
      } else {
        console.warn("No recommended products found");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedProducts();
  }, [categoryId]);

  return (
    <section className="container mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Recommended Products</h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-none">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map(product => (
              <CardProduct key={product._id} data={product} />
            ))
          ) : (
            <p className="text-gray-500">No recommendations available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Recommedproduct;
