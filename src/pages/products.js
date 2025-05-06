import React from 'react'
import { useEffect, useState } from 'react'
import DashboardLayout from '../component/dashboardLayout'
import axios from 'axios';

function Products() {
  
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

   useEffect(()=>{
     axios.get('https://dummyjson.com/products').then
     (res => {
      setProducts(res.data.products);
      const uniqueCategory = ["all", ...new Set(res.data.products.map((p)=> p.category))];
      setCategories(uniqueCategory);
     })
   })

   const filteredProducts = products.filter(p =>{
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch = !searchTerm || p.title.toString().includes(searchTerm.toString());
    return matchCategory && matchSearch;
   })
  

  useEffect(()=>{
        localStorage.setItem("products",JSON.stringify(products));
  },[products]);

  const handleAddProduct = (e) =>{
       e.preventDefault();
       if(!title || !price){
        alert("لطفا نام و. قیمت را واردئ کن");
        return;
       }

       const newProduct = {
        id: Date.now(),
        title,
        price: Number(price)
       }

       setProducts([...products,newProduct]);
       setTitle('');
       setPrice('');
  }
  

   const handleAddToOrder = (productId) =>{
            
    const storedOrders = localStorage.getItem("orders");
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    const newOrder = {
      id: Date.now(),
      productId,
      quantity:1,
      delivered: false,
      date:new Date().toLocaleDateString('fa-IR')
    };

     localStorage.setItem("orders", JSON.stringify([...orders,newOrder]));
     alert("سفارس ثبت شد");

   }

    return (
      <DashboardLayout>
        <h2 className='text-xl font-bold mb-4 dark:text-red-500'>
          مدیریت محصولات
        </h2>
        <select value={selectedCategory} onChange={(e)=>{setSelectedCategory(e.target.value);
            setSearchTerm("");
        }}
          className='mb-4 border p-2 rounded dark:bg-gray-800 text-gray-400 w-12'
          style={{marginLeft:'4rem'}}> 
          {
            categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))
          }
        </select>
        <input className='border p-2 rounded flex-1 w-80 dark:bg-gray-900 border border-gray-300'
           type='text'
           placeholder='جستوجو بر اساس نام محصول...'
           onKeyDown={(e)=>{ if(e.key === "Enter"){
                e.preventDefault();
                setSearchTerm(searchInput);
                setSearchInput("");
           }}}     
        value={searchInput} onChange={(e)=> setSearchInput(e.target.value)}/>
        <form onSubmit={handleAddProduct} className='mb-6 space-y-4 flex flex-col p-3 dark:bg-gray-900'>
            <input type='text' placeholder='product name' value={title} onChange={(e)=>{setTitle(e.target.value)}} 
            className='border p-2 dark:bg-gray-800'
            style={{width:'30rem'}}/>
            <input type='text' placeholder='product price' value={price} onChange={(e)=>{setPrice(e.target.value)}}
            className='border p-2 dark:bg-gray-800'
            style={{width:'30rem'}}/>
            <button className='bg-blue-600 text-white px-4 py-2 rounded'
            style={{width:'20rem', marginLeft:'5rem'}}>
               اضافه کردن
            </button>
            </form>


            <ul className='space-y-2 dark:bg-gray-900'>
                {   filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <li key={product.id} className='bg-white p-4 rounded shadow border border-white-1 dark:bg-gray-900'>
                      <img alt={product.title} src={product.thumbnail} style={{width:'10rem'}}/>
                        <h2 className='font-semibold dark:text-white'>{product.title}</h2>
                        <p className='text-sm text-gray-600'>{product.description}</p>
                        <p className='font-bold mt-2 dark:text-white'>{product.price}</p>
                        <button onClick={()=> handleAddToOrder(product.id)}
                          className='bg-blue-600 text-white px-4 py-2 m-3 rounded'>افزودن به سفارش</button>
                    </li>
                ))
                ) : (<p>محصولی یافت نشد</p>)
                }
            </ul>
      </DashboardLayout>
  )
}

export default Products