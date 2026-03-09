import React, { useState } from 'react';
import { ViewState } from '../types';

interface AuthProps {
  view: 'Login' | 'Signup';
  onSwitch: (view: ViewState) => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

const Auth: React.FC<AuthProps> = ({ view, onSwitch, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onSuccess({ name: name || email.split('@')[0], email });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100">
        <h1 className="text-4xl font-black text-black mb-8 text-center">
          {view === 'Login' ? 'Welcome Back' : 'Create Account'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {view === 'Signup' && (
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
              placeholder="hello@example.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-4">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-black transition-all outline-none"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-gray-900 transition-all shadow-xl shadow-gray-200"
          >
            {view === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-gray-400 font-bold mb-4">
            {view === 'Login' ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button 
            onClick={() => onSwitch(view === 'Login' ? 'Signup' : 'Login')}
            className="text-black font-black hover:underline"
          >
            {view === 'Login' ? 'Create one now' : 'Sign in instead'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
