import React, { useState } from 'react'
import { toast } from 'react-toastify'

//Importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

export default function AddNewDoc() {

  const [errors,setErrors] = useState({})
   
  const [formData,setFormData] = useState({
     drname:'',
     class:'',
     speciality:'',
     qualification:'',
     mobileno:'',
     dob:'',
     gender:'',
     routename:'',
     address:'',
     pincode:'',
  })

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData((prevData)=>({...prevData,[name]:value}))
  }

  const validateData = () =>{
    let newErrors = {}
    
    if(!formData.drname) newErrors.drname = "Dr.name is required."
    if(!formData.class) newErrors.class = "Class is required."
    if(!formData.speciality) newErrors.speciality = 'Speciality is required.'
    if(!formData.qualification) newErrors.qualification = 'Qualification is required.'
    if(!formData.mobileno) newErrors.mobileno = "Mobile number is required."
    else if(formData.mobileno.length!==10) newErrors.mobileno = "Invalid mobile number."
    if(!formData.gender) newErrors.gender = "Gender is required."
    if(!formData.dob) newErrors.dob = "Date of Birth is required."
    if(!formData.routename) newErrors.routename = "Routename is required."
    if(!formData.address) newErrors.address = "Addres is required."
    if(!formData.pincode) newErrors.pincode = "Pincode is required."

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
    
  }

  const handleSubmit = async () =>{
    if(validateData()){
     try{
        setFormData(
          {
            drname:'',
            class:'',
            speciality:'',
            qualification:'',
            mobileno:'',
            dob:'',
            gender:'',
            routename:'',
            address:'',
            pincode:''
          }
        )
        toast.success("Successfully Added.")
     }catch(err){
        console.log(err)
        toast.error("Something went wrong.")
     }
   }
  }

  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 md:px-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
           <Link to={'/admin/doctors'}><span className='text-gray-600 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span></Link>
           <h1 className='text-gray-800 text-base md:text-lg font-medium'>Add New Doctor</h1>
        </div>
      </div>
      <div className='md:py-6 md:px-4 bg-white rounded-md custom-shadow grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 py-3 px-3'>
         <div className='flex flex-col gap-2'>
             <label htmlFor='name' className='font-medium text-gray-700'>Dr. Name <span className='text-red-500'>*</span></label>
             <input name='drname' onChange={handleChange} type='text' value={formData.drname} id='name' className='bg-lightgray p-2 rounded-md outline-none border' placeholder='Ex. jode toe'></input>
             {errors.drname && <span className='text-sm text-red-400'>{errors.drname}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='class' className='font-medium text-gray-700'>Class <span className='text-red-500'>*</span></label>
             <input name='class' onChange={handleChange} type='text' value={formData.class} id='class' className='bg-lightgray p-2 rounded-md outline-none border' placeholder='Ex. +A'></input>
             {errors.class && <span className='text-sm text-red-400'>{errors.class}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='speciality' className='font-medium text-gray-700'>Speciality <span className='text-red-500'>*</span></label>
             <input name='speciality' onChange={handleChange} type='text' value={formData.speciality} id='speciality' className='bg-lightgray p-2 rounded-md outline-none border' placeholder='Ex. Ortho'></input>
             {errors.speciality && <span className='text-sm text-red-400'>{errors.speciality}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='qualification' className='font-medium text-gray-700'>Qualification <span className='text-red-500'>*</span></label>
             <input name='qualification' onChange={handleChange} type='text' value={formData.qualification} id='qualification' className='bg-lightgray p-2 rounded-md outline-none border' placeholder='Ex. Ms.Ortho'></input>
             {errors.qualification && <span className='text-sm text-red-400'>{errors.qualification}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='mobileno' className='font-medium text-gray-700'>Mobile No <span className='text-red-500'>*</span></label>
             <input name='mobileno' onChange={handleChange} type='number' value={formData.mobileno} id='mobileno' className='bg-lightgray p-2 rounded-md outline-none border' placeholder='Ex. 9878767676'></input>
             {errors.mobileno && <span className='text-sm text-red-400'>{errors.mobileno}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='dob' className='font-medium text-gray-700'>DOB <span className='text-red-500'>*</span></label>
             <input name='dob' onChange={handleChange} type='date' value={formData.dob} id='dob' className='bg-lightgray p-2 rounded-md outline-none border'></input>
             {errors.dob && <span className='text-sm text-red-400'>{errors.dob}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='gender' className='font-medium text-gray-700'>Gender <span className='text-red-500'>*</span></label>
             <select name='gender' onChange={handleChange} id='gender' className='bg-lightgray text-gray-600 p-2 rounded-md outline-none border' value={formData.gender}>
               <option value={''}>---- Select Gender ----</option>
               <option value={'male'}>Male</option>
               <option value={'female'}>Female</option>
             </select>
             {errors.gender && <span className='text-sm text-red-400'>{errors.gender}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='routename' className='font-medium text-gray-700'>Route Name <span className='text-red-500'>*</span></label>
             <input name='routename' onChange={handleChange} type='text' placeholder='Ex. Jabalpur' value={formData.routename} id='routename' className='bg-lightgray p-2 rounded-md outline-none border'></input>
             {errors.routename && <span className='text-sm text-red-400'>{errors.routename}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='address' className='font-medium text-gray-700'>Address <span className='text-red-500'>*</span></label>
             <input name='address' onChange={handleChange} type='text' placeholder='Ex. Home Science Road..' value={formData.address} id='address' className='bg-lightgray p-2 rounded-md outline-none border'></input>
             {errors.address && <span className='text-sm text-red-400'>{errors.address}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='pincode' className='font-medium text-gray-700'>Pincode <span className='text-red-500'>*</span></label>
             <input name='pincode' onChange={handleChange} type='text' placeholder='Ex. 534232' value={formData.pincode} id='pincode' className='bg-lightgray p-2 rounded-md outline-none border'></input>
             {errors.pincode && <span className='text-sm text-red-400'>{errors.pincode}</span>}
         </div>
      </div>
       <div className='flex place-content-end bg-white custom-shadow rounded-md py-3 px-3 md:py-4 md:px-4'>
            <button onClick={handleSubmit} className='bg-themeblue p-2 text-white rounded-md hover:bg-blue-800'>Add Doctor</button>
       </div>
    </div>
  )
}
