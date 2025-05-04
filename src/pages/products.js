import React from 'react'
import { useEffect, useState } from 'react'
import DashboardLayout from '../component/dashboardLayout'

function Products() {
  
  const initialProducts = [
    { id: 1, title: "کتونی نایک", price: 1250000 },
    { id: 2, title: "گوشی سامسونگ", price: 950000 },
    { id: 3, title: "ساعت مچی", price: 350000 },
  ];
  
  const [products, setProducts] = useState(()=>{
     const stored = localStorage.getItem("products");
     if(stored){
        return JSON.parse(stored);
     }else{
      localStorage.setItem("products", JSON.stringify(initialProducts));
      return initialProducts;
      
     }
     
  });
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  //useEffect(() => {
    //const stored = localStorage.getItem("products");
  
    //if (stored) {
        // setProducts(JSON.parse(stored));
      //  }else{
         // localStorage.setItem("products", JSON.stringify(initialProducts));
        //  setProducts(initialProducts);
       //   console.log(initialProducts);
          
       // }
 // },[]);
  

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
        <h2 className='text-xl font-bold mb-4'>
          مدیریت محصولات
        </h2>
        <form onSubmit={handleAddProduct} className='mb-6 space-y-4'>
            <input type='text' placeholder='product name' value={title} onChange={(e)=>{setTitle(e.target.value)}} 
            className='border p-2 w-full'/>
            <input type='text' placeholder='product price' value={price} onChange={(e)=>{setPrice(e.target.value)}}
            className='border p-2 w-full'/>
            <button className='bg-blue-600 text-white px-4 py-2 rounded'>
               اضافه کردن
            </button>
            </form>


            <ul className='space-y-2'>
                {
                    products.map((product) => (
                        <li key={product.id} className='bg-white p-4 rounded shadow'>
                            <div className='font-semibold'>{product.title}</div>
                            <div>{product.price}</div>
                            <button onClick={()=> handleAddToOrder(product.id)}
                              className='bg-blue-600 text-white px-4 py-2 rounded'>افزودن به سفارش</button>
                        </li>
                    ))
                }
            </ul>
      </DashboardLayout>
  )
}

export default Products