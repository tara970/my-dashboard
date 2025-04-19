import React, { useEffect, useState } from 'react'
import DashboardLayout from '../component/dashboardLayout';

function Orders() {
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("all");
  const [filteredOrders, setFilterdeOrders] = useState([]);
  const [editingOrders, setEditingOrders] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState(1);

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
      let orderActive = orders.filter((order)=> !order.delivered)  
     
    if(selectedProductId === "all"){
          setFilterdeOrders(orderActive);
       }else{
          const filtered = orderActive.filter((order)=> order.productId === Number(selectedProductId));
          setFilterdeOrders(filtered);
       }
   },[selectedProductId, orders])

   const handleEditClick = (order) =>{
       setEditingOrders(order.id);
       setEditedQuantity(order.quantity);
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
        return sum + (product ? product.price * product.quantity : 0);
    },0);
  
    return (
      <DashboardLayout>
        <h2 className='text-2xl font-bold mb-6'>سفار شات</h2>

        <div className='mb-6'>
            <label className='block mb-2 font-medium'>فیلتر بر اساس محصول:</label>
            <select value={selectedProductId} onChange={(e)=>{setSelectedProductId(e.target.value)}}
                className='border rounded p-2 w-18'>
                <option value="all">همه</option>
                {products.map((product)=>{
                   return <option value={product.id} key={product.id}>{product.title}</option>
                })}
            </select>
        </div>

        <div className='mb-8'>
            <h4 className='text-xl font-semibold mb-2'>گزارش ها</h4>
            <p className='mb-1'>تعداد سفارش ها: {totalOrders}</p>
            <p>مجموع درامد: {totalRevenue}</p>
        </div>

        {filteredOrders.length === 0 ? (<p className='text-gray-500'>سفارشی ثبت نشده</p>):(
            <ul className='space-y-6'>
                {filteredOrders.map((order)=>{
                    const product = findProductById(order.productId);
                    return(
                        <li className='border p-4 roundedshadow-md flex flex-col gap-2'>
                            <div className='space-y-2'>
                                <div>محصول :<span className='font-semibold'> {product?.title || "نامشخص"}</span></div>
                                <div>تاریخ سفارش : {order.date}</div>
                                <div className='flex items-center gap-2'>تعداد : 
                                 {editingOrders === order.id ? (
                                    <>
                                     <input type='number' value={editedQuantity} onChange={(e)=>{setEditedQuantity(e.target.value)}} className='border rounded px-2 py-1 w-16'/>
                                     <button 
                                     className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600' onClick={()=>handleSave(order.id)}>ذخیره</button>
                                    </>
                                 ):(
                                    <>
                                       {order.quantity}
                                       <button onClick={()=>handleEditClick(order)}
                                        className='text-blue-500 hover:underline'>ویرایش</button>
                                    </>
                                 )
                                 }
                            </div>
                                <div>قیمت : {product?.price || "?"}</div>
                            </div>
                            <button onClick={()=> handleDeleteOrder(order.id)}
                                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                                 حذف
                            </button>
                            <button onClick={()=> handleDelivered(order.id)}
                                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>تحویل داده شد</button>
                        </li>
                    )
                })}
            </ul>
        )}
      </DashboardLayout>
  )
}

export default Orders