import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function ProductDetails() {

 const {id} = useParams();
 const [product, setProduct] = useState(null);
 const [comment, setComment] = useState('');
 const [comments, setComments] = useState([]);
 const [expandedComments, setExpandedComments] = useState([]);
 const [allProducts, setAllProducts] = useState([]);

 const navigtae = useNavigate();


 useEffect(()=>{
    const products = JSON.parse(localStorage.getItem('products')|| '[]');
    setAllProducts(products);
    const findProduct = products.find(p => p.id === Number(id));
    setProduct(findProduct);

     if (findProduct) {
    localStorage.setItem(`items-${findProduct.id}`, JSON.stringify(findProduct));
  }

    const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)|| '[]');
    setComments(storedComments);
 },[id])

 const handleAddComment = () =>{
    if(!comment.trim()) return;

    const updated = [...comments,comment];
    setComments(updated);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updated));
    setComment('');
 }

 const toggleExpand = (index) => {
    setExpandedComments((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const relatedProducts = allProducts.filter(p=>
    p.category === product?.category && p.id !== product.id
  );

 if(!product) return<p>محصولی پیدا نشد</p>;

  return (
    <div className='p-6 bg-blue-200 dark:bg-gray-900 dark:text-white w-full mx-auto'>
      <div className='bg-blue-300 dark:bg-gray-800 rounded-lg shadow p-6 mb-6' 
      style={{width:'30rem'}}>
        <img src={product.thumbnail} alt={product.title} className='rounded w-30 mx-auto' />
        <div className='w-full mx-auto' style={{marginLeft:'40rem', marginTop:'-20rem'}}>
          <h2 className='text-2xl font-bold mt-4 text-center text-blue-700 dark:text-red-500'>{product.title}</h2>
        <p className='text-center mt-2'>{product.description}</p>
        <p className='text-center font-semibold mt-1 text-blue-700 dark:text-red-500'>قیمت: {product.price} تومان</p>
        <p className='text-center text-sm text-gray-500 mt-1'>موجودی: {product.invetory}</p>
        <p>برند: {product.brand}</p>
        <p>دسته‌بندی: {product.category}</p>
        <p>⭐ امتیاز کاربران: {product.rating}</p>
        <p>تخفیف فعلی: {product.discountPercentage}%</p>
        </div>
      </div>

      <div className='bg-blue-400 dark:bg-gray-800 rounded-lg shadow p-6 mb-8'>
        <h3 className='text-xl font-semibold mb-4'>ثبت نظر جدید:</h3>
        <textarea
          className=' p-3 border rounded bg-blue-200 dark:bg-gray-700 dark:text-white'
          style={{width:'35rem'}}
          placeholder='...نظر خود را وارد کنید'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className=' px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-red-500 dark:hover:bg-red-700'
          style={{marginLeft:'35rem'}}
          onClick={handleAddComment}
        >
          ارسال نظر
        </button>
      </div>

      <div className='bg-blue-400 dark:bg-gray-800 rounded-lg shadow p-6 position-relative'>
        <h3 className='text-xl font-semibold mb-4'>نظرات کاربران:</h3>
        <div className='position-absolute flex flex-col-1 gap-3'>
          {comments.length > 0 ? (
            comments.map((c, index) => {
              const isExpanded = expandedComments.includes(index);
              const shouldTruncate = c.length > 20;
              const shortText = shouldTruncate ? c.slice(0, 20) + '...' : c;

              return (
                <div
                  key={index}
                  className='p-4 bg-blue-200 dark:bg-gray-700 rounded shadow border dark:border-gray-600'
                >
                  <p className='text-sm text-gray-800 dark:text-gray-200'>
                    {isExpanded || !shouldTruncate ? c : shortText}
                  </p>

                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className='text-blue-600 text-xs mt-2'
                    >
                      {isExpanded ? 'نمایش کمتر' : 'نمایش بیشتر'}
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className='text-gray-500'>هنوز نظری ثبت نشده است</p>
          )}
        </div>
      </div>
          
          {relatedProducts.length > 0 && (
  <div className="mt-10">
    <h3 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-300">
      محصولات مشابه ({product.category})
    </h3>
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {relatedProducts.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="border rounded p-3 bg-blue-300 dark:bg-gray-800">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="rounded mx-auto"
              style={{ width: '7rem', height: '7rem' }}
            />
            <h4 className="font-semibold mt-2 text-sm text-center">{item.title}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              قیمت: {item.price}
            </p>
            <div className="text-center">
              <button
                className="mt-2 text-blue-600 underline text-sm dark:text-red-600"
                onClick={() => {navigtae(`/product/${item.id}/item`)}}
              >
                مشاهده
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}

    </div>
  );
}

export default ProductDetails