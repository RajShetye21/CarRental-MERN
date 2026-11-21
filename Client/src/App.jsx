import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Layout from './pages/Owner/Layout';
import DashBoard from './pages/Owner/DashBoard';
import AddCar from './pages/Owner/AddCar';
import ManageCars from './pages/Owner/ManageCars';
import ManageBooking from './pages/Owner/ManageBooking';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';


function App() {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");


  return (
    <>
      <Toaster />
      {!isOwnerPath && <Navbar />}

      {showLogin && <Login />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/my-bookings' element={<MyBookings />} />

        <Route path='/owner' element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-cars' element={<ManageCars />} />
          <Route path='manage-bookings' element={<ManageBooking />} />
        </Route>


      </Routes>


      {!isOwnerPath && <Footer />}


    </>
  )
}

export default App