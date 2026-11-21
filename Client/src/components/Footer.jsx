import React from 'react'
import { assets } from '../assets/assets';


function Footer() {
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray -500'>
            <div className='flex flex-wrap justify-between gap-8 pb-6 border-borderColor border-b'>
                <div>
                    <img src={assets.logo} alt="logo" className='h-8 md:h-9' />
                    <p className='max-wp-80 mt-3'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs
                    </p>
                    <div className='flex items-center gap-3 mt-6'>

                        <a href="#"><img src={assets.logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.instagram_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.twitter_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"><img src={assets.gmail_logo} className='w-5 h-5' alt="" /></a>

                    </div>
                </div>

                <div>
                    <h2 className='text-base text-gray-800 font-medium uppercase '>Quick Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse cars</a></li>
                        <li><a href="#">List Your cars </a></li>
                        <li><a href="#">About Us</a></li>

                    </ul>
                </div>

                <div>
                    <h2 className='text-base text-gray-800 font-medium uppercase '>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>

                    </ul>
                </div>

                <div>
                    <h2 className='text-base text-gray-800 font-medium uppercase i'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li>1234 luxury Drive</li>
                        <li>Panvel - 410206</li>
                        <li>932172+++</li>
                        <li>info@gmail.com</li>
                    </ul>
                </div>




            </div>
            {/* <hr className='border-gray-300 mt-8' /> */}
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="#">CarRental</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a> <span className='ml-3'> | </span> </li>
                    <li><a href="#">Terms</a><span className='ml-3'> | </span> </li>
                    <li><a href="#">Cookies</a> </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer

