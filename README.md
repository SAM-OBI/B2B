# B2B Marketplace

A modern, responsive B2B Marketplace application built with **React 19** and **Vite**. This platform connects Suppliers and Buyers, facilitating seamless trade of industrial goods, machinery, and raw materials, while providing robust oversight tools for Admins.

## Features

### 🔐 Authentication & Roles
- **Unified Login**: Secure access for all user types.
- **Role-Based Registration**: Dynamic registration flow for Buyers and Suppliers.
- **Protected Routes**: Role-specific access control (Buyer vs. Supplier vs. Admin).

### 🏭 Supplier Portal
- **Dashboard**: Overview of sales, active orders, and inventory status.
- **Product Management**: Add new products with details like category, pricing, and specifications.
- **Order Management**: View incoming orders and update their status (Pending → Shipped → Delivered).

### 🛒 Buyer Experience
- **Product Catalog**: Browse and search products with category content filters.
- **Shopping Cart**: Real-time cart management with quantity adjustments.
- **Checkout Flow**: Streamlined checkout process with shipping address collection.
- **Order History**: Track past purchases and view order status.

### 🛡️ Admin Console
- **Analytics Dashboard**: High-level metrics on Revenue, Active Users, and Pending Items.
- **User Management**: Monitor user base and ban/activate accounts.
- **Product Moderation**: Review and approve/reject new supplier listings.
- **Global Orders**: Complete oversight of all platform transactions.

### 🎨 Design System
- **Premium UI**: Built with a custom "Indigo & Slate" dark theme.
- **Responsive Layout**: Optimized for desktop and tablet usage.
- **Reusable Components**: Modular UI kit (Buttons, Inputs, Cards).

## Tech Stack
- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS (Variables & Design Tokens)
- **Routing**: React Router DOM v7
- **Linting**: ESLint

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure
```
src/
├── components/   # Reusable UI components (Button, etc.)
├── context/      # Global State (Auth, Cart)
├── layouts/      # Layout wrappers
├── pages/        # Page Views
│   ├── admin/    # Dashboard, Users, Products, Orders
│   ├── auth/     # Login, Register
│   ├── buyer/    # Catalog, Cart, Checkout, Dashboard
│   ├── supplier/ # Add Product, Orders, Dashboard
│   └── Home.jsx  # Landing Page
└── App.jsx       # Main Entry with Routing
```
# B2B
