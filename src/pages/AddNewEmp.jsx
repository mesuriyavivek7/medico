import React, { useState } from 'react'
import { toast } from 'react-toastify'

//Importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { Link } from 'react-router-dom';

//Importing images
import IMG1 from '../assets/asset5.png'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export default function AddNewEmp() {

  const [previewImage,setPreviewImage] = useState(null)
  const [imageFile,setImageFile] = useState(null)


  const fileTypes = ['image/png', 'image/jpeg', 'image/jpg']

  const handleImageChange = (e) =>{
    const file = e.target.files[0]
    if(file && fileTypes.includes(file.type) && file.size<=5*1014*1014){
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () =>{
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file);
    }else{
      toast.error("Please select valid file type under 10mb.")
    }
  }

  const [formData , setFormData ] = useState({
    empcode:'',
    roleid:'',
    empname:'',
    email:'',
    mobileno:'',
    address:'',
    area:'',
    city:'',
    state:'',
    country:'',
    joiningdate:'',
    qualification:''
  })

  const [errors,setErrors] = useState({})

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData((prevData)=>({...prevData,[name]:value}))
  }

  const validateData = () =>{
   let newErrors = {}
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   if(!formData.empcode) newErrors.empcode = "Please enter empcode."
   if(!formData.roleid) newErrors.roleid = "Please enter roleid."
   if(!formData.empname) newErrors.empname = "Please enter empname."
   if(!formData.email) newErrors.email = "Please enter email address."
   else if(!emailRegex.test(formData.email)) newErrors.email = "Invalid email address."
   if(!formData.mobileno) newErrors.mobileno = "Please enter mobileno."
   else if(formData.mobileno.length!==10) newErrors.mobileno = "Invalid mobile no."
   if(!formData.address) newErrors.address = "Please enter address."
   if(!formData.area) newErrors.area = "Please enter area."
   if(!formData.city) newErrors.city = "Please enter city name."
   if(!formData.state) newErrors.state = "Please enter state name."
   if(!formData.country) newErrors.country = "Please enter country name."
   if(!formData.joiningdate) newErrors.joiningdate = "Please enter joining date."
   if(!formData.qualification) newErrors.qualification = "Please enter qualification."
   if(!imageFile) newErrors.image = "Please upload profile picture."
   
   setErrors(newErrors)

   return Object.keys(newErrors).length===0
  }

  const clearImage = ()=>{
     setImageFile(null)
     setPreviewImage(null)
  }

  const handleSubmit = async () =>{
   if(validateData()){
    try{
      setImageFile(null)
      setPreviewImage(null)
      setFormData({
        empcode:'',
        roleid:'',
        empname:'',
        email:'',
        mobileno:'',
        address:'',
        area:'',
        city:'',
        state:'',
        country:'',
        joiningdate:'',
        qualification:''
      })
      toast.success("New Emplyee added.")
    }catch(err){
       toast.error("Something went wrong while saving data.")
    }
   }
  }

  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
       <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 md:px-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
           <Link to={'/admin/employee'}><span className='text-gray-600 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span></Link>
           <h1 className='text-gray-800 text-base md:text-lg font-medium'>Add New Employee</h1>
        </div>
      </div>
    <div className='md:py-6 md:px-4 bg-white rounded-md custom-shadow py-3 px-3'>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8'>
        <div className='flex flex-col gap-2 items-center'>
           <div className='group overflow-hidden relative rounded-full w-36 h-36 flex justify-center items-center border'>
              <img src={previewImage?previewImage:IMG1} className="w-full h-full" alt='person'></img>
              <div className='group-hover:top-0 transition-all duration-300 absolute bg-gray-200 gap-2 flex justify-center items-center bg-opacity-80 w-full h-full top-full rounded-full'>
                <label htmlFor='profile' className='text-gray-600 cursor-pointer'><PhotoCameraOutlinedIcon style={{fontSize:'2rem'}}></PhotoCameraOutlinedIcon></label>
                {previewImage && <span onClick={clearImage} className='text-gray-600 cursor-pointer'><ClearOutlinedIcon style={{fontSize:'2rem'}}></ClearOutlinedIcon></span>}
                <input onChange={handleImageChange} id='profile' type='file' className='hidden'></input>
              </div>
           </div>
           {errors.image && <span className='text-sm text-red-400'>{errors.image}</span>}
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
             <label htmlFor='empcode' className='font-medium text-gray-700'>Emp. Code <span className='text-red-500'>*</span></label>
             <input name='empcode' onChange={handleChange} type='text' value={formData.empcode} id='empcode' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 636352'></input>
             {errors.empcode && <span className='text-sm text-red-400'>{errors.empcode}</span>}
          </div>
          <div className='flex flex-col gap-2'>
             <label htmlFor='roleid' className='font-medium text-gray-700'>Role Id <span className='text-red-500'>*</span></label>
             <input name='roleid' onChange={handleChange} type='text' value={formData.roleid} id='roleid' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 636353'></input>
             {errors.roleid && <span className='text-sm text-red-400'>{errors.roleid}</span>}
          </div>
        </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='empname' className='font-medium text-gray-700'>Emp. Name <span className='text-red-500'>*</span></label>
             <input name='empname' onChange={handleChange} type='text' value={formData.empname} id='empname' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Jode Doe'></input>
             {errors.empname && <span className='text-sm text-red-400'>{errors.empname}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='email' className='font-medium text-gray-700'>Email <span className='text-red-500'>*</span></label>
             <input name='email' onChange={handleChange} type='text' value={formData.email} id='empname' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. test@example.com'></input>
             {errors.email && <span className='text-sm text-red-400'>{errors.email}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='mobileno' className='font-medium text-gray-700'>Mobile No <span className='text-red-500'>*</span></label>
             <input name='mobileno' onChange={handleChange} type='number' value={formData.mobileno} id='mobileno' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 72626...'></input>
             {errors.mobileno && <span className='text-sm text-red-400'>{errors.mobileno}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='address' className='font-medium text-gray-700'>Address <span className='text-red-500'>*</span></label>
             <input name='address' onChange={handleChange} type='text' value={formData.address} id='address' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. 402 - Lake Street'></input>
             {errors.address && <span className='text-sm text-red-400'>{errors.address}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='area' className='font-medium text-gray-700'>Area <span className='text-red-500'>*</span></label>
             <input name='area' onChange={handleChange} type='text' value={formData.area} id='area' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Vastrapur'></input>
             {errors.area && <span className='text-sm text-red-400'>{errors.area}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='city' className='font-medium text-gray-700'>City <span className='text-red-500'>*</span></label>
             <input name='city' onChange={handleChange} type='text' value={formData.city} id='city' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Ahmedabad'></input>
             {errors.city && <span className='text-sm text-red-400'>{errors.city}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='state' className='font-medium text-gray-700'>State <span className='text-red-500'>*</span></label>
             <input name='state' onChange={handleChange} type='text' value={formData.state} id='state' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. Gujarat'></input>
             {errors.state && <span className='text-sm text-red-400'>{errors.state}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='country' className='font-medium text-gray-700'>Country <span className='text-red-500'>*</span></label>
             <input name='country' onChange={handleChange} type='text' value={formData.country} id='country' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. India'></input>
             {errors.country && <span className='text-sm text-red-400'>{errors.country}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='joiningdate' className='font-medium text-gray-700'>Joining Date <span className='text-red-500'>*</span></label>
             <input name='joiningdate' onChange={handleChange} type='date' value={formData.joiningdate} id='country' className='p-2 outline-none border-b-2 border-gray-200'></input>
             {errors.joiningdate && <span className='text-sm text-red-400'>{errors.joiningdate}</span>}
         </div>
         <div className='flex flex-col gap-2'>
             <label htmlFor='qualification' className='font-medium text-gray-700'>Qualification <span className='text-red-500'>*</span></label>
             <input name='qualification' onChange={handleChange} type='text' value={formData.qualification} id='country' className='p-2 outline-none border-b-2 border-gray-200' placeholder='Ex. B.E'></input>
             {errors.qualification && <span className='text-sm text-red-400'>{errors.qualification}</span>}
         </div>
      </div>
     </div>
      <div className='flex place-content-end bg-white custom-shadow rounded-md py-3 px-3 md:py-4 md:px-4'>
            <button onClick={handleSubmit} className='bg-themeblue p-2 text-white rounded-md hover:bg-blue-800'>Add Employee</button>
       </div>
    </div>
  )
}
