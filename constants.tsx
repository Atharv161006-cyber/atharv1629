import { Product } from './types';
import productsData from './public/products.json';

export const CATEGORIES = ['All', 'Electronics', 'Women\'s Fashion', 'Men\'s Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Footwear', 'Groceries', 'Books'];

// Convert products from JSON to Product type
export const PRODUCTS: Product[] = productsData.map((p: any) => ({
  id: String(p.id),
  name: p.name,
  category: p.category,
  price: p.price / 83.5, // Convert INR to USD for display
  description: p.description,
  image: p.image,
  rating: p.rating,
  reviews: p.numReviews
}));
