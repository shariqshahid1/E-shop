# Full Stack E-commerce Website

A modern e-commerce platform built with Next.js, Node.js, Express, MongoDB, and Razorpay.

## Features

- **Product Management**: Search, filter, and view product details.
- **Cart & Wishlist**: Add products to cart or save them for later.
- **User Authentication**: Secure JWT-based login and registration.
- **Checkout & Payments**: Razorpay payment gateway integration (Test Mode).
- **Admin Panel**: CRUD operations for products.
- **Responsive UI**: Built with Tailwind CSS and Lucide icons.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Razorpay Account (for API keys)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repo-url>
cd ecommerce
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
Seed the database with initial products:
```bash
npm run seed
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Start the frontend:
```bash
npm run dev
```

## Admin Credentials
- **Email**: `admin@example.com`
- **Password**: `password123`

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js, Express, Mongoose, JWT, Bcryptjs, Razorpay SDK.
- **Database**: MongoDB.
