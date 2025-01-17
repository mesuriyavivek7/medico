import React, { useState } from 'react'

import { Link } from 'react-router-dom';

//Importing images
import IMG1 from '../assets/asset7.png'
import IMG2 from '../assets/asset8.png'

//Importing icons
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DateRangeIcon from '@mui/icons-material/DateRange';


function Leave() {

  const [activeState,setActiveState] = useState('approve')

  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-gray-600 text-base md:text-lg font-medium'>Leaves</h1>
          <div className='flex items-center gap-2'>
             <span onClick={()=>setActiveState("approve")} className={`w-20 ${activeState==="approve"?"bg-themeblue text-white":"text-gray-600"} cursor-pointer hover:bg-themeblue hover:text-white transition-colors duration-300 flex justify-center items-center text-sm p-1 border rounded-md`}>Approved</span>
             <span onClick={()=>setActiveState("pending")} className={`w-20 ${activeState==="pending"?"bg-themeblue text-white":"text-gray-600"} cursor-pointer hover:bg-themeblue hover:text-white transition-colors duration-300 flex justify-center items-center text-sm p-1 border rounded-md`}>Pending</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
         <span className='cursor-pointer md:w-9 md:h-9 w-8 h-8 border-slate-200 border flex justify-center items-center rounded-md'><AutorenewIcon></AutorenewIcon></span>
         <Link to={'/admin/leaves/add'}><button className='md:p-2 p-1.5 bg-themeblue md:text-base text-sm text-white rounded-md'>Add Leave</button></Link>
        </div>
      </div>
      <div className='bg-white h-full flex flex-col gap-3 rounded-md md:py-4 py-3 px-3'>
        <div className='w-full shadow-sm overflow-hidden grid grid-cols-10 border border-slate-100 rounded-md'>
          <div className='relative col-span-3'>
             <div className='absolute -left-5 -top-14 bg-sky-300/75 w-52 rounded-br-full h-52 flex justify-center items-center'>
                <img src={IMG2} alt='sick' className='w-16 h-16'></img>
             </div>
          </div>
          <div className='p-5 flex flex-col col-span-4 gap-3'>
            <div className='flex items-center gap-6'>
               <div className='flex gap-1 items-center'>
                <span><DateRangeIcon></DateRangeIcon></span>
                <span className='text-gray-700'>12-01-2025</span>
               </div>
               <div className='flex gap-1 items-center'>
                <span><DateRangeIcon></DateRangeIcon></span>
                <span className='text-gray-700'>15-01-2025</span>
              </div>
            </div>
            <div><span>Leave Type: </span> <span className='text-gray-700'>Sick</span></div>
          </div>
          <div className='py-5 col-span-3 gap-3 flex justify-center items-center'>
            <span className='bg-orange-400 hover:bg-orange-500 cursor-pointer transition-colors flex justify-center items-center w-20 shadow-sm py-1 rounded-md text-white'>View</span>
            <span className='bg-blue-400 hover:bg-blue-500 cursor-pointer flex transition-colors justify-center items-center w-20 shadow-sm py-1 rounded-md text-white'>Approve</span>
          </div>
        </div>
        <div className='w-full shadow-sm overflow-hidden grid grid-cols-10 border border-slate-100 rounded-md'>
          <div className='relative col-span-3'>
             <div className='absolute -left-5 -top-14 bg-sky-300/75 w-52 rounded-br-full h-52 flex justify-center items-center'>
                <img src={IMG1} alt='sick' className='w-16 h-16'></img>
             </div>
          </div>
          <div className='p-5 flex flex-col col-span-4 gap-3'>
            <div className='flex items-center gap-6'>
               <div className='flex gap-1 items-center'>
                <span><DateRangeIcon></DateRangeIcon></span>
                <span className='text-gray-700'>12-01-2025</span>
               </div>
               <div className='flex gap-1 items-center'>
                <span><DateRangeIcon></DateRangeIcon></span>
                <span className='text-gray-700'>15-01-2025</span>
              </div>
            </div>
            <div><span>Leave Type: </span> <span className='text-gray-700'>Previlage</span></div>
          </div>
          <div className='py-5 col-span-3 gap-3 flex justify-center items-center'>
            <span className='bg-orange-400 hover:bg-orange-500 cursor-pointer transition-colors flex justify-center items-center w-20 shadow-sm py-1 rounded-md text-white'>View</span>
            <span className='bg-blue-400 hover:bg-blue-500 cursor-pointer flex transition-colors justify-center items-center w-20 shadow-sm py-1 rounded-md text-white'>Approve</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leave