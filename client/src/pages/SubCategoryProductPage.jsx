import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import CardProduct from "../components/CardProduct";

const SubCategoryProductPage = () => {
  const { subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get(`/api/products/subcategory/${subcategoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [subcategoryId]);

  return (
    <section className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Subcategory Products</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <CardProduct key={product._id} data={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SubCategoryProductPage;
