
import React, { useState, useEffect, useCallback } from 'react';
import { Product, CartItem, Order, ViewState, AIInsight, SortOption } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import ChatAssistant from './components/ChatAssistant';
import { getProductInsight, getComparisonInsight } from './services/geminiService';

const INR_RATE = 83.5;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('Home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shopez_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shopez_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shopez_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('shopez_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('shopez_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shopez_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('shopez_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopez_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopez_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const resetHome = useCallback(() => {
    setCurrentView('Home');
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(5000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= priceRange && (p.price * INR_RATE) >= 500;
    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // relevance (default order)
  });

  const featuredOffers = PRODUCTS.filter(p => p.originalPrice).slice(0, 4);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleProductClick = async (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('ProductDetails');
    setAiInsight(null);
    setLoadingInsight(true);
    const insight = await getProductInsight(product);
    setAiInsight(insight);
    setLoadingInsight(false);
  };

  const handleCheckout = () => {
    if (!user) {
      setCurrentView('Login');
      return;
    }
    setCurrentView('Checkout');
  };

  const completeOrder = (address: any, paymentMethod: string) => {
    setIsCheckoutLoading(true);
    setTimeout(() => {
      const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const newOrder: Order = {
        id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        items: [...cart],
        total: subtotal,
        status: 'Processing',
        address,
        paymentMethod
      };
      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
      setIsCheckoutLoading(false);
      setCurrentView('Orders');
    }, 2000);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'Cancelled' } : order
    ));
  };

  return (
    <div className="min-h-screen bg-white text-black transition-colors">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogoClick={resetHome}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        wishlistCount={wishlist.length}
        onSearch={setSearchQuery}
        user={user}
        onLogout={() => {
          setUser(null);
          setCurrentView('Home');
        }}
      />

      <main className="pb-24">
        {currentView === 'Home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="bg-black rounded-[3rem] overflow-hidden relative mb-16 shadow-2xl shadow-gray-200 border border-gray-800 transition-colors">
              <div className="relative z-10 px-8 py-20 sm:px-20 sm:py-28 max-w-2xl">
                <div className="inline-block bg-gray-800/30 backdrop-blur-sm border border-gray-700 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  Premium Quality • India Wide Shipping
                </div>
                <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] mb-8">
                  Better Living <br/>
                  <span className="text-gray-400">Simplified.</span>
                </h1>
                <p className="text-gray-300 text-xl mb-12 max-w-lg leading-relaxed font-medium">
                  Discover curated collections with AI-powered insights. Seamlessly shop in INR with secure payments.
                </p>
                <div className="flex flex-wrap gap-6">
                  <button 
                    onClick={() => {
                      const element = document.getElementById('products-grid');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white text-black px-10 py-5 rounded-2xl font-black shadow-2xl shadow-gray-900/40 hover:scale-105 active:scale-95 transition-all text-lg"
                  >
                    Start Browsing
                  </button>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('featured-offers');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-transparent text-white border-2 border-gray-700 px-10 py-5 rounded-2xl font-black hover:bg-white/10 transition-all text-lg"
                  >
                    Current Offers
                  </button>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200" className="absolute right-0 top-0 h-full w-2/5 object-cover mix-blend-overlay opacity-60 hidden lg:block" alt="Hero" />
            </div>

            {featuredOffers.length > 0 && (
              <div id="featured-offers" className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-black mb-2">Exclusive Offers</h2>
                    <div className="h-1.5 w-20 bg-rose-600 rounded-full"></div>
                  </div>
                  <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                    Limited Time Only
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  {featuredOffers.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart} 
                      onClick={handleProductClick} 
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={wishlist.some(p => p.id === product.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div id="products-grid" className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <h2 className="text-3xl font-black text-black">
                    {searchQuery ? `Searching: "${searchQuery}"` : 'Curated Categories'}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sort By</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="bg-gray-50 border-none rounded-xl py-2 px-4 text-xs font-bold focus:ring-2 focus:ring-black outline-none cursor-pointer"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-black rounded-full mb-6"></div>
                
                {(searchQuery || selectedCategory !== 'All') && (
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm max-w-xs transition-all animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">Price Range</span>
                      <span className="text-rose-600 font-black">Up to ₹{(priceRange * INR_RATE).toLocaleString('en-IN')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="5000" 
                      step="50"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
                    />
                    <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                      <span>₹0</span>
                      <span>₹{(5000 * INR_RATE).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto max-w-full no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-xl text-sm font-black transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-black text-white shadow-xl shadow-gray-200' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {filteredProducts.slice(0, 8).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                    onClick={handleProductClick} 
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.some(p => p.id === product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200 transition-colors">
                <i className="fas fa-search text-4xl text-gray-200 mb-4"></i>
                <p className="text-xl font-bold text-gray-400">We couldn't find what you're looking for.</p>
                <button onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setPriceRange(5000);}} className="text-black font-bold mt-4 hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        )}

        {currentView === 'ProductDetails' && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <button 
              onClick={() => setCurrentView('Home')}
              className="flex items-center text-gray-400 hover:text-black mb-12 transition-colors group font-bold tracking-tight"
            >
              <div className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center mr-4 group-hover:border-gray-200 group-hover:bg-gray-50 transition-all">
                <i className="fas fa-chevron-left text-xs group-hover:-translate-x-0.5 transition-transform"></i>
              </div>
              Back to Shop
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="relative rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-gray-100 p-8">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover aspect-square rounded-[2rem]" />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-black font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">{selectedProduct.category}</span>
                  <span className="text-gray-200 font-normal">/</span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-shield-check"></i> Authentic
                  </span>
                </div>
                <h1 className="text-5xl font-black text-black mb-6 leading-tight tracking-tight">{selectedProduct.name}</h1>
                <div className="flex items-center mb-10 pb-10 border-b border-gray-100">
                  <div className="flex text-gray-400 mr-4 bg-gray-50 px-3 py-1.5 rounded-xl">
                    <i className="fas fa-star mr-2"></i>
                    <span className="font-black text-black">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-gray-400 font-bold text-sm">{selectedProduct.reviews} customer reviews</span>
                </div>

                <p className="text-gray-500 text-xl leading-relaxed mb-12">
                  {selectedProduct.description}
                </p>

                <div className="mb-14">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-6xl font-black text-gray-900 tracking-tight">
                      ₹{(selectedProduct.price * INR_RATE).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-gray-400 font-bold text-lg">/ ${(selectedProduct.price).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest">Free Express Shipping</span>
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Delivery in 2-3 Days</span>
                  </div>
                </div>

                <div className="flex gap-6">
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="flex-grow bg-black text-white py-6 rounded-[2rem] font-black text-xl hover:bg-gray-900 active:scale-[0.98] transition-all shadow-2xl shadow-gray-200 flex items-center justify-center gap-4"
                  >
                    <i className="fas fa-shopping-bag"></i>
                    Add to Bag
                  </button>
                  <button 
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`w-20 h-20 border-2 rounded-[2rem] transition-all flex items-center justify-center ${wishlist.some(p => p.id === selectedProduct.id) ? 'bg-black border-black text-white' : 'border-gray-100 hover:bg-gray-50 text-gray-300'}`}
                  >
                    <i className={`${wishlist.some(p => p.id === selectedProduct.id) ? 'fas' : 'far'} fa-heart text-2xl`}></i>
                  </button>
                </div>

                <div className="mt-16 bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-black p-2.5 rounded-xl shadow-lg shadow-gray-200">
                      <i className="fas fa-sparkles text-white text-sm"></i>
                    </div>
                    <span className="font-black text-black uppercase tracking-widest text-xs">AI Buyer's Analysis</span>
                  </div>
                  
                  {loadingInsight ? (
                    <div className="space-y-6">
                      <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                    </div>
                  ) : aiInsight ? (
                    <div className="space-y-8 relative z-10">
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">The Highlights</div>
                        <p className="text-black font-bold text-lg leading-snug">{aiInsight.reason}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Best Match For</div>
                        <p className="text-black font-bold text-lg leading-snug">{aiInsight.bestFor}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic font-medium">Crunching data for you...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'Cart' && (
          <Cart 
            items={cart} 
            onUpdateQuantity={updateQuantity} 
            onRemove={removeFromCart} 
            onCheckout={handleCheckout} 
            onContinueShopping={() => setCurrentView('Home')} 
          />
        )}

        {currentView === 'Wishlist' && (
          <Wishlist 
            items={wishlist}
            onAddToCart={addToCart}
            onRemove={toggleWishlist}
            onProductClick={handleProductClick}
            onContinueShopping={() => setCurrentView('Home')}
          />
        )}

        {(currentView === 'Login' || currentView === 'Signup') && (
          <Auth 
            view={currentView as 'Login' | 'Signup'} 
            onSwitch={setCurrentView}
            onSuccess={(userData) => {
              setUser(userData);
              setCurrentView('Home');
            }}
          />
        )}

        {currentView === 'Checkout' && (
          <Checkout 
            items={cart}
            total={cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
            onComplete={completeOrder}
            onCancel={() => setCurrentView('Cart')}
          />
        )}

        {currentView === 'Profile' && user && (
          <Profile 
            user={user}
            orders={orders}
            onNavigateHome={() => setCurrentView('Home')}
          />
        )}

        {currentView === 'Orders' && (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-black mb-12 text-center text-gray-900">Your Orders</h1>
            {orders.length === 0 ? (
              <div className="bg-white p-20 rounded-[4rem] shadow-sm text-center border border-gray-100 max-w-2xl mx-auto">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10">
                  <i className="fas fa-shopping-bag text-5xl text-gray-200"></i>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">No orders yet</h2>
                <p className="text-gray-400 mb-12 text-lg leading-relaxed">You haven't placed any orders yet. Start shopping to fill this space!</p>
                <button 
                  onClick={() => setCurrentView('Home')} 
                  className="bg-black text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-900 transition-all shadow-2xl shadow-gray-200"
                >
                  Discover Products
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className="flex flex-wrap justify-between items-start mb-10 gap-6">
                      <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Order Tracking ID</p>
                        <h3 className="font-mono font-black text-2xl text-black group-hover:text-gray-800 transition-colors">{order.id}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Order Date</p>
                        <p className="font-black text-gray-900 text-lg">{order.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-6 mb-10 overflow-x-auto pb-6 no-scrollbar">
                      {order.items.map(item => (
                        <div key={item.id} className="flex-shrink-0 relative group/item">
                          <img src={item.image} className="w-24 h-24 rounded-[1.5rem] object-cover ring-4 ring-gray-50 group-hover/item:ring-gray-200 transition-all shadow-sm" alt={item.name} />
                          <span className="absolute -top-3 -right-3 bg-black text-white text-xs font-black h-7 w-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-between items-center pt-10 border-t border-gray-50 gap-8">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 items-center px-6 rounded-2xl font-black text-sm border ${order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-black border-gray-100'}`}>
                          <span className={`w-2 h-2 rounded-full mr-3 ${order.status === 'Cancelled' ? 'bg-red-600' : 'bg-black animate-pulse'}`}></span>
                          {order.status}
                        </div>
                        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                          <button 
                            onClick={() => cancelOrder(order.id)}
                            className="text-red-500 hover:text-red-700 font-black text-xs uppercase tracking-widest transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-gray-900 tracking-tight">
                          ₹{(order.total * INR_RATE).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
                          Approx. ${(order.total).toFixed(2)} USD
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {isCheckoutLoading && (
        <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-white p-14 rounded-[4rem] shadow-2xl max-w-sm w-full text-center border border-gray-50">
            <div className="relative w-28 h-28 mx-auto mb-12">
              <div className="absolute inset-0 border-[8px] border-gray-50 rounded-full"></div>
              <div className="absolute inset-0 border-[8px] border-black rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-shield-check text-black text-4xl"></i>
              </div>
            </div>
            <h2 className="text-3xl font-black mb-4 text-gray-900 tracking-tight">Secure Payment</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10">
              We're processing your transaction in INR via our secure encrypted gateway.
            </p>
            <div className="flex justify-center items-center gap-6 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-5" alt="UPI" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-gray-100 pt-24 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div 
              className="flex items-center mb-8 cursor-pointer group"
              onClick={resetHome}
            >
              <div className="bg-black text-white p-2 rounded-xl mr-3 shadow-lg shadow-gray-200 group-hover:bg-gray-900 transition-colors">
                <i className="fas fa-bolt"></i>
              </div>
              <span className="text-3xl font-black text-black tracking-tighter">ShopEZ</span>
            </div>
            <p className="text-gray-400 text-lg max-w-sm leading-relaxed mb-10 font-medium italic">Redefining the Indian shopping landscape with premium choice and AI intelligence.</p>
            <div className="flex space-x-6">
              {[ 'twitter', 'instagram', 'facebook', 'linkedin' ].map(social => (
                <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                  <i className={`fab fa-${social} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black text-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li><a href="#" className="hover:text-black transition-colors">Bestsellers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Exclusive Deals</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Indian Artisans</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Bulk Orders</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-black uppercase tracking-widest text-xs mb-8">Client Care</h4>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li><a href="#" className="hover:text-black transition-colors">Order Tracker</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns Center</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Ethics</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Support Hub</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-16 mt-16 border-t border-gray-50 flex flex-wrap justify-between items-center gap-8">
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest">© 2024 ShopEZ India. Built for the Future.</p>
          <div className="flex gap-8 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
            <span className="hover:text-gray-500 transition-colors cursor-pointer">Security Protocols</span>
            <span className="hover:text-gray-500 transition-colors cursor-pointer">Regulatory Terms</span>
            <span className="hover:text-gray-500 transition-colors cursor-pointer">Merchant Policy</span>
          </div>
        </div>
      </footer>
      <ChatAssistant />
    </div>
  );
};

export default App;
