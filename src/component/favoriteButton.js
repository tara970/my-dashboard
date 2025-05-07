import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useAuth } from '../context/authContext'

const FavoriteButton = ({product}) => {
  
  const{ favorites, toggleFavorite } = useAuth();

   const isFavorited = favorites.some(p => p.id === product.id);


    return (
        <button
        onClick={() => toggleFavorite(product)}
        className="text-xl p-2 rounded-full transition duration-300 hover:scale-110"
      >
        {isFavorited ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-red-500" />
        )}
      </button>
  )
}

export default FavoriteButton