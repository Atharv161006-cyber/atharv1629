
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  address?: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod?: string;
}

export type ViewState = 'Home' | 'Category' | 'ProductDetails' | 'Cart' | 'Checkout' | 'Orders' | 'Login' | 'Signup' | 'Wishlist' | 'Profile';

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating';

export interface User {
  email: string;
  name: string;
}

export interface AIInsight {
  reason: string;
  bestFor: string;
  comparison?: string;
}
