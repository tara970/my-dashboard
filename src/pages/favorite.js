import React from 'react'
import { useAuth } from '../context/authContext'
import FavoriteButton from '../component/favoriteButton';
import DashboardLayout from '../component/dashboardLayout';

function Favorite() {
  
  const {favorites} = useAuth();
  
  return (
    <DashboardLayout>
      <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">محصولات علاقه‌مندی</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">هنوز محصولی به علاقه‌مندی‌ها اضافه نکردی.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md bg-blue-300 dark:bg-gray-800 dark:text-white relative"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className=" h-40  mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.category}</p>
              <p className="font-bold">{product.price} تومان</p>

              <div className="absolute bottom-2 right-2">
                <FavoriteButton product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </DashboardLayout>
  )
}

export default Favorite