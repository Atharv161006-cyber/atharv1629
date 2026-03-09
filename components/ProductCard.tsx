
import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onClick: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  isWishlisted: boolean;
}

const INR_RATE = 83.5;

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick, onToggleWishlist, isWishlisted }) => {
  const inrPrice = product.price * INR_RATE;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={() => onClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm z-10">
          <i className="fas fa-star text-gray-400 text-xs mr-1"></i>
          <span className="text-xs font-bold text-gray-700">{product.rating}</span>
        </div>
        <motion.button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          whileTap={{ scale: 0.8 }}
          className={`absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-all z-10 ${isWishlisted ? 'bg-black text-white' : 'bg-white/90 text-gray-400 hover:text-black'}`}
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart text-xs`}></i>
        </motion.button>
        {product.originalPrice && (
          <div className="absolute bottom-3 left-3 bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-widest z-10">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1">
          {product.category}
        </div>
        <h3 
          className="text-base font-bold text-black mb-2 line-clamp-1 cursor-pointer hover:underline transition-all"
          onClick={() => onClick(product)}
        >
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-4 h-8 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] font-bold text-gray-400 line-through mb-0.5">
                ₹{(product.originalPrice * INR_RATE).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            )}
            <span className="text-xl font-black text-gray-900">
              ₹{inrPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
            <span className="text-[10px] font-medium text-gray-400">
              Approx. ${product.price.toFixed(2)}
            </span>
          </div>
          <motion.button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            whileTap={{ scale: 0.9, backgroundColor: "#10b981" }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-black text-white p-3 rounded-xl hover:bg-gray-900 transition-colors duration-300 shadow-md shadow-gray-200"
          >
            <i className="fas fa-cart-plus"></i>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
