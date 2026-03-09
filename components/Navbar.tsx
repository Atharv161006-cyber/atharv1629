
import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ViewState } from '../types';
import VisualSearch from './VisualSearch';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogoClick: () => void;
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onLogoClick, cartCount, wishlistCount, onSearch, user, onLogout }) => {
  const [query, setQuery] = useState('');
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <div 
            className="flex items-center cursor-pointer group shrink-0"
            onClick={onLogoClick}
          >
            <div className="bg-black text-white p-2 rounded-lg mr-2 group-hover:bg-gray-900 transition-colors">
              <i className="fas fa-bolt text-xl"></i>
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900 hidden sm:block">ShopEZ</span>
          </div>

          <form 
            onSubmit={handleSearchSubmit}
            className="flex-grow max-w-md mx-4 relative"
          >
            <input 
              type="text" 
              placeholder="Search products..." 
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value); // Real-time filtering
              }}
              className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-5 pr-20 text-sm focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none"
            />
            <button 
              type="button"
              onClick={() => setIsVisualSearchOpen(true)}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors h-8 w-8 flex items-center justify-center"
            >
              <i className="fas fa-camera text-sm"></i>
            </button>
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-900 transition-colors h-8 w-8 flex items-center justify-center"
            >
              <i className="fas fa-search text-xs"></i>
            </button>
          </form>

          <div className="hidden lg:flex space-x-8 shrink-0">
            <button 
              onClick={onLogoClick}
              className={`${currentView === 'Home' ? 'text-black font-semibold underline underline-offset-8' : 'text-gray-600 hover:text-black'} transition-colors`}
            >
              Shop
            </button>
            <button 
              onClick={() => onNavigate('Orders')}
              className={`${currentView === 'Orders' ? 'text-black font-semibold underline underline-offset-8' : 'text-gray-600 hover:text-black'} transition-colors`}
            >
              Orders
            </button>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="relative group">
              <button 
                onClick={() => onNavigate('Wishlist')}
                className="p-2 text-gray-600 hover:text-black transition-colors relative"
              >
                <i className="far fa-heart text-xl"></i>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>

            <div className="relative group">
              <button 
                onClick={() => onNavigate('Cart')}
                className="p-2 text-gray-600 hover:text-black transition-colors relative"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{user.name}</span>
                  <button 
                    onClick={onLogout}
                    className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                  >
                    Logout
                  </button>
                </div>
                <button 
                  onClick={() => onNavigate('Profile')}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-black font-black border-2 shadow-sm transition-all ${
                    currentView === 'Profile' ? 'bg-black text-white border-black' : 'bg-gray-100 border-white hover:bg-gray-200'
                  }`}
                >
                  {user.name[0].toUpperCase()}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('Login')}
                className="hidden sm:block bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVisualSearchOpen && (
          <VisualSearch 
            onSearch={(q) => {
              setQuery(q);
              onSearch(q);
            }} 
            onClose={() => setIsVisualSearchOpen(false)} 
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
