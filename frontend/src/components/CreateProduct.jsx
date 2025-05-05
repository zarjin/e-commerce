import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

export default function CreateProduct() {
  const { createProduct } = useContext(ProductContext);
  const [ProductData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    productPicture: null,
    brand: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', ProductData.name);
    formData.append('description', ProductData.description);
    formData.append('price', ProductData.price);
    formData.append('productPicture', ProductData.productPicture);
    formData.append('brand', ProductData.brand);
    await createProduct(formData);
    setProductData({
      name: '',
      description: '',
      price: '',
      productPicture: null,
      brand: '',
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
          Create a Post
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={ProductData.name}
            onChange={(e) =>
              setProductData({ ...ProductData, name: e.target.value })
            }
            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Description"
            value={ProductData.description}
            onChange={(e) =>
              setProductData({ ...ProductData, description: e.target.value })
            }
            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Price"
            value={ProductData.price}
            onChange={(e) =>
              setProductData({ ...ProductData, price: e.target.value })
            }
            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="file"
            placeholder="Product Picture"
            accept="image/*"
            onChange={(e) =>
              setProductData({
                ...ProductData,
                productPicture: e.target.files[0],
              })
            }
            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Brand"
            value={ProductData.brand}
            onChange={(e) =>
              setProductData({ ...ProductData, brand: e.target.value })
            }
            className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="mt-4 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
