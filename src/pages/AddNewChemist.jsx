import React, { useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function AddNewChemist() {

  const [errors,setErrors] = useState({})

  const [formData,setFormData] = useState({
    chemistname:'',
    email:'',
    mobileno:'',
    fax:'',
    address1:'',
    address2:'',
    pincode:'',
    routename:'',
    chemistarea:'',
    phone:'',
    contactperson:'',
    visitfreq:'',
    dob:'',
    chemisttype:''
  })

  const validateData = () =>{
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     let newErrors = {}

     if(!formData.chemistname) newErrors.chemistname = 'Pleaes enter chemist name.'
     if(!formData.email) newErrors.email = "Please enter email address."
     else if(!emailRegex.test(formData.email)) newErrors.email = "Invalid email address."
     if(!formData.mobileno) newErrors.mobileno = 'Please enter mobile no.'
     else if(formData.mobileno.length!==10) newErrors.mobileno = "Invlalid mobile no."
     if(!formData.address1) newErrors.address1 = 'Address Line 1 is required.'
     if(!formData.pincode) newErrors.pincode = 'Please enter pincode.'
     if(!formData.routename) newErrors.routename = 'Please enter route name.'
     if(!formData.chemistarea) newErrors.chemistarea = 'Please enter chemist area.'
     if(!formData.contactperson) newErrors.contactperson = 'Please enter contact person name.'
     if(!formData.visitfreq) newErrors.visitfreq = 'Pleaes enter visit frequency.'
     if(!formData.dob) newErrors.dob = 'Please enter dob.'
     if(!formData.chemisttype) newErrors.chemisttype = "Please enter chemist type."

     setErrors(newErrors)

     return Object.keys(newErrors).length===0
  }

  const handleSubmit = async () =>{
    if(validateData()){
      try{
        setFormData({
          chemistname:'',
          email:'',
          mobileno:'',
          fax:'',
          address1:'',
          address2:'',
          pincode:'',
          routename:'',
          chemistarea:'',
          phone:'',
          contactperson:'',
          visitfreq:'',
          dob:'',
          chemisttype:''
        })
        toast.success("Chemist Details Added.")
      }catch(err){
        console.log(err)
      }
    }
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData((prevData)=>({...prevData,[name]:value}))
  }
  
  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 md:px-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
           <Link to={'/admin/chemist'}><span className='text-gray-600 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span></Link>
           <h1 className='text-gray-800 text-base md:text-lg font-medium'>Add New Chemist</h1>
        </div>
      </div>
      <div className='md:py-6 md:px-4 bg-white rounded-md custom-shadow grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-3 px-3'>
         <div className='flex flex-col gap-2'>
             <label htmlFor='chemistname' className='font-medium text-gray-700'>Chemist Name <span className='text-red-500'>*</span></label>
             <input value={formData.chemistname} onChange={handleChange} name='chemistname' type='text' id='chemistname' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. jode toe'></input>
             {errors.chemistname && <span className='text-sm text-red-500'>{errors.chemistname}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='email' className='font-medium text-gray-700'>Email <span className='text-red-500'>*</span></label>
             <input value={formData.email} onChange={handleChange} name='email' type='email' id='email' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. test@example.com'></input>
             {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='mobileno' className='font-medium text-gray-700'>Mobile No <span className='text-red-500'>*</span></label>
             <input value={formData.mobileno} onChange={handleChange} name='mobileno' type='text' id='mobileno' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 73653...'></input>
             {errors.mobileno && <span className='text-sm text-red-500'>{errors.mobileno}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='fax' className='font-medium text-gray-700'>Fax </label>
             <input value={formData.fax} onChange={handleChange} name='fax' type='text' id='fax' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. (010) 8272'></input>
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='address1' className='font-medium text-gray-700'>Address Line 1 <span className='text-red-500'>*</span></label>
             <input value={formData.address1} onChange={handleChange} name='address1' type='text' id='address1' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 402 - Tax'></input>
             {errors.address1 && <span className='text-sm text-red-500'>{errors.address1}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='address2' className='font-medium text-gray-700'>Address Line 2 </label>
             <input value={formData.address2} onChange={handleChange} name='address2' type='text' id='address2' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Near Simahall'></input>
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='pincode' className='font-medium text-gray-700'>Pincode <span className='text-red-500'>*</span></label>
             <input value={formData.pincode} onChange={handleChange} name='pincode' type='text' id='pincode' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 762522'></input>
             {errors.pincode && <span className='text-sm text-red-500'>{errors.pincode}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='routename' className='font-medium text-gray-700'>Route name <span className='text-red-500'>*</span></label>
             <input value={formData.routename} onChange={handleChange} name='routename' type='text' id='routename' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Jabalpur'></input>
             {errors.routename && <span className='text-sm text-red-500'>{errors.routename}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='chemistarea' className='font-medium text-gray-700'>Chemist Area <span className='text-red-500'>*</span></label>
             <input value={formData.chemistarea} onChange={handleChange} name='chemistarea' type='text' id='chemistarea' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Jabalpur'></input>
             {errors.chemistarea && <span className='text-sm text-red-500'>{errors.chemistarea}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='phone' className='font-medium text-gray-700'>Phone </label>
             <input value={formData.phone} onChange={handleChange} name='phone' type='text' id='phone' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 87252...'></input>
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='contactperson' className='font-medium text-gray-700'>Contact Person <span className='text-red-500'>*</span></label>
             <input value={formData.contactperson} onChange={handleChange} name='contactperson' type='text' id='contactperson' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Tom Jode'></input>
             {errors.contactperson && <span className='text-sm text-red-500'>{errors.contactperson}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='visitfreq' className='font-medium text-gray-700'>Visit Frequency <span className='text-red-500'>*</span></label>
             <input value={formData.visitfreq} onChange={handleChange} name='visitfreq' type='number' id='visitfreq' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 3'></input>
             {errors.visitfreq && <span className='text-sm text-red-500'>{errors.visitfreq}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='dob' className='font-medium text-gray-700'>Date of Birth <span className='text-red-500'>*</span></label>
             <input value={formData.dob} onChange={handleChange} name='dob' type='date' id='dob' className='p-2 outline-none border-b-2 border-gray-200'></input>
             {errors.dob && <span className='text-sm text-red-500'>{errors.dob}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='chemisttype' className='font-medium text-gray-700'>Chemist Type <span className='text-red-500'>*</span></label>
             <input value={formData.chemisttype} onChange={handleChange} name='chemisttype' type='text' id='chemisttype' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Bio'></input>
             {errors.chemisttype && <span className='text-sm text-red-500'>{errors.chemisttype}</span>}
         </div>
      </div>
      <div className='flex place-content-end bg-white custom-shadow rounded-md py-3 px-3 md:py-4 md:px-4'>
            <button onClick={handleSubmit} className='bg-themeblue p-2 text-white rounded-md hover:bg-blue-800'>Add Chemist</button>
      </div>
    </div>
  )
}
