import React, { useEffect, useState } from 'react'
import DashboardLayout from '../component/dashboardLayout';

function Orders() {
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredOrders, setFilterdeOrders] = useState([]);
  const [editingOrders, setEditingOrders] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState(1);
  const [categoriesInOrder, setCategoriesInOrder] = useState([]);

  useEffect(()=>{
     const storedOrders = localStorage.getItem("orders");
     const storedProducts = localStorage.getItem("products");

     if(storedOrders){
        setOrders(JSON.parse(storedOrders));
     }

     if(storedProducts){
        setProducts(JSON.parse(storedProducts));
     }
  },[]);


  useEffect(()=>{
      const usedCategory = [];
      orders.forEach((order) => {
        const product = products.find(p => p.id === order.productId);
        if(product && !usedCategory.includes(product.category)){
             usedCategory.push(product.category);
        }
      })
      setCategoriesInOrder(usedCategory);
  },[orders, products])


   useEffect(()=>{
      let orderActive = orders.filter((order)=> !order.delivered)  
     
    if(selectedCategory === "all"){
          setFilterdeOrders(orderActive);
       }else{
          const filtered = orderActive.filter((order)=> {
             const product = findProductById(order.productId);
             return product && product.category === selectedCategory;
          });
          setFilterdeOrders(filtered);
       }
   },[selectedCategory, orders, products])


   const handleEditClick = (order) =>{
       setEditingOrders(order.id);
       setEditedQuantity(order.quantity);
       const product = products.find(p => p.id === order.productId);
       if (!product) {
         return <p>محصول یافت نشد</p>; // یا هر رفتار جایگزین
       }
   }

   const handleSave = (orderId) =>{
       const updateOrders = orders.map((order)=>{
        if(order.id === orderId){
            return {...order, quantity:Number(editedQuantity)};
        }
          return order;
       });
         
       setOrders(updateOrders);
       localStorage.setItem("orders", JSON.stringify(updateOrders));
       setEditingOrders(null);
   }

  const findProductById = (id) =>{
        return products.find((product)=> product.id === id);
  }

  const handleDeleteOrder = (id) =>{
       const filters = orders.filter((order)=> order.id !== id);
       setOrders(filters);
       localStorage.setItem("orders",JSON.stringify(filters));
  }

  const handleDelivered = (id) =>{
     const update = orders.map((order)=>{
        if(order.id === id){
            return {...order, delivered: true}
        }
        return order;
     })

     setOrders(update);
     localStorage.setItem("orders", JSON.stringify(update));
  }

    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order)=>{
        const product = findProductById(order.productId);
        const quantity = Number(order.quantity) || 0;
        return sum + (product ? (product.price || 0) * quantity : 0);
    },0);

  
    return (
      <DashboardLayout>
        <h2 className='text-2xl font-bold mb-6 dark:text-red-500'>سفارشات</h2>

        <div className='mb-6 dark:bg-gray-900 dark:text-white p-2'>
            <label className='block mb-2 font-medium'>فیلتر بر اساس محصول:</label>
            <select value={selectedCategory} onChange={(e)=>{setSelectedCategory(e.target.value)}}
                className='border rounded p-2 w-18 bg-blue-200 dark:bg-gray-900'>
                <option value="all">همه</option>
                {categoriesInOrder.map((cat, index)=>{
                   return <option value={cat} key={index}>{cat}</option>
                })}
            </select>
        </div>

        <div className='mb-8 dark:bg-gray-900 p-4 dark:text-white'>
            <h4 className='text-xl font-semibold mb-2 dark:text-gray-500'>گزارش ها</h4>
            <p className='mb-1'>تعداد سفارش ها: {totalOrders}</p>
            <p>مجموع درامد: {totalRevenue}</p>
        </div>

        {filteredOrders.length === 0 ? (<p className='text-gray-500 dark:text-white'>سفارشی ثبت نشده</p>):(
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 dark:bg-gray-900 dark:text-gray-300'>
                {filteredOrders.map((order)=>{
                    const product = findProductById(order.productId);
                    return(
                        <li key={order.id} className='border bg-blue-300 rounded-lg p-4 roundedshadow-md flex flex-col gap-2 dark:bg-gray-800'>
                            <div className='space-y-2'>
                                <div>محصول :<span className='font-semibold'> {product?.title || "نامشخص"}</span></div>
                                <div>تاریخ سفارش : {order.date}</div>
                                <div className='flex items-center gap-2'>تعداد : 
                                 {editingOrders === order.id ? (
                                    <>
                                     <input type='number' value={editedQuantity} onChange={(e)=>{setEditedQuantity(e.target.value)}} className='border rounded px-2 py-1 w-16 dark:bg-gray-700'/>
                                     <button 
                                     className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600' onClick={()=>handleSave(order.id)}>ذخیره</button>
                                    </>
                                 ):(
                                    <>
                                       {order.quantity}
                                       <button onClick={()=>handleEditClick(order)}
                                        className='text-blue-500 hover:underline dark:text-red-500'>ویرایش</button>
                                    </>
                                 )
                                 }
                            </div>
                                <div>قیمت : {product?.price || "?"}</div>
                            </div>
                        
                            <button onClick={()=> handleDeleteOrder(order.id)}
                                className='bg-red-500 text-white px-2 py-2 mt-8 w-48 rounded hover:bg-red-600'>
                                 حذف
                            </button>
                            <button onClick={()=> handleDelivered(order.id)}
                                className='bg-blue-500 text-white px-4 py-2 w-48 rounded hover:bg-blue-600'>تحویل داده شد</button>
                                <img src={product.thumbnail} style={{width:'13rem', height:'13rem',marginLeft:'17rem',marginTop:'-13.5rem'}} className='dark:bg-gray-800'/>
                        </li>
                    )
                })}
            </ul>
        )}
      </DashboardLayout>
  )
}

export default Orders