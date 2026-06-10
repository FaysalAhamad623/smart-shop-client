# Male Fashion - E-Commerce Client

A premium, responsive men's fashion e-commerce application built with Next.js 13+, Tailwind CSS, and Framer Motion. This client-side application connects to a backend API to provide a seamless shopping experience with authentication, persistent cart/wishlist, and admin management capabilities.

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- Authenticated connection to the backend server (ensure server is running on port 5000)

### Installation Steps

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository_url>
    cd client
    ```

2.  **Install dependencies**:g
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env.local` file in the root directory and add the following variables:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_jwt_secret_here
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Route Summary

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Homepage with Hero, Featured Categories, New Arrivals |
| `/login` | Public | User authentication (Sign In) |
| `/register` | Public | User registration (Sign Up) |
| `/products` | Public | Shop page with search, filtering (price/category), and sorting |
| `/products/[id]` | Public | Product detail page with size/color selection |
| `/cart` | Public | Shopping cart page (Add/Remove items, Update Quantity) |
| `/wishlist` | Public | Wishlist page for saved items |
| `/faq` | Public | Frequently Asked Questions |
| `/profile` | Private | User profile dashboard (View info, Logout) |
| `/admin` | Admin | Admin Dashboard (Analytics, Product Management) |
| `/admin/add-product` | Admin | Form to create new product listings |

## ✨ Implemented Features

### 1. Authentication System
- **Secure Login/Register:** Users can create accounts and log in using email/password or Google OAuth.
- **Role-Based Access Control:** Differentiates between regular users and Admins.
- **Protected Routes:** Redirects unauthorized users from private pages like `/admin` or `/profile`.

### 2. Product Management
- **Browsing:** Grid view of products with responsive cards.
- **Filtering & Search:** Real-time search bar (in Navbar) and sidebar filters for Category, Price Range, and Sorting.
- **Product Details:** Dedicated page for each product showing images, detailed description, stock status, sizes, and colors.
- **Admin Tools:** Admins can add new products via a form (image URL support, resizing, etc.) and delete products.

### 3. Shopping Cart & Wishlist
- **Persistent Cart:** Cart items are saved to `localStorage`, so they persist even if the browser is closed or refreshed.
- **Global Wishlist:** "Heart" items to save them for later. accessible via the Navbar and specific `/wishlist` page.
- **Real-time Updates:** Navbar badges show the current number of items in the Cart and Wishlist instantly.

### 4. Admin Dashboard
- **Analytics Overview:** View key metrics like Total Sales, Total Orders, and Total Products.
- **Product Management:** List view of all inventory with Edit/Delete actions.
- **Responsive Sidebar:** Mobile-friendly admin navigation.

### 5. UI/UX Design
- **Responsive Layout:** text-xs on mobile, text-lg on desktop. Fully adaptive design.
- **Animations:** Smooth transitions using `framer-motion` (e.g., Search bar toggle, Page load animations, Hover effects).
- **Toast Notifications:** feedback for actions like "Added to Cart" or "Login Failed".
- **Loading States:** Custom loading skeletons for better perceived performance.
