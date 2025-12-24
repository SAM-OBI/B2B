# B2B Marketplace

A modern, responsive **B2B Marketplace** built with **React 19** and **Vite**. This platform connects Suppliers and Buyers with a premium experience, featuring role-based dashboards, real-time cart management, and comprehensive admin oversight. It is **PWA-ready**, **Secure**, and **SEO-optimized**.

## Features

### 🛒 Buyer Experience
- **Smart Catalog**: Advanced search and category filtering for intuitive product discovery.
- **Dynamic Cart**: Real-time state management for items and pricing.
- **Seamless Checkout**: Integrated credit card UI with simulated payment processing and success feedback.
- **Order Tracking**: Visual status indicators for order history (Processing/Delivered).

### 🏭 Supplier Portal
- **Dashboard**: Real-time metrics on Sales and Active Orders.
- **Inventory Control**: Easy-to-use forms for listing industrial products.
- **Order Fulfillment**: Workflow to mark orders as Shipped or Delivered.

### 🛡️ Admin Console
- **Analytics**: Platform-wide performance tracking.
- **Moderation**: Tools to Ban/Unban users and Approve/Reject product listings.
- **Global Oversight**: Full visibility into all transactions and users.

### 🚀 Technical Highlights
- **PWA Support**: Installable as a native-like app with offline capabilities (`vite-plugin-pwa`).
- **SEO Optimized**: Fully semantic HTML5 structure with dynamic Meta tags and **JSON-LD Schema.org** markup for rich search results.
- **Secure Authentication**: Robust Input Validation (Regex) and polished UX with **SweetAlert2** notifications.
- **Notification System**: Global toast alerts for actions like "Order Placed" or "Payment Success".
- **Role-Based Security**: Protected routes ensuring Buyers, Suppliers, and Admins stay in their lanes.

## Tech Stack
- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS (Variables & Design Tokens)
- **Routing**: React Router DOM v7
- **State Management**: React Context API
- **SEO**: React Helmet Async
- **Security**: Custom Regex Validators + SweetAlert2

## Project Structure
```
src/
├── components/   # UI Kit (Button, SEO, Toast)
├── context/      # Global State (Auth, Cart, Notifications)
├── pages/        # Application Views
│   ├── admin/    # Management Console
│   ├── auth/     # Login/Register
│   ├── buyer/    # Shopping Experience
│   ├── supplier/ # Vendor Tools
│   └── Home.jsx  # Landing Page
└── App.jsx       # Main Router & Layout
```

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
