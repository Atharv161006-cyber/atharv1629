
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface WishlistProps {
  items: Product[];
  onAddToCart: (p: Product) => void;
  onRemove: (p: Product) => void;
  onProductClick: (p: Product) => void;
  onContinueShopping: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ items, onAddToCart, onRemove, onProductClick, onContinueShopping }) => {
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 max-w-lg mx-auto">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="far fa-heart text-4xl text-gray-200"></i>
          </div>
          <h2 className="text-3xl font-bold text-black mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">Save items you love to find them easily later. Explore our premium collections!</p>
          <button 
            onClick={onContinueShopping}
            className="w-full bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-xl shadow-gray-200"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black text-black">Your Wishlist</h1>
        <span className="bg-gray-100 text-black px-4 py-1.5 rounded-full text-sm font-bold">
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onClick={onProductClick}
            onToggleWishlist={onRemove}
            isWishlisted={true}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={onContinueShopping}
          className="text-black font-black hover:underline flex items-center gap-2 mx-auto"
        >
          <i className="fas fa-arrow-left text-xs"></i>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
