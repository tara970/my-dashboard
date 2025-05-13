import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FavoriteButton from '../component/favoriteButton';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';


function Item() {
  
    const {id} = useParams();
    
    const [product, setProduct] = useState([]);
    const [all, setAll] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(()=>{

        const allProduct = JSON.parse(localStorage.getItem("products")); 
        setAll(allProduct); 

        const storedProduct = allProduct.find(p => p.id === Number(id));;
        
         if(storedProduct){
            setProduct(storedProduct);
         }else{
             console.error('Product not found in localStorage!');
         }
    },[id])

    const filtredProduct = all.filter(p=> (p.id === product.id));

    const handleAddOrder = (productId) =>{
        const storedProduct = all.map(item=>{
          if(item.id === productId && item.inventory > 0){
             return {...item, inventory : item.inventory - 1};
          }
          return item;
        })

        setAll(storedProduct);

        localStorage.setItem("products", JSON.stringify(storedProduct));

        const storedOrder = localStorage.getItem("orders");
        const update = storedOrder ?  JSON.parse(storedOrder) : [];
        const updateOrder = {
          id: Date.now(),
          productId,
          quantity:1,
          delivered: false,
          date:new Date().toLocaleDateString('fa-IR')
        }

         localStorage.setItem("orders", JSON.stringify([...update,updateOrder]));
          setProduct(storedProduct.find(p => p.id === productId));
          alert("سفارس ثبت شد");

          if (product.inventory === 0) {
            alert("موجودی این محصول تمام شده است.");
              return;
}

    }

    if (!product) return <p>آیتمی برای نمایش وجود ندارد</p>;
  
  
  return (
    <div className="p-6 bg-blue-300 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-red-500 mt-9" style={{marginLeft:'32rem'}}>{product.title}</h2>
      <p className="mb-2 text-gray-700 dark:text-gray-300 mt-5" style={{marginLeft:'10rem'}}>{product.description}</p>
      <p className="mb-2 font-semibold text-blue-900 dark:text-white mt-9" style={{marginLeft:'35rem'}}>قیمت: {product.price} تومان</p>
      <p className="mb-4 text-sm text-gray-700 dark:text-red-500"style={{marginLeft:'38rem'}}>موجودی: {product.inventory}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-9" style={{marginLeft:'25rem'}}>
        {filtredProduct.length > 0 ? (
          filtredProduct.map((p, index) => (
            <div key={index} className="border p-4 rounded shadow bg-blue-400 dark:bg-gray-800">
              <img src={p.thumbnail} alt={`item-${index}`} className="w-40 h-35 object-cover rounded" style={{marginLeft:'8rem'}}/>
            </div>
          ))
        ) : (
          <p>تصویری برای نمایش وجود ندارد.</p>
        )}
      </div>
      <div style={{marginLeft:'38rem', marginTop:'5rem'}}>
         <button onClick={()=>handleAddOrder(product.id)} className="p-2 rounded-full bg-blue-300
         dark:bg-gray-900 transition duration-300 hover:scale-110">
          <ShoppingCartIcon className="h-6 w-6 text-blue-800"/>
         </button>
         <FavoriteButton product={product}/>
      </div>
    </div>
  );
}

export default Item