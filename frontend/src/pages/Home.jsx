import React from "react";
import { Link } from "react-router";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Shop</h1>
      <p className="text-lg mb-4">
        Explore our collection of amazing products.
      </p>
      <Link to="/shop">
        <button className="bg-dark-green px-5 py-2.5 rounded-lg text-white font-semibold hover:bg-green-700 transition duration-300">
          Explore Products
        </button>
      </Link>
    </main>
  );
}
