# ShopEZ - Intelligent E-Commerce Platform

A modern, feature-rich e-commerce platform built with React, TypeScript, and Vite. Features real Amazon India products with AI-powered insights.

## 🚀 Live Demo
[View Live Demo](https://atharv1629.vercel.app) *(Update this with your actual Vercel URL)*

## 📸 Screenshots
![ShopEZ Homepage](https://via.placeholder.com/800x400?text=Add+Screenshot+Here)

## ✨ Features

### Core Features
- 🛍️ **Product Catalog** - Browse 30+ real products with Amazon India pricing
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- ❤️ **Wishlist** - Save favorite products for later
- 🔐 **User Authentication** - Login/Signup functionality
- 💳 **Checkout System** - Complete order processing with address and payment
- 📦 **Order Tracking** - View order history and status
- 👤 **User Profile** - Manage account and view orders

### Advanced Features
- 🤖 **AI Product Insights** - Powered by Google Gemini AI
- 🔍 **Smart Search** - Real-time product search
- 🏷️ **Category Filters** - Filter by Electronics, Fashion, Beauty, Sports, etc.
- 💰 **Price Range Filter** - Adjustable price slider
- ⭐ **Product Ratings** - Customer reviews and ratings
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Clean, professional interface with smooth animations

## 🛠️ Technologies Used

- **Frontend Framework:** React 19.2.4
- **Language:** TypeScript
- **Build Tool:** Vite 6.2.0
- **Styling:** Tailwind CSS 4.2.0
- **Animations:** Motion 12.34.3
- **AI Integration:** Google Generative AI (Gemini)
- **Icons:** Font Awesome

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Atharv161006-cyber/atharv1629.git
   cd atharv1629
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your Google Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
├── components/          # React components
│   ├── Auth.tsx        # Login/Signup
│   ├── Cart.tsx        # Shopping cart
│   ├── Checkout.tsx    # Checkout process
│   ├── Navbar.tsx      # Navigation bar
│   ├── ProductCard.tsx # Product display card
│   ├── Profile.tsx     # User profile
│   └── Wishlist.tsx    # Wishlist management
├── services/           # API services
│   └── geminiService.ts # AI integration
├── public/             # Static assets
│   └── products.json   # Product data
├── App.tsx             # Main app component
├── constants.tsx       # App constants
├── types.ts            # TypeScript types
└── index.tsx           # Entry point
```

## 🎯 Key Highlights

### 1. Real Product Data
- 30+ products with real Amazon India prices
- Authentic product images
- Popular Indian brands (boAt, Woodland, Philips, Samsung, etc.)

### 2. AI-Powered Insights
- Product recommendations using Google Gemini AI
- Smart product analysis
- Personalized suggestions

### 3. Complete E-Commerce Flow
- Browse → Add to Cart → Checkout → Order Confirmation
- Persistent cart using localStorage
- Order history tracking

### 4. Modern UX/UI
- Smooth animations and transitions
- Intuitive navigation
- Professional design
- Mobile-responsive layout

## 💡 Usage

1. **Browse Products** - Explore products by category or search
2. **Add to Cart** - Click "Add to Bag" on any product
3. **Manage Cart** - Adjust quantities or remove items
4. **Wishlist** - Save products for later
5. **Checkout** - Complete purchase with shipping details
6. **Track Orders** - View order history in your profile

## 🌐 Deployment

This project is deployed on Vercel for optimal performance and reliability.

**Deploy your own:**
```bash
npm install -g vercel
vercel --prod
```

## 📊 Product Categories

- Electronics (TVs, Laptops, Earbuds, Power Banks)
- Women's Fashion (Sarees, Kurtis, Dresses)
- Men's Fashion (Shirts, Trousers, Jackets)
- Home & Kitchen (Appliances, Cookware, Bedding)
- Beauty (Skincare, Makeup, Hair Care)
- Sports (Yoga Mats, Cricket Bats, Dumbbells)
- Footwear (Sneakers, Loafers, Hiking Boots)
- Groceries (Spices, Rice, Tea, Honey)
- Books (History, Cooking, Yoga, Mythology)

## 🔒 Security Features

- Secure authentication flow
- Input validation
- XSS protection
- Safe localStorage usage

## 🎓 Learning Outcomes

This project demonstrates:
- Modern React development with TypeScript
- State management and hooks
- API integration (Google Gemini AI)
- Responsive design principles
- E-commerce workflow implementation
- Git version control
- Deployment and DevOps

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Developer

**Atharv**
- GitHub: [@Atharv161006-cyber](https://github.com/Atharv161006-cyber)

## 🙏 Acknowledgments

- Product data inspired by Amazon India
- AI powered by Google Gemini
- Icons by Font Awesome
- Design inspiration from modern e-commerce platforms

---

**Note:** This is a demonstration project for educational purposes. Product images and data are used for educational demonstration only.
