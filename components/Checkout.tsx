import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onComplete: (address: any, paymentMethod: string) => void;
  onCancel: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, total, onComplete, onCancel }) => {
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(address, paymentMethod);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <button 
            onClick={onCancel}
            className="text-gray-400 font-bold mb-8 hover:text-black flex items-center gap-2 transition-colors"
          >
            <i className="fas fa-arrow-left text-xs"></i> Back to Cart
          </button>
          
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100">
            <div className="flex items-center gap-4 mb-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step === 'address' ? 'bg-black text-white' : 'bg-green-100 text-green-600'}`}>
                {step === 'address' ? '1' : <i className="fas fa-check"></i>}
              </div>
              <div className="h-px flex-grow bg-gray-100"></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step === 'payment' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                2
              </div>
            </div>

            {step === 'address' ? (
              <form onSubmit={handleAddressSubmit} className="space-y-6">
                <h2 className="text-3xl font-black text-black mb-8">Shipping Address</h2>
                <div className="space-y-4">
                  <input 
                    type="text" required placeholder="Full Name"
                    value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-black outline-none"
                  />
                  <input 
                    type="text" required placeholder="Street Address"
                    value={address.street} onChange={e => setAddress({...address, street: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-black outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" required placeholder="City"
                      value={address.city} onChange={e => setAddress({...address, city: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-black outline-none"
                    />
                    <input 
                      type="text" required placeholder="State"
                      value={address.state} onChange={e => setAddress({...address, state: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <input 
                    type="text" required placeholder="Zip Code"
                    value={address.zipCode} onChange={e => setAddress({...address, zipCode: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-gray-900 transition-all shadow-xl shadow-gray-200">
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <h2 className="text-3xl font-black text-black mb-8">Payment Method</h2>
                <div className="space-y-4">
                  {['UPI', 'Credit/Debit Card', 'Net Banking', 'Cash on Delivery'].map(method => (
                    <label key={method} className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === method ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <span className="font-black text-gray-900">{method}</span>
                      <input 
                        type="radio" name="payment" value={method}
                        checked={paymentMethod === method}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-black"
                      />
                    </label>
                  ))}
                </div>
                <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-gray-900 transition-all shadow-xl shadow-gray-200">
                  Confirm Order
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="lg:pt-20">
          <div className="bg-black text-white rounded-[3rem] p-10 shadow-2xl sticky top-32">
            <h2 className="text-2xl font-black mb-8 text-white">Order Summary</h2>
            <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-4 no-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt={item.name} />
                    <div>
                      <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-black">₹{(item.price * 83.5 * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-8 space-y-4">
              <div className="flex justify-between text-gray-400 font-bold">
                <span>Subtotal</span>
                <span>₹{(total * 83.5).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-bold">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-white">₹{(total * 83.5).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
