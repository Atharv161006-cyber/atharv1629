
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const INR_RATE = 83.5;

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onCheckout, onContinueShopping }) => {
  const subtotalUSD = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingUSD = subtotalUSD > 100 ? 0 : 15.00;
  
  const subtotalINR = subtotalUSD * INR_RATE;
  const shippingINR = shippingUSD * INR_RATE;
  const totalINR = subtotalINR + shippingINR;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 max-w-lg mx-auto">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="fas fa-shopping-basket text-4xl text-gray-200"></i>
          </div>
          <h2 className="text-3xl font-bold text-black mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">Looks like you haven't added anything to your cart yet. Explore our premium collections!</p>
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
        <h1 className="text-3xl font-black text-black">Your Shopping Bag</h1>
        <span className="bg-gray-100 text-black px-4 py-1.5 rounded-full text-sm font-bold">
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
              <img src={item.image} alt={item.name} className="w-32 h-32 rounded-2xl object-cover shadow-sm ring-4 ring-gray-50" />
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-xl text-black mb-1">{item.name}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <p className="text-black font-black text-lg">₹{(item.price * INR_RATE).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  <p className="text-xs text-gray-400 font-medium">/ ${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-6">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 transition-all flex items-center justify-center"
                    >
                      <i className="fas fa-minus text-[10px]"></i>
                    </button>
                    <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 transition-all flex items-center justify-center"
                    >
                      <i className="fas fa-plus text-[10px]"></i>
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-bold flex items-center gap-2 transition-colors"
                  >
                    <i className="far fa-trash-alt"></i>
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right flex flex-col min-w-[120px]">
                <span className="font-black text-2xl text-gray-900">
                  ₹{(item.price * item.quantity * INR_RATE).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-gray-400 font-medium tracking-tight">
                  ${(item.price * item.quantity).toFixed(2)} USD
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-black mb-8 text-black">Order Summary</h2>
            <div className="space-y-5 mb-8 pb-8 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-gray-900 font-bold">₹{subtotalINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Shipping</span>
                <span className={`font-bold ${shippingINR === 0 ? 'text-green-500' : 'text-gray-900'}`}>
                  {shippingINR === 0 ? 'FREE' : `₹${shippingINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400 text-xs italic">GST (Included)</span>
                <span className="text-gray-400 text-xs font-bold">18%</span>
              </div>
            </div>
            <div className="mb-10">
              <div className="flex justify-between items-end mb-1">
                <span className="text-gray-900 font-black text-lg">Total Amount</span>
                <span className="text-3xl font-black text-black">₹{totalINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <p className="text-right text-[10px] text-gray-400 font-medium">
                Approximately ${(subtotalUSD + shippingUSD).toFixed(2)} USD
              </p>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-gray-900 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3"
            >
              Confirm Purchase
              <i className="fas fa-arrow-right text-sm"></i>
            </button>
            <div className="flex items-center justify-center gap-4 mt-8">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-4 grayscale opacity-50" alt="UPI" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 grayscale opacity-50" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 grayscale opacity-50" alt="Mastercard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
