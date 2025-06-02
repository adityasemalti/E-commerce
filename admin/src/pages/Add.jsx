import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Top Wear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!image1 && !image2 && !image3 && !image4) {
      toast.error('Please upload at least one image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Men');
        setSubCategory('Top Wear');
        setBestseller(false);
        setSizes([]);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to add product');
    }
  };

  const renderImagePreview = (img) => {
    if (!img) return 'https://cdn-icons-png.flaticon.com/256/10024/10024501.png';
    return URL.createObjectURL(img);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded shadow-md">
      {/* Images Upload */}
      <div>
        <p className="text-xl font-semibold mb-2">Upload Images</p>
        <div className="flex gap-4">
          {[image1, image2, image3, image4].map((img, i) => (
            <label key={i} htmlFor={`image${i}`} className="cursor-pointer">
              <img
                src={renderImagePreview(img)}
                alt={`upload-${i}`}
                className="w-24 h-24 object-cover rounded border border-gray-300 hover:border-black transition"
              />
              <input
                id={`image${i}`}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (i === 0) setImage1(file);
                  else if (i === 1) setImage2(file);
                  else if (i === 2) setImage3(file);
                  else if (i === 3) setImage4(file);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block font-medium mb-1" htmlFor="productName">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          id="productName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full max-w-lg border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Type product name"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1" htmlFor="productDescription">
          Product Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="productDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full max-w-lg border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Write product description"
        />
      </div>

      {/* Category & Subcategory & Price */}
      <div className="flex flex-wrap gap-6 max-w-lg">
        <div className="flex-1 min-w-[150px]">
          <label className="block font-medium mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block font-medium mb-1" htmlFor="subCategory">
            Sub Category
          </label>
          <select
            id="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option>Top Wear</option>
            <option>Bottom Wear</option>
            <option>Winter Wear</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block font-medium mb-1" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter price"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="font-medium mb-2">Product Sizes</p>
        <div className="flex gap-4 max-w-lg">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`px-4 py-1 rounded cursor-pointer border ${
                sizes.includes(size)
                  ? 'bg-black text-white border-black'
                  : 'bg-gray-200 border-gray-400'
              } transition`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2">
        <input
          id="bestseller"
          type="checkbox"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className="cursor-pointer"
        />
        <label htmlFor="bestseller" className="cursor-pointer select-none">
          Best Seller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-32 py-3 bg-black text-white rounded font-semibold hover:bg-gray-800 transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
