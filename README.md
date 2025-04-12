# MERN Stack E-commerce Website

An end-to-end E-commerce web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project includes features like product listing, cart management, user authentication, order placement, and admin dashboard.

---

## 📦 Tech Stack

- **Frontend**: React.js, React Router, Axios, TailwindCSS / Bootstrap (optional)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas / local MongoDB
- **Authentication**: JWT (JSON Web Tokens)

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>=14)
- npm or yarn
- MongoDB (local instance or Atlas cluster)
- Git

---

## 📁 Project Structure Overview

```
MERN-Ecommerce/
├── client/          # React frontend
├── server/          # Express backend
├── .env             # Environment variables
├── README.md        # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to run the full project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/zarjin/e-commerce.git
cd e-commerce
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

> 🔒 Keep your `.env` private and never commit it to source control.

---

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Start the Backend Server

```bash
npm run start
```

> The backend will run on `http://localhost:5000`

---

### 5. Install Frontend Dependencies

Open a new terminal window:

```bash
cd frontend
npm install
```

### 6. Start the Frontend Server

```bash
npm run dev
```

> The frontend will run on `http://localhost:5173`

---

## ✅ Features

- 🔐 User Authentication (Register/Login)
- 🛒 Add to Cart & Checkout
---

## 🧪 Sample User Credentials (Optional)

If you're providing pre-registered users for testing, include:

```text
Email: testuser@example.com
Password: test123
```

---

## 🛠 Scripts

**Backend**:
```bash
npm start      # Runs server with nodemon
```

**Frontend**:
```bash
npm run dev        # Runs the React app
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

For questions, feel free to reach out:
- **Author**: Zarjin Islam Jewel
- **Email**: zarjinislamjewel@gmail.com
- **GitHub**: [@zarjin](https://github.com/yourusername)

Happy Coding! 💻✨

