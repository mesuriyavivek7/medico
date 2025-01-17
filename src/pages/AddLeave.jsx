import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function AddLeave() {

  const [formData,setFormData] = useState({
    leaveType:"previlage",
    startDate:"",
    endDate:"",
    leaveStatus:"",
    requestDate:new Date(),
    comments:""
  })

  const [errors,setErrors] = useState({})

  const handleSubmit = ()=>{
   if(handleValidate()){
    try{

    }catch(err){

    }
   }
  }

  const handleValidate = ()=>{
     let newErrors = {}
     if(!formData.startDate) newErrors.startDate="Leave start date is required."
     if(!formData.endDate) newErrors.endDate="Leave end date is required."
     if(!formData.comments) newErrors.comments="Comments is required."

     setErrors(newErrors)

     return Object.keys(newErrors).length===0
  }


  return (
   <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 md:px-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
           <Link to={'/admin/leaves'}><span className='text-gray-600 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span></Link>
           <h1 className='text-gray-800 text-base md:text-lg font-medium'>Apply For Leave</h1>
        </div>
      </div>
      <div className='bg-white grid grid-cols-2 gap-x-6 gap-y-6 custom-shadow rounded-md md:py-4 py-3 px-3 md:px-4'>
         <div className='col-span-2 pr-6'>
           <div className='w-1/2 flex flex-col gap-2'>
            <label className='font-medium text-gray-600'>Leave Type</label>
            <select className='border outline-none p-2 rounded-md'>
              <option value={'previlage'}>Previlage</option>
              <option value={'Sick'}>Sick</option>
            </select>
          </div>
         </div>
         <div className='flex flex-col gap-2'>
           <label className='font-medium text-gray-600'>From</label>
           <div className='flex flex-col gap-1'>
            <input type='date' className='p-2 rounded-md border outline-none'></input>
            {errors.startDate && <span className='text-sm text-red-500'>{errors.startDate}</span>}
           </div> 
         </div>
         <div className='flex flex-col gap-2'>
           <label className='font-medium text-gray-600'>To</label>
           <div className='flex flex-col gap-1'>
            <input type='date' className='p-2 rounded-md border outline-none'></input>
            {errors.endDate && <span className='text-red-500 text-sm'>{errors.endDate}</span>}
           </div> 
         </div>
         <div className='col-span-2 flex flex-col gap-2'>
           <label className='font-medium text-gray-600'>Comments</label>
           <div className='flex flex-col gap-1'>
            <textarea rows={8} placeholder='Type here leave reason...' className='resize-none p-2 outline-none rounded-md border'></textarea>
            {errors.comments && <span className='text-red-500 text-sm'>{errors.comments}</span>}
           </div>
         </div>
         <div className='col-span-2 flex place-content-end'>
           <div className='flex items-center gap-3'>
             <button onClick={handleSubmit} className='p-2 w-28 rounded-md bg-themeblue text-white hover:bg-blue-800'>Submit</button>
             <button className='p-2 rounded-md border w-28'>Cancel</button> 
           </div>
         </div>
      </div>
   </div>
  )
}

export default AddLeave