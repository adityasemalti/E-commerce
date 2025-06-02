import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../Context/AppContext';

const SearchResults = () => {
  const location = useLocation();
  const { products } = useContext(AppContext);

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  // Filter products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Search Results for "{searchQuery}"</h2>
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredProducts.map(product => (
            <div key={product._id} className='border p-4 rounded-lg shadow hover:shadow-lg transition'>
              <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-md mb-2' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-gray-700'>${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-600'>No products found matching your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
