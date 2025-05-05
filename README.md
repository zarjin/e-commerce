# E-Commerce Remake

A modern, full-stack e-commerce application built with React and Express.

## 📋 Overview

This project is a complete e-commerce solution featuring user authentication, product management, shopping cart functionality, and checkout process. It's built with a React frontend and Node.js/Express backend, using MongoDB as the database.

## 🚀 Features

- **User Authentication**
  - Register and login functionality
  - JWT-based authentication
  - User profile management

- **Product Management**
  - Browse products
  - View product details
  - Admin product creation and management

- **Shopping Experience**
  - Add products to cart
  - Manage cart items
  - Checkout process

- **User Interface**
  - Responsive design with Tailwind CSS
  - Toast notifications
  - Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - API requests
- **React Toastify** - Notifications
- **Context API** - State management

### Backend
- **Express** - Web framework
- **MongoDB/Mongoose** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File uploads

## 📂 Project Structure

```
e-commerce-remake/
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
├── backend/                # Express backend
│   ├── configs/            # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
│
└── README.md               # Project documentation
```

## 🔧 Setup and Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account (for image storage)

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_API=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

#### Frontend (.env)
```
VITE_USER_API=http://localhost:5000/api/user
VITE_AUTH_API=http://localhost:5000/api/auth
VITE_PRODUCT_API=http://localhost:5000/api/product
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/zarjin/e-commerce-remake.git
   cd e-commerce-remake
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm run dev
   ```

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

1. **Register/Login**: Create an account or login to access full functionality
2. **Browse Products**: View all available products on the Shop page
3. **Product Details**: Click on a product to view detailed information
4. **Add to Cart**: Add products to your shopping cart
5. **Checkout**: Complete your purchase through the checkout process

## 🧪 Running Tests

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
