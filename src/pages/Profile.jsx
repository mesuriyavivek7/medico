import React from 'react'

//Importing images
import IMG from '../assets/asset4.jpg'

//Importing icons
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export default function Profile() {
  const formData = {

  }
  return (
    <div className='flex flex-col gap-3 md:gap-4'>
        <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between'>
            <h1 className='text-gray-600 text-base md:text-lg font-medium'>Profile</h1>
            <span className='cursor-pointer md:w-9 md:h-9 w-8 h-8 bg-gray-200 flex justify-center items-center rounded-md'><AutorenewIcon></AutorenewIcon></span>
        </div>
        <div className='flex gap-4 items-start'>
            <div className='w-[28%] flex flex-col gap-2'>
               <div className='rounded-md custom-shadow bg-white'>
                 <div className='px-4 py-4 border-b border-gray-200'>
                   <h1 className='font-semibold'>Personal Information</h1>
                 </div>
                 <div className='px-4 py-3 flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                        <img src={IMG} alt='profile' className='w-12 h-12 rounded-full'></img>
                        <div className='flex flex-col items-start gap-0.5'>
                            <h1 className='font-semibold'>Edit Your Photo</h1>
                            <button className='text-themeblue'>Update</button>
                        </div>
                    </div>
                    <div className='p-4 border border-dashed border-gray-400 rounded-md gap-2 flex flex-col items-center'>
                         <span className='text-gray-600'><DriveFolderUploadIcon></DriveFolderUploadIcon></span>
                         <div className='flex flex-col items-center'>
                           <span className='text-sm font-semibold'><button className='text-themeblue'>Click to Upload</button> or drag and drop</span>
                           <p className='text-sm'>JPG or PNG</p>
                         </div>
                    </div>
                    
                 </div>
               </div>
            </div>
            <div className='w-[68%] flex flex-col gap-2'>
               <div className='rounded-md custom-shadow bg-white'>
                  <div className='px-4 py-4 flex justify-between border-b border-gray-200'>
                     <h1 className='font-semibold'>Personal Information</h1>
                     <button className='bg-themeblue hover:bg-blue-800 transition-colors text-white px-1.5 py-.5 rounded-md flex items-center gap-1.5'>
                         <span><BorderColorOutlinedIcon style={{fontSize:'.8rem'}}></BorderColorOutlinedIcon></span>
                         <span className='text-xs font-semibold'>Edit</span>
                     </button>
                  </div>
                  <div className='px-4 py-3 grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='firstname' className='font-medium text-gray-700'>First Name</label>
                      <input readOnly name='firstname' value={'Jigar'}  type='text' id='name' className='p-2 outline-none border rounded-md' ></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='lastname' className='font-medium text-gray-700'>Last Name</label>
                      <input readOnly name='lastname' value={'Patel'}  type='text' id='name' className='p-2 outline-none border rounded-md'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='email' className='font-medium text-gray-700'>Email</label>
                      <input readOnly name='email' value={'jigarpatel@gmail.com'}  type='text' id='name' className='p-2 outline-none border rounded-md'></input>
                    </div>
                  </div>
               </div>
            </div>
        </div>
    </div>
  )
}
