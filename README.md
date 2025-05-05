# E-Commerce Remake

A modern, full-stack e-commerce application built with React and Express.

## 📋 Overview

This project is a complete e-commerce solution featuring user authentication, product management, shopping cart functionality, and checkout process. It's built with a React frontend and Node.js/Express backend, using MongoDB as the database.

The application features a modern, visually appealing UI design with a custom color scheme, interactive components, and responsive layouts. The design system is built on Tailwind CSS with extended configuration for consistent styling across all pages.

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
  - Modern, responsive design with Tailwind CSS
  - Custom color scheme and design system
  - Interactive animations and transitions
  - Optimized for all device sizes
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
│   ├── tailwind.config.js  # Tailwind CSS configuration
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

## 🎨 UI Modernization

The application features a modern UI design with the following enhancements:

### Design System

- **Custom Tailwind Configuration**: Extended color palette with primary, secondary, and neutral colors
- **Typography**: Improved font hierarchy with Inter and Roboto fonts
- **Shadows**: Custom shadow styles for cards, buttons, and UI elements
- **Border Radius**: Consistent rounded corners throughout the application
- **Animations**: Smooth transitions and hover effects for interactive elements

### Component Improvements

- **Navbar**:

  - Gradient text logo
  - Improved mobile menu with animations
  - Enhanced navigation items with better hover effects
  - Modern dropdown styling

- **Home Page**:

  - Hero section with background pattern and gradient overlay
  - Featured products section with card hover effects
  - Benefits section with interactive icons

- **Shop Page**:

  - Product search functionality
  - Enhanced product cards with hover effects
  - Improved image presentation with overlays
  - Better visual hierarchy for product information

- **Product Detail Page**:

  - Redesigned product image display
  - Improved product information layout
  - Added badges and tags for better visual hierarchy
  - Enhanced call-to-action buttons

- **Authentication Pages**:

  - Cleaner form design with better input styling
  - Icon indicators for form fields
  - Improved validation feedback
  - Enhanced button styling

- **Cart Page**:
  - Improved empty cart state with visual feedback
  - Enhanced cart item display with grid layout
  - Better checkout summary section
  - Loading state with spinner animation

### CSS Improvements

- **Modern Scrollbar**: Custom styling for scrollbars
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode Ready**: Color system supports future dark mode implementation
- **Accessibility**: Improved contrast and focus states

## 👏 Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Cloudinary](https://cloudinary.com/)
