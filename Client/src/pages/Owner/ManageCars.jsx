import React, { useEffect, useState } from 'react'

import Title from '../../components/owner/Title'
import { assets, dummyCarData } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function ManageCars() {
  const { isOwner, Rupees, axios } = useAppContext();

  const [cars, setCars] = useState([]);

  async function fetchCarData() {
    try {
      const { data } = await axios.get('/api/owner/cars');

      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message)
    }
  }


  async function toggleAvailability(carID) {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carID });

      if (data.success) {
        toast.success(data.message);
        fetchCarData();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message)
    }
  }

  async function delCar(carID) {

    const confirm = window.confirm("Are you sure you want to delete this car ?");

    if (!confirm) return null

    try {
      const { data } = await axios.post('/api/owner/delete-car', { carID });

      if (data.success) {
        toast.success(data.message);
        fetchCarData();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message)
    }
  }


  useEffect(() => {
    isOwner && fetchCarData();
  }, [isOwner]);

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>

      <Title title="Manage Cars" subTitle="View all listed cars, update their details , or remove them from the booking platform." />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>

        <table className='w-full border-collapse text-left text-sm text-gray-100'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              cars.map((car, index) => (
                <tr key={index} className='border-t border-borderColor'>

                  <td className='p-3 flex items-center gap-3'>
                    <img
                      src={car.image}
                      alt=""
                      className='h-12 w-12 aspect-square rouded-md object-cover'
                    />

                    <div className="max-md:hidden">
                      <p className='font-medium text-black'>{car.brand} {car.model}</p>
                      <p className='font-medium text-gray-500'>{car.seating_capacity} • {car.transmission}</p>
                    </div>
                  </td>

                  <td className='p-3 max-md:hidden text-gray-500'>{car.category}</td>
                  <td className='p-3 text-gray-500'>{Rupees}{car.pricePerDay}/day</td>

                  <td className='p-3 text-gray-500'>
                    <span className={`px-2 py-1 rounded-full text-xs ${car.isAvailable
                      ? 'text-green-500 bg-green-200' : 'text-red-500 bg-red-200'}`}>
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className='flex item-center p-3'>
                    <img
                      onClick={() => toggleAvailability(car._id)}
                      src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
                      alt="Eye"
                      className='cursor-pointer' />

                    <img
                      onClick={() => delCar(car._id)}
                      src={assets.delete_icon}
                      alt="Eye"
                      className='cursor-pointer' />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default ManageCars