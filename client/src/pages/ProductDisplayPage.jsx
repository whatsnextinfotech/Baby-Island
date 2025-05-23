import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAngleRight, FaAngleLeft, FaArrowLeft, FaPause, FaPlay } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import Divider from '../components/Divider';
import image1 from '../assets/minute_delivery.png';
import image2 from '../assets/Best_Prices_Offers.png';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton1 from '../components/AddToCartButton-product-display';
import AddToCartButton2 from '../components/AddToCartButton2';
import Recommedproduct from './Recommedproduct';
import ProductListPage from './ProductListPage';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import { getReviews, addReview } from '../store/customerReviewSlice';

const ProductDisplayPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: []
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();
  const mobileCarouselRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const categoryData = useSelector(state => state.product.allCategory);
  const dispatch = useDispatch();
  
  // Touch handling for mobile carousel
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Auto slide state
  const [autoSlide, setAutoSlide] = useState(true);
  const autoSlideInterval = useRef(null);
  
  // Review state
  const { reviews, isLoading: reviewsLoading, error } = useSelector(state => state.reviews);
  const [reviewForm, setReviewForm] = useState({
    reviewMessage: '',
    reviewValue: 5
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Get current user (adjust according to your auth state structure)
  const user = useSelector(state => state.auth?.user || { id: '', name: '' });

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId }
      });
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Mobile touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && data.image.length > 1) {
      setImage((prev) => (prev + 1) % data.image.length);
    } else if (isRightSwipe && data.image.length > 1) {
      setImage((prev) => (prev === 0 ? data.image.length - 1 : prev - 1));
    }
    
    // Reset touch points
    setTouchStart(0);
    setTouchEnd(0);
    
    // Resume auto slide
    if (autoSlide && data.image && data.image.length > 1) {
      startAutoSlide();
    }
  };

  const startAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    
    autoSlideInterval.current = setInterval(() => {
      setImage(prevImage => (prevImage + 1) % data.image.length);
    }, 3000);
  };

  // Handle auto slide
  useEffect(() => {
    if (autoSlide && data.image && data.image.length > 1) {
      startAutoSlide();
    }
    
    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [autoSlide, data.image]);

  useEffect(() => {
    fetchProductDetails();
    if (productId) {
      dispatch(getReviews(productId));
    }
    
    // Scroll to top when productId changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset state when loading a new product
    setImage(0);
    setSelectedColor("");
    setSelectedSize("");
    setShowReviewForm(false);
    setAutoSlide(true);
    
    // Clean up auto slide interval when component unmounts or product changes
    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [productId, dispatch]);

  const toggleAutoSlide = () => {
    setAutoSlide(prev => !prev);
  };

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  const handleSelectImage = (index) => {
    setImage(index);
    
    // Reset auto slide timer when manually selecting an image
    if (autoSlide) {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
      startAutoSlide();
    }
  };

  const handleBuyNow = () => {
    const message = `Order Details:
    • Product: ${data.name}
    • Price: ${DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
    • Original Price: ${data.discount ? DisplayPriceInRupees(data.price) : "N/A"}
    • Discount: ${data.discount ? `${data.discount}% Off` : "No Discount"}
    • Color: ${selectedColor || "Not Selected"}
    • Size: ${selectedSize || "Not Selected"}
    // Product Link: ${window.location.href}`;
    
    const whatsappNumber = "917991712623";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!user.id) {
      AxiosToastError({ message: "Please login to submit a review" });
      return;
    }

    if (!reviewForm.reviewMessage.trim()) {
      AxiosToastError({ message: "Please enter a review message" });
      return;
    }

    try {
      setSubmitting(true);
      await dispatch(addReview({
        productId,
        userId: user.id,
        userName: user.name,
        reviewMessage: reviewForm.reviewMessage,
        reviewValue: parseInt(reviewForm.reviewValue)
      })).unwrap();
      
      setReviewForm({
        reviewMessage: '',
        reviewValue: 5
      });
      setShowReviewForm(false);
      dispatch(getReviews(productId));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.reviewValue, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const [activeTab, setActiveTab] = useState("Description");
  
  const handleBackClick = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <>
      {/* Back to Page Button */}
      <div className="container mx-auto p-4">
        <button 
          onClick={handleBackClick} 
          className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors mb-4"
        >
          <FaArrowLeft className="text-sm" />
          <span className="font-medium">Back to previous page</span>
        </button>
      </div>
      
      <section className='container mx-auto p-4 grid lg:grid-cols-2'>
        <div>
          {/* Mobile Image Carousel */}
          <div 
            ref={mobileCarouselRef}
            className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full relative overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {data.image && data.image.length > 0 && (
              <>
                {/* Main Image */}
                <img
                  src={data.image[image]}
                  className='w-full h-full object-scale-down transition-all duration-300'
                  alt={data.name}
                />
                
                {/* Mobile navigation dots */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
                  {data.image.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleSelectImage(idx)}
                      className={`w-2 h-2 rounded-full ${
                        idx === image ? 'bg-black hidden' : 'bg-gray-300 hidden'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
                
                {/* Mobile navigation arrows */}
                {data.image.length > 1 && (
                  <>
                    <button 
                      onClick={() => handleSelectImage(image === 0 ? data.image.length - 1 : image - 1)}
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hidden rounded-full p-1.5 shadow-md z-20"
                      aria-label="Previous image"
                    >
                      <FaAngleLeft size={16} />
                    </button>
                    <button 
                      onClick={() => handleSelectImage((image + 1) % data.image.length)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hidden rounded-full p-1.5 shadow-md z-20"
                      aria-label="Next image"
                    >
                      <FaAngleRight size={16} />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          
          {/* Image navigation dots for desktop */}
          <div className='flex items-center justify-center gap-3 my-2 '>
            {data.image.map((img, index) => (
              <div 
                key={img+index+"point"} 
                className={`bg-slate-200 w-2 h-2 lg:w-3 lg:h-3 rounded-full cursor-pointer transition-all duration-300 ${index === image ? "bg-slate-500 scale-110" : ""}`}
                onClick={() => handleSelectImage(index)}
              />
            ))}
          </div>
          
          {/* Thumbnails for desktop */}
          <div className='grid relative'>
            <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
              {data.image.map((img, index) => (
                <div 
                  className={`w-20 h-20 min-h-20 min-w-20 cursor-pointer transition-all duration-300 ${
                    index === image ? 'border-2 border-black shadow-lg' : 'shadow-md'
                  }`}
                  key={img+index}
                >
                  <img
                    src={img}
                    alt='min-product'
                    onClick={() => handleSelectImage(index)}
                    className='w-full h-full object-scale-down' 
                  />
                </div>
              ))}
            </div>
            <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center'>
              <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1  rounded-full shadow-lg'>
                <FaAngleLeft/>
              </button>
              <button onClick={handleScrollRight} className='z-10 bg-white relative p-1  rounded-full shadow-lg'>
                <FaAngleRight/>
              </button>
            </div>
          </div>
        </div>

        <div className='p-4 lg:pl-7 text-base lg:text-lg'>
          <h2 className='text-lg font-semibold lg:text-2xl'>{data.name}</h2>  
          
          <div>
            <div className='flex items-center gap-2 lg:gap-4'>
              <div className='py-2 rounded w-fit'>
                <p className='font-semibold text-lg lg:text-xl'>
                  {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
                </p>
              </div>
              {data.discount && (
                <p className='line-through text-red-500'>{DisplayPriceInRupees(data.price)}</p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500">
                {renderStars(Math.round(calculateAverageRating()))}
              </span>
              <span className="text-gray-500">({calculateAverageRating()}/5)</span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          </div> 

          {/* Color Selection */}
          <div className="mb-3 mt-4">
            <h6>Color:</h6>
            {data.colors?.map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full ml-1 gap-10 border-2 transition-all duration-300 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color}`}
              >
                <span className="hidden">{color}</span>
              </button>
            ))}
          </div>

          {/* Size Selection */}
          <div className="mb-3">
            <h6>Size:</h6>
            {data.size?.map((size, index) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-lg ml-1 gap-10 border transition-all duration-300 ${
                  selectedSize === size ? "border-black bg-gray-200" : "border-gray-200"
                }`}
                onClick={() => setSelectedSize(size)}
                aria-label={`Select size ${size}`}
              >
                <span className="px-2 py-2 uppercase">{size}</span>
              </button>
            ))}
          </div>
        
          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <div>
              {data.stock === 0 ? (
                <p className='text-lg text-red-500 my-2'>Out of Stock</p>
              ) : (
                <div className='my-4'>
                  <AddToCartButton1 data={data}/>
                </div>
              )}
            </div>
            <button
              className="w-full border py-3 rounded-lg text-white bg-black font-medium"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
          
          <Divider/>

          {/* Navigation Tabs */}
          <div className="container mx-auto px-0 py-8">
            <div className="border-b  text-sm md:text-xl   flex gap-5 md:gap-6 pb-2">
              {["Description", "Customer Reviews", "Return Policy"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Dynamic Content */}
            <div className="mt-6 text-gray-700">
              {activeTab === "Description" && <p>{data.description}</p>}
              
              {activeTab === "Customer Reviews" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <button 
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                    >
                      {showReviewForm ? 'Cancel' : 'Write a Review'}
                    </button>
                  </div>
                  
                  {/* Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleSubmitReview} className="mb-6 p-4 border rounded-lg bg-gray-50">
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Rating</label>
                        <div className="flex gap-2 mb-2">
                          {[5, 4, 3, 2, 1].map(rating => (
                            <button
                              type="button"
                              key={rating}
                              onClick={() => setReviewForm(prev => ({...prev, reviewValue: rating}))}
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                reviewForm.reviewValue >= rating ? 'bg-yellow-400 text-white' : 'bg-gray-200'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="reviewMessage" className="block text-sm font-medium mb-1">
                          Your Review
                        </label>
                        <textarea
                          id="reviewMessage"
                          name="reviewMessage"
                          value={reviewForm.reviewMessage}
                          onChange={handleReviewChange}
                          className="w-full p-2 border rounded-lg"
                          rows={3}
                          placeholder="Share your experience with this product"
                          required
                        />
                      </div>
                      
                      {error && <p className="text-red-500 mb-2">{error}</p>}
                      
                      <button
                        type="submit"
                        disabled={submitting || reviewsLoading}
                        className="w-full py-2 bg-black text-white rounded-lg disabled:bg-gray-400"
                      >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  )}
                  
                  {/* Reviews List */}
                  <div>
                    {reviewsLoading ? (
                      <p className="text-center py-4">Loading reviews...</p>
                    ) : reviews.length === 0 ? (
                      <p className="text-center py-4">No reviews yet. Be the first to review this product!</p>
                    ) : (
                      <div className="space-y-4">
                        {reviews.map(review => (
                          <div key={review._id} className="border-b pb-4">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{review.userName}</h4>
                              <div className="flex items-center">
                                {renderStars(review.reviewValue)}
                                <span className="ml-1 text-sm text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">{review.reviewMessage}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === "Return Policy" && (
                <p>{data.returnPolicy || "Please contact customer service for return policy details."}</p>
              )}
            </div>
          </div>
        </div>
      </section> 
      <div className='mt-20 w-full'>
        <div className="flex items-center justify-center">
          <div className="h-px bg-black w-12"></div>
          <h2 className="text-xl md:text-2xl font-bold mx-4 text-gray-800">Recommended Products</h2>
          <div className="h-px bg-black w-12"></div>
        </div>
        {categoryData?.length > 0 && (
          categoryData
            .filter(c => c.name === "New Arrivals")
            .map((c) => (
              <CategoryWiseProductDisplay 
                key={c?._id + "NewArrivals"} 
                id={c?._id} 
                sortByLatest={true}
              />
            ))
        )}
      </div>
    </>
  );
};

export default ProductDisplayPage;