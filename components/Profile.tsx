
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, User } from '../types';

interface ProfileProps {
  user: User;
  orders: Order[];
  onNavigateHome: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, orders, onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'history' | 'tracking'>('orders');
  const [trackingId, setTrackingId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);

  const activeOrders = orders.filter(o => o.status !== 'Delivered');
  const orderHistory = orders.filter(o => o.status === 'Delivered');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase() === trackingId.toLowerCase());
    setTrackedOrder(found || null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500';
      case 'Shipped': return 'bg-blue-500';
      case 'Processing': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm sticky top-32">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-black mb-4 shadow-xl border-4 border-white">
                {user.name[0].toUpperCase()}
              </div>
              <h2 className="text-2xl font-black text-gray-900">{user.name}</h2>
              <p className="text-gray-400 font-bold text-sm">{user.email}</p>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'orders', label: 'My Orders', icon: 'fa-shopping-bag' },
                { id: 'history', label: 'Order History', icon: 'fa-history' },
                { id: 'tracking', label: 'Track Orders', icon: 'fa-map-marker-alt' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                    activeTab === tab.id 
                      ? 'bg-black text-white shadow-lg shadow-gray-200' 
                      : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <i className={`fas ${tab.icon}`}></i>
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="mt-12 pt-8 border-t border-gray-50">
              <button 
                onClick={onNavigateHome}
                className="w-full py-4 rounded-2xl border-2 border-gray-100 text-gray-400 font-black text-xs uppercase tracking-widest hover:bg-gray-50 hover:text-black transition-all"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-4xl font-black mb-10 text-gray-900">Active Orders</h1>
                {activeOrders.length === 0 ? (
                  <EmptyState title="No active orders" message="You don't have any orders in progress right now." />
                ) : (
                  <div className="space-y-8">
                    {activeOrders.map(order => <OrderCard key={order.id} order={order} />)}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-4xl font-black mb-10 text-gray-900">Order History</h1>
                {orderHistory.length === 0 ? (
                  <EmptyState title="History is empty" message="Once you receive your orders, they will appear here." />
                ) : (
                  <div className="space-y-8">
                    {orderHistory.map(order => <OrderCard key={order.id} order={order} />)}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'tracking' && (
              <motion.div
                key="tracking"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-4xl font-black mb-10 text-gray-900">Track Your Order</h1>
                <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm mb-10">
                  <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow relative">
                      <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        placeholder="Enter Order ID (e.g. ORD-12345)"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-14 pr-6 font-bold text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-gray-200"
                    >
                      Track Now
                    </button>
                  </form>
                </div>

                {trackedOrder ? (
                  <OrderCard order={trackedOrder} showTracking />
                ) : trackingId && (
                  <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-400 font-bold">No order found with that ID.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const OrderCard: React.FC<{ order: Order; showTracking?: boolean }> = ({ order, showTracking }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-emerald-500 bg-emerald-50';
      case 'Shipped': return 'text-blue-500 bg-blue-50';
      case 'Processing': return 'text-amber-500 bg-amber-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
      <div className="flex flex-wrap justify-between items-start mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Order ID</p>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <h3 className="font-mono font-black text-2xl text-black group-hover:text-gray-800 transition-colors">{order.id}</h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Ordered on</p>
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
            <div className="absolute top-full mt-3 left-0 w-max opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none">
              <p className="text-[10px] font-black text-black uppercase tracking-widest">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      {showTracking && (
        <div className="mb-10 pt-10 border-t border-gray-50">
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                order.status === 'Processing' ? 'w-1/3 bg-amber-500' : 
                order.status === 'Shipped' ? 'w-2/3 bg-blue-500' : 
                'w-full bg-emerald-500'
              }`}
            />
          </div>
          <div className="grid grid-cols-3 text-center">
            <div className={order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'text-black' : 'text-gray-300'}>
              <i className="fas fa-box-open mb-2"></i>
              <p className="text-[10px] font-black uppercase tracking-widest">Processing</p>
            </div>
            <div className={order.status === 'Shipped' || order.status === 'Delivered' ? 'text-black' : 'text-gray-300'}>
              <i className="fas fa-truck mb-2"></i>
              <p className="text-[10px] font-black uppercase tracking-widest">Shipped</p>
            </div>
            <div className={order.status === 'Delivered' ? 'text-black' : 'text-gray-300'}>
              <i className="fas fa-check-circle mb-2"></i>
              <p className="text-[10px] font-black uppercase tracking-widest">Delivered</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-8 border-t border-gray-50">
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Amount</p>
          <p className="text-2xl font-black text-black">₹{(order.total * 83.5).toLocaleString()}</p>
        </div>
        <button className="px-8 py-4 rounded-2xl bg-gray-50 text-black font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          View Details
        </button>
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ title: string; message: string }> = ({ title, message }) => (
  <div className="bg-white p-20 rounded-[4rem] shadow-sm text-center border border-gray-100">
    <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10">
      <i className="fas fa-shopping-bag text-5xl text-gray-200"></i>
    </div>
    <h2 className="text-3xl font-black text-gray-900 mb-4">{title}</h2>
    <p className="text-gray-400 mb-0 text-lg leading-relaxed">{message}</p>
  </div>
);

export default Profile;
