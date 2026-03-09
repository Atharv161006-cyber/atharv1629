import { Product } from './types';

export const CATEGORIES = ['All', 'Electronics', 'Women\'s Fashion', 'Men\'s Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Footwear', 'Groceries', 'Books'];

// Products with reliable Unsplash images
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Copper Water Bottle',
    category: 'Home & Kitchen',
    price: 8.37,
    description: 'Handcrafted pure copper water bottle with leak-proof cap. Promotes Ayurvedic health benefits and keeps water naturally cool.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
    rating: 4.6,
    reviews: 1240
  },
  {
    id: '2',
    name: 'Wireless Earbuds with Deep Bass',
    category: 'Electronics',
    price: 15.55,
    description: 'True wireless earbuds with 13mm dynamic drivers for deep bass. 30 hours of total playtime and IPX5 water resistance.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop',
    rating: 4.4,
    reviews: 3500
  },
  {
    id: '3',
    name: 'Kanchipuram Silk Blend Saree',
    category: 'Women\'s Fashion',
    price: 106.59,
    description: 'Traditional Kanchipuram style silk blend saree with intricate golden zari work. Includes matching blouse piece.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
    rating: 4.8,
    reviews: 210
  },
  {
    id: '4',
    name: 'Men\'s Casual Loafers',
    category: 'Footwear',
    price: 11.96,
    description: 'Comfortable slip-on loafers made from premium synthetic leather. Breathable lining and durable rubber sole for daily wear.',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=600&fit=crop',
    rating: 4.2,
    reviews: 850
  },
  {
    id: '5',
    name: 'Vitamin C Face Serum',
    category: 'Beauty',
    price: 3.58,
    description: 'Advanced Vitamin C serum with Hyaluronic Acid for skin brightening and anti-aging. Suitable for all skin types.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop',
    rating: 4.5,
    reviews: 1800
  },
  {
    id: '6',
    name: 'TPE Yoga Mat 6mm',
    category: 'Sports',
    price: 7.17,
    description: '6mm thick TPE yoga mat with non-slip texture. Eco-friendly, sweat-resistant, and comes with a carrying strap.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
    rating: 4.7,
    reviews: 450
  },
  {
    id: '7',
    name: 'Digital Air Fryer 4.5L',
    category: 'Home & Kitchen',
    price: 41.91,
    description: '4.5L capacity air fryer with 8 preset programs. Uses 90% less oil for healthy and crispy frying.',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&h=600&fit=crop',
    rating: 4.7,
    reviews: 1100
  },
  {
    id: '8',
    name: '43 inch 4K Ultra HD Smart TV',
    category: 'Electronics',
    price: 299.40,
    description: 'Stunning 4K display with HDR10 support. Built-in Google Assistant and all popular streaming apps.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop',
    rating: 4.5,
    reviews: 3400
  },
  {
    id: '9',
    name: 'Cotton Bedding Set King Size',
    category: 'Home & Kitchen',
    price: 23.94,
    description: 'King-size 100% cotton bedsheet with two pillow covers. 300 thread count for a soft and luxurious feel.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
    rating: 4.5,
    reviews: 600
  },
  {
    id: '10',
    name: '20000mAh Power Bank Fast Charging',
    category: 'Electronics',
    price: 19.16,
    description: 'High-capacity power bank with 22.5W fast charging. Dual USB output and Type-C input for multi-device charging.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop',
    rating: 4.3,
    reviews: 2100
  },
  {
    id: '11',
    name: 'Embroidered Cotton Kurti',
    category: 'Women\'s Fashion',
    price: 10.77,
    description: 'Straight-fit cotton kurti with delicate hand embroidery on the neck and sleeves. Ideal for office or casual wear.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop',
    rating: 4.4,
    reviews: 430
  },
  {
    id: '12',
    name: 'Waterproof Hiking Boots',
    category: 'Footwear',
    price: 29.94,
    description: 'Waterproof hiking boots with high-traction sole and ankle support. Built for tough terrains and long treks.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&h=600&fit=crop',
    rating: 4.7,
    reviews: 180
  },
  {
    id: '13',
    name: 'Argan Oil Hair Mask',
    category: 'Beauty',
    price: 5.38,
    description: 'Deep conditioning hair mask enriched with Moroccan Argan oil. Repairs damaged hair and adds intense shine.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
    rating: 4.6,
    reviews: 950
  },
  {
    id: '14',
    name: 'Badminton Racket Carbon Fiber',
    category: 'Sports',
    price: 15.55,
    description: 'Lightweight carbon fiber badminton racket with high tension strings. Designed for power and precision.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&h=600&fit=crop',
    rating: 4.5,
    reviews: 280
  },
  {
    id: '15',
    name: 'Cricket Bat Kashmir Willow',
    category: 'Sports',
    price: 22.75,
    description: 'Handcrafted Kashmir willow cricket bat with a thick edge and large sweet spot. Ideal for club matches.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=600&fit=crop',
    rating: 4.6,
    reviews: 310
  },
  {
    id: '16',
    name: 'Premium Basmati Rice 5kg',
    category: 'Groceries',
    price: 8.37,
    description: 'Extra-long grain aged Basmati rice. Perfect for biryanis and pulaos with its distinct aroma.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop',
    rating: 4.7,
    reviews: 890
  },
  {
    id: '17',
    name: 'Non-Stick Cookware Set 3 Piece',
    category: 'Home & Kitchen',
    price: 29.94,
    description: '3-piece non-stick set including a tawa, fry pan, and kadhai. PFOA-free coating for healthy cooking.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop',
    rating: 4.4,
    reviews: 750
  },
  {
    id: '18',
    name: 'Wireless Optical Mouse',
    category: 'Electronics',
    price: 4.78,
    description: 'Ergonomic wireless mouse with 1600 DPI sensitivity. Plug-and-play with a tiny USB receiver.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop',
    rating: 4.2,
    reviews: 1500
  },
  {
    id: '19',
    name: 'Men\'s Linen Shirt',
    category: 'Men\'s Fashion',
    price: 19.16,
    description: 'Breathable 100% linen shirt in a relaxed fit. Perfect for staying cool and stylish in the heat.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
    rating: 4.5,
    reviews: 240
  },
  {
    id: '20',
    name: 'Floral Print Maxi Dress',
    category: 'Women\'s Fashion',
    price: 21.55,
    description: 'Flowy georgette maxi dress with a vibrant floral print. Features a cinched waist and ruffled hem.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop',
    rating: 4.6,
    reviews: 180
  },
  {
    id: '21',
    name: 'Women\'s Walking Sneakers',
    category: 'Footwear',
    price: 16.76,
    description: 'Lightweight walking shoes with memory foam insole. Breathable mesh upper for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop',
    rating: 4.4,
    reviews: 650
  },
  {
    id: '22',
    name: 'Charcoal Face Wash',
    category: 'Beauty',
    price: 2.98,
    description: 'Deep cleansing face wash with activated charcoal. Removes dirt, oil, and impurities for clear skin.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
    rating: 4.3,
    reviews: 1100
  },
  {
    id: '23',
    name: 'Adjustable Dumbbells Set of 2',
    category: 'Sports',
    price: 53.89,
    description: 'Space-saving adjustable dumbbells. Change weights easily from 2.5kg to 12.5kg with a simple dial.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
    rating: 4.8,
    reviews: 150
  },
  {
    id: '24',
    name: 'Men\'s Slim Fit Chino Trousers',
    category: 'Men\'s Fashion',
    price: 15.55,
    description: 'Slim-fit cotton chinos with a hint of stretch. Versatile design suitable for both formal and casual occasions.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop',
    rating: 4.3,
    reviews: 520
  },
  {
    id: '25',
    name: 'Matte Lipstick Long Lasting',
    category: 'Beauty',
    price: 4.18,
    description: 'Long-lasting matte lipstick with a creamy texture. Enriched with Vitamin E to keep lips hydrated.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop',
    rating: 4.4,
    reviews: 1200
  },
  {
    id: '26',
    name: 'Organic Darjeeling Tea 250g',
    category: 'Groceries',
    price: 7.17,
    description: 'First flush organic Darjeeling tea leaves. Known for its delicate floral aroma and muscatel flavor.',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=600&fit=crop',
    rating: 4.8,
    reviews: 140
  },
  {
    id: '27',
    name: 'Ancient India History Book',
    category: 'Books',
    price: 3.58,
    description: 'A comprehensive guide to the history and culture of Ancient India. Perfect for students and history enthusiasts.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop',
    rating: 4.6,
    reviews: 150
  },
  {
    id: '28',
    name: 'Indian Cooking Cookbook',
    category: 'Books',
    price: 5.38,
    description: 'A beautifully illustrated cookbook featuring over 100 authentic recipes from across India.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop',
    rating: 4.9,
    reviews: 85
  },
  {
    id: '29',
    name: 'Himalayan Spice Mix Set of 4',
    category: 'Groceries',
    price: 5.39,
    description: 'Authentic blend of Turmeric, Cumin, Coriander, and Garam Masala sourced from the foothills of the Himalayas.',
    image: 'https://images.unsplash.com/photo-1596040033229-a0b3b46fe6b6?w=600&h=600&fit=crop',
    rating: 4.9,
    reviews: 320
  },
  {
    id: '30',
    name: 'Yoga for Modern Living Book',
    category: 'Books',
    price: 3.58,
    description: 'A practical guide to yoga asanas and meditation for stress relief in the modern world.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    rating: 4.8,
    reviews: 120
  }
];
