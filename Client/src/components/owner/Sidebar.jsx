
import React, { useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom';
import { assets, dummyCarData, ownerMenuLinks } from '../../assets/assets';

import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

function Sidebar() {
    const { user, axios, fetchUser } = useAppContext();
    const location = useLocation();
    const [image, setImage] = useState('');

    const updateImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', image);

            const { data } = await axios.post('/api/owner/update-image', formData);

            if (data.success) {
                fetchUser();
                toast.success(data.message);
                setImage('');
            } else {
                toast.error(data.message);
            }

        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <div className='relative min-h-screen flex flex-col items-center pt-5 md:pt-8 px-2 md:px-3 w-16 md:w-52 lg:w-60 shrink-0 border-r border-gray-200 bg-white text-sm shadow-sm'>

            {/* Profile Section */}
            <div className='flex flex-col items-center w-full pb-5 md:pb-6 border-b border-gray-100'>

                <div className="group relative">
                    <label htmlFor="image" className='cursor-pointer'>
                        <img
                            src={image ? URL.createObjectURL(image) : user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCgccf9_K9F8VBSQHIGXOK8E-pOyzJ260SI_EuEcXKuw&s=10"}
                            alt=""
                            className='w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 md:border-4 border-gray-100 shadow-sm'
                        />

                        <input
                            type="file"
                            id='image'
                            accept='image/*'
                            hidden
                            onChange={e => setImage(e.target.files[0])}
                        />

                        <div className='absolute inset-0 hidden rounded-full bg-black/30 group-hover:flex items-center justify-center cursor-pointer'>
                            <img src={assets.edit_icon} alt="" className='w-4 md:w-5' />
                        </div>
                    </label>
                </div>

                {image && (
                    <button onClick={updateImage} className='mt-3 flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition cursor-pointer text-xs md:text-sm'>
                        <span className='hidden md:inline'>Save</span>
                        <img src={assets.check_icon} width={13} alt="" />
                    </button>
                )}

                <p className='mt-3 text-sm lg:text-base font-semibold text-gray-800 hidden md:block truncate max-w-full'>
                    {user?.name}
                </p>

                <p className='text-xs text-gray-400 mt-1 hidden md:block'>
                    Car Owner
                </p>
            </div>

            {/* Navigation Menu */}
            <div className="w-full flex flex-col gap-2 mt-5 md:mt-6">

                <p className='text-[11px] font-semibold uppercase tracking-widest text-gray-400 px-2 md:px-4 mb-2 hidden md:block'>
                    Dashboard Menu
                </p>

                {
                    ownerMenuLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            title={link.name}
                            className={`relative flex items-center justify-center md:justify-start gap-3 w-full py-3 px-2 md:px-4 rounded-xl transition-all duration-200 group
                            ${link.path === location.pathname
                                    ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >

                            <img
                                src={link.path === location.pathname ? link.coloredIcon : link.icon}
                                alt='car-icon'
                                className='w-5 h-5 object-contain shrink-0'
                            />

                            <span className='hidden md:block whitespace-nowrap'>
                                {link.name}
                            </span>

                            {link.path === location.pathname && (
                                <div className='absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-primary'></div>
                            )}

                        </NavLink>
                    ))
                }

            </div>

        </div>
    )
}

export default Sidebar
