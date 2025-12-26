# B2B Marketplace - Backend API

This is the server-side application for the B2B Marketplace, built with **Node.js**, **Express**, and **MongoDB**.

## Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   MongoDB (Local or Atlas)

### Installation

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Configuration

Ensure the root `.env` file contains the following variables (or create a `.env` in this directory):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/b2b-marketplace
JWT_SECRET=your_jwt_secret_key
```

### Running the Server

*   **Development**:
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication (`/api/auth`)

*   `POST /register`: Register a new user (Buyer/Supplier).
*   `POST /login`: Authenticate user and get JWT.
*   `GET /user`: Get current user profile (Protected).

### Products (`/api/products`)

*   `GET /`: Get all approved products (Public).
*   `POST /`: Add a new product (Supplier only).
*   `PUT /:id/status`: Approve/Reject product (Admin only).

### Orders (`/api/orders`)

*   `POST /`: Create a new order (Protected).
*   `GET /`: Get user's order history (Protected).

## Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose)
*   **Authentication**: JWT (JSON Web Tokens) & Bcrypt
*   **Cors**: Enabled for frontend integration
