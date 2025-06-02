import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error.message)
      toast.error('Failed to fetch products')
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error.message)
      toast.error('Failed to delete product')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full px-4 py-8'>
      <h2 className='text-center text-2xl font-bold mb-8'>All Product List</h2>

      {list.length === 0 ? (
        <p className='text-center text-gray-500'>No products found.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200 shadow-md'>
            <thead>
              <tr className='bg-gray-100 text-left text-sm font-semibold text-gray-700'>
                <th className='py-3 px-4 border-b'>Image</th>
                <th className='py-3 px-4 border-b'>Name</th>
                <th className='py-3 px-4 border-b'>Category</th>
                <th className='py-3 px-4 border-b'>Price</th>
                <th className='py-3 px-4 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='py-2 px-4 border-b'>
                    <img
                      src={item.image?.[0] || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </td>
                  <td className='py-2 px-4 border-b'>{item.name}</td>
                  <td className='py-2 px-4 border-b'>{item.category}</td>
                  <td className='py-2 px-4 border-b'>₹{item.price}</td>
                  <td className='py-2 px-4 border-b space-x-2'>
                    <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>
                      Edit
                    </button>
                    <button
                      onClick={() => removeProduct(item._id)}
                      className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default List
