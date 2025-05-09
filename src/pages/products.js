import React from 'react'
import { useEffect, useState } from 'react'
import DashboardLayout from '../component/dashboardLayout'
import axios from 'axios';
import FavoriteButton from '../component/favoriteButton';

function Products() {
  
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [invetory, setInvetory] = useState(0);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      alert("لطفا ابتدا وارد شوید.");
    }
  }, []);
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAddmin = currentUser && currentUser.email === "admin@shop.com";
  
  
  
  useEffect(()=>{
     
    axios.get('https://dummyjson.com/products').then
     (res => {
      setProducts(res.data.products);
      const uniqueCategory = ["all", ...new Set(res.data.products.map((p)=> p.category))];
      setCategories(uniqueCategory);
     })
   },[])

   const filteredProducts = products.filter(p =>{
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory || (selectedCategory === "all" && p.category === "new");
    const matchSearch = !searchTerm.trim() || p.title.toString().includes(searchTerm.trim().toString());
    return matchCategory && matchSearch;
   })
  

  useEffect(()=>{
        localStorage.setItem("products",JSON.stringify(products));
  },[products]);
  

  const handleAddProduct = async (e) =>{
       e.preventDefault();
   
       if(!isAddmin){
        alert("شما مجاز به افزودن محصول نیستید.");
         return;
       }

       if(!title || !price || !description || !thumbnailFile || !invetory){
        alert("لطفا نام و. قیمت را واردئ کن");
        return;
       }

       const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

        const base64Thumbnail = await toBase64(thumbnailFile);

       const newProduct = {
        id: Date.now(),
        title,
        price: Number(price),
        description,
        category:'new',
        thumbnail: base64Thumbnail,
        invetory,
       }
       
       const updateProduct = [...products, newProduct];
       setProducts(updateProduct);
       localStorage.setItem("products",JSON.stringify(updateProduct));
       setSelectedCategory("all");
       setTitle('');
       setPrice('');
       setDescription('');
       setThumbnailFile(null);
       
  }

  
  
  

   const handleAddToOrder = (productId) =>{
    const updateOrder = products.map((p)=>{
      if(p.id === productId && p.invetory > 0){
         return{...p , invetory : p.invetory - 1};
      }
       return p;
    })
         
     setProducts(updateOrder);
     localStorage.setItem("products", JSON.stringify(updateOrder));

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
            setSearchInput("");
        }}
          className='mb-4 border bg-blue-200 p-2 rounded dark:bg-gray-800 text-gray-400 w-12'
          style={{marginLeft:'4rem'}}> 
          {
            categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))
          }
        </select>
        <input className='border p-2 rounded flex-1 w-80 dark:bg-gray-900 border border-gray-300 dark:text-white'
           type='text'
           placeholder='جستوجو بر اساس نام محصول...'
           onKeyDown={(e)=>{ if(e.key === "Enter"){
                e.preventDefault();
                setSearchTerm(searchInput);
                setSearchInput("");
           }}}     
        value={searchInput} onChange={(e)=> setSearchInput(e.target.value)}/>
         
            {isAddmin && (
                <form onSubmit={handleAddProduct} className='mb-6 space-y-4 flex flex-col p-3 dark:bg-gray-900'>
                <input type='text' placeholder='product name' value={title || ""} onChange={(e)=>{setTitle(e.target.value)}} 
                className='border p-2 dark:bg-gray-800'
                style={{width:'30rem'}}/>
                <input type='text' placeholder='product price' value={price || ""} onChange={(e)=>{setPrice(e.target.value)}}
                className='border p-2 dark:bg-gray-800'
                style={{width:'30rem'}}/>
                <textarea type='text' placeholder='product description' value={description} onChange={(e)=>{ setDescription(e.target.value)}}
                className='border p-2 dark:bg-gray-800'
                style={{width:'30rem', height:'3rem'}}/>
                <input type='file' accept='image/*' onChange={(e)=>{ setThumbnailFile(e.target.files[0])}}
                className='border p-2 dark:bg-gray-800'
                style={{width:'30rem'}}/>
                <input type='number' placeholder='موجودی' value={invetory} onChange={(e)=>{ setInvetory(e.target.value)}}
                 className='border p-2 dark:bg-gray-800'
                 style={{width:"5rem"}}/>
                {thumbnailFile && (
                         <img
                             src={URL.createObjectURL(thumbnailFile)}
                             alt=""
                             style={{ width: '10rem', backgroundColor:"transparent", marginTop: '1rem' }}
                           />
      )}
                <button className='bg-blue-600 text-white px-4 py-2 rounded'
                 type='submit'
                style={{width:'20rem', marginLeft:'5rem'}}>
                   اضافه کردن
                </button>
                </form>
    
            )}

            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 dark:bg-gray-900'>
                {   filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <li key={product.id} className={`bg-blue-300 p-4 rounded-lg shadow-lg border border-white-1 dark:bg-gray-800
                  ${product.invetory === 0 ? 'opacity-40' : 'bg-white'}`}>
                      <img alt={product.title} src={product.thumbnail} style={{width:'10rem'}}/>
                        <h2 className='font-semibold dark:text-white'>{product.title}</h2>
                        <p className='text-sm text-gray-600'>{product.description}</p>
                        <p className='font-bold mt-2 dark:text-white'>{product.price}</p>
                        <p className="text-sm mt-1 text-red-500">{
                            product.invetory === 0 ? 'ناموجود' : product.invetory < 100 ?
                            'موجودی نامحدود' : ''
                          }</p>
                        <button onClick={()=> handleAddToOrder(product.id)}
                          className='bg-blue-600 text-white px-4 py-2 m-3 rounded'
                          disabled={product.invetory === 0}>افزودن به سفارش</button>
                         <FavoriteButton product={product}/> 
                    </li>
                ))
                ) : (<p>محصولی یافت نشد</p>)
                }
            </ul>
      </DashboardLayout>
  )
}

export default Products