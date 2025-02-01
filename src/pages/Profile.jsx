import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//Importing images
import IMG from '../assets/asset4.jpg'

//Importing Loader
import Loader from '../assets/loader.svg'

import {toast} from 'react-toastify'

//Importing icons
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CloseIcon from '@mui/icons-material/Close';
import api from '../api'


export default function Profile() {
  const { user } = useSelector((state) => state.auth);


  const [currentTab,setCurrentTab] = useState('profile')

  const [formData,setFormData] = useState({})
  const [updateData,setUpdateData] = useState({})
  const [loader,setLoader] = useState(false)

  const getFullDate = (dString)=>{
    const date = new Date(dString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  //Retrive user data
  const fetchUserData = async ()=>{
     setLoader(true)
     try{
       const response = await api.get(`/User`)
       setFormData(response.data.data)
       setUpdateData(response.data.data)
     }catch(err){
       console.log(err)
       toast.error("Something went wrong while fetching data.")
     }finally{
      setLoader(false)
     }
  }

  useEffect(()=>{
      fetchUserData()
  },[])

  //For updating Profile Information data
  const [errors,setErrors] = useState({})
  const handleValidateUpdateData = ()=>{
     let newErrors = {}
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if(!updateData?.username) newErrors.username="Username is required."
     if(!updateData?.firstName) newErrors.firstName="Firstname is required."
     if(!updateData?.lastName) newErrors.lastName="Lastname is required."
     if(!updateData?.email) newErrors.email="Email address is required."
     else if(!emailRegex.test(updateData?.email)) newErrors.email="Invalid email address."
     if(!updateData?.phoneNumber) newErrors.phoneNumber="Phonenumber is required."
     else if(updateData?.phoneNumber.length!==10) newErrors.phoneNumber="Invalid phonenumber."
     if(!updateData?.gender) newErrors.gender="Gender is required."
     if(!updateData?.dob) newErrors.dob="Date of birth is required."
     if(!updateData?.panCard) newErrors.panCard="Pancard is required."

     setErrors(newErrors)
     return Object.keys(newErrors).length===0
  }

  const handleUpdateProfile = async ()=>{
    if(handleValidateUpdateData()){
     const {password,createdBy,isAdmin,userID,roleID,id,...otherDetails} = updateData
     try{
       await api.put(`/User/${user.id}`,otherDetails)
      await fetchUserData()
      toast.success("User info updated successfully.")
     }catch(err){
       console.log(err)
       toast.error("Something went wrong while updating user info.")
     }
    }
  }

  const [firstPopUp,setFirstPopUp] = useState(false)

  const handleChangeUpdateData = (e)=>{
     const {name,value} = e.target
     setUpdateData((prevData)=>({...prevData,[name]:value}))
  }

  const handleCloseFirstPopUp = () =>{
    setUpdateData(formData)
    setErrors({})
    setFirstPopUp(false)
  }

  const [bankEditPopUp,setBankEditPopUp] = useState(false)

  //Bank details
  const [bankDetails, setBankDetails] = useState({
    acholdername:'',
    bankName:'',
    bankAcctNo:'',
    ifscCode:'',
  })

  const handleCloseBankPopUp = () =>{
    setBankEditPopUp(false)
  }


  const renderContent = () =>{
    switch(currentTab) {
      case 'profile':
        return (
        <div className='flex md:flex-row flex-col gap-4 items-start'>
            <div className='w-full md:w-[28%] flex flex-col gap-2'>
               <div className='rounded-md custom-shadow bg-white'>
                 <div className='px-4 py-4 border-b border-gray-200'>
                   <h1 className='font-semibold'>Profile Picture</h1>
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
            <div className='w-full md:w-[72%] flex flex-col gap-4'>
               <div className='rounded-md custom-shadow bg-white'>
                  <div className='px-4 py-4 flex justify-between border-b border-gray-200'>
                     <h1 className='font-semibold'>Personal Information</h1>
                     <button onClick={()=>setFirstPopUp(!firstPopUp)} className='bg-themeblue hover:bg-blue-800 transition-colors text-white px-1.5 py-.5 rounded-md flex items-center gap-1.5'>
                         <span><BorderColorOutlinedIcon style={{fontSize:'.8rem'}}></BorderColorOutlinedIcon></span>
                         <span className='text-xs font-semibold'>Edit</span>
                     </button>
                  </div>
                  <div className='px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-6'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='firstname' className='font-semibold text-gray-700'>First Name</label>
                      <input readOnly  name='firstname' value={formData?.firstName}  type='text' id='firstname' className='p-2 outline-none border rounded-md' ></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='lastname' className='font-semibold text-gray-700'>Last Name</label>
                      <input readOnly name='lastname' value={formData?.lastName}  type='text' id='lastname' className='p-2 outline-none border rounded-md'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='username' className='font-semibold text-gray-700'>Username</label>
                      <input readOnly name='username' value={formData?.username}  type='text' id='username' className='p-2 outline-none border rounded-md'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='email' className='font-semibold text-gray-700'>Email</label>
                      <input readOnly name='email' value={formData?.email}  type='text' id='name' className='p-2 outline-none border rounded-md'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='mobileno' className='font-semibold text-gray-700'>Mobile No</label>
                      <input readOnly name='mobileno' value={formData?.phoneNumber}  type='text' id='mobileno' className='p-2 outline-none border rounded-md'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='gender' className='font-semibold text-gray-700'>Gender</label>
                      <input readOnly name='gender' value={formData?.gender==="M"?"Male":"Female"}  type='text' id='gender' className='p-2 outline-none border rounded-md'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='dob' className='font-semibold text-gray-700'>Date Of Birth</label>
                      <input readOnly name='dob' value={getFullDate(formData?.dob)}  type='text' id='dob' className='p-2 outline-none border rounded-md'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='pancard' className='font-semibold text-gray-700'>Pancard</label>
                      <input readOnly name='pancard' value={formData?.panCard}  type='text' id='pancard' className='p-2 outline-none border rounded-md'></input>
                    </div>
                  </div>
               </div>
            </div>
        </div>
      
        )
      
      case 'password':
        return (
          <div className='w-full rounded-md custom-shadow bg-white p-4 px-6 flex flex-col gap-6'>
             <h1 className='font-semibold text-lg'>Change Password</h1>
             <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                   <label>Current Password</label>
                   <input type='password' className='p-2 border outline-none rounded-md '></input>
                </div>
                <div className='flex flex-col gap-2'>
                   <label>New Password</label>
                   <input type='password' className='p-2 border outline-none rounded-md '></input>
                </div>
                <div className='flex flex-col gap-2'>
                   <label>Confirm Password</label>
                   <input type='password' className='p-2 border outline-none rounded-md '></input>
                </div>
                <div className='flex place-content-end'>
                   <button type='submit' className='p-2 bg-themeblue text-white font-medium rounded-md flex justify-center items-center w-36 hover:bg-blue-800 transition-colors duration-300'>Submit</button>
                </div>
             </form>
          </div>
        )
      
      case "bank": 
         return (
            <div className='w-full rounded-md custom-shadow bg-white flex flex-col gap-6'>
               <div className='p-4 px-6 border-b flex justify-between'>
                 <h1>Bank Details</h1>
                 <button onClick={()=>setBankEditPopUp(true)} className='bg-themeblue hover:bg-blue-800 transition-colors text-white px-1.5 py-.5 rounded-md flex items-center gap-1.5'>
                         <span><BorderColorOutlinedIcon style={{fontSize:'.8rem'}}></BorderColorOutlinedIcon></span>
                         <span className='text-xs font-semibold'>Edit</span>
                 </button>
               </div>
               <div className='grid grid-cols-2 gap-6 p-4 px-6'>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor='acholdername'>Account Holder Name</label>
                     <input id='acholdername' name='acholdername' value={bankDetails.acholdername} type='text' className='p-2 outline-none border rounded-md'></input>
                  </div>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor='bankName'>Bank Name</label>
                     <input type='text' id='bankName' name='bankName' value={bankDetails.bankName} className='p-2 outline-none border rounded-md'></input>
                  </div>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor='ifscCode'>IFSC Code</label>
                     <input type='text' id='ifscCode' name='ifscCode' value={bankDetails.ifscCode} className='p-2 outline-none border rounded-md'></input>
                  </div>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor='bankAcctNo'>Account No</label>
                     <input type='text' id='bankAcctNo' name='bankAcctNo' value={bankDetails.bankAcctNo} className='p-2 outline-none border rounded-md'></input>
                  </div>
               </div>
            </div>
         )

    }
  }


  return (
    <> 
    {
      loader && 
      <div className='fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center'>
       <div className='bg-white w-72 p-2 flex flex-col items-center rounded-md gap-2'>
         <img src={Loader} className='w-9 h-9' alt=''></img>
         <span>wait while fetching data...</span>
       </div>
      </div>
    }
    {
      firstPopUp &&
      <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
           <div className="bg-white w-4/5 md:w-1/3 shadow rounded-md">
             <div className='flex px-4 py-4 border-b justify-between items-center'>
               <h1 className='text-lg font-semibold'>Edit Personal Information</h1>
               <span onClick={handleCloseFirstPopUp} className='bg-gray-500 cursor-pointer w-5 transition-colors h-5 flex justify-center items-center hover:bg-red-500 text-white rounded-full'><CloseIcon style={{fontSize:'.9rem'}}></CloseIcon></span>
             </div>
             <div className='px-4 py-4'>
               <form className='flex flex-col gap-4'>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium' htmlFor='username'>Username <span className='text-sm text-red-500'>*</span></label>
                    <input name='username' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' value={updateData?.username} type='text' id='username' placeholder='Ex. Raj'></input>
                    {errors.username && <span className='text-sm text-red-500'>{errors.username}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium' htmlFor='firstName'>First Name <span className='text-sm text-red-500'>*</span></label>
                    <input name='firstName' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' value={updateData?.firstName} type='text' id='firstName' placeholder='Ex. Raj'></input>
                    {errors.firstName && <span className='text-sm text-red-500'>{errors.firstName}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium'  htmlFor='lastName'>Last Name <span className='text-sm text-red-500'>*</span></label>
                    <input name='lastName' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' value={updateData?.lastName} type='text' id='lastname' placeholder='Ex. Patel'></input>
                    {errors.lastName && <span className='text-sm text-red-500'>{errors.lastName}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium'  htmlFor='email'>Email <span className='text-sm text-red-500'>*</span></label>
                    <input name='email' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' type='text' value={updateData?.email} id='email' placeholder='Ex. test@example.com'></input>
                    {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium'  htmlFor='phoneNumber'>Mobile No <span className='text-sm text-red-500'>*</span></label>
                    <input name='phoneNumber' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' type='text' value={updateData?.phoneNumber} id='phoneNumber' placeholder='Ex. 8722...'></input>
                    {errors.phoneNumber && <span className='text-sm text-red-500'>{errors.phoneNumber}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label htmlFor='gender'>Gender <span className='text-sm text-red-500'>*</span></label>
                    <select name='gender' onChange={handleChangeUpdateData} value={updateData?.gender} id='gender' className='outline-none border py-1 px-1.5'>
                      <option value={''}>--- Select Gender ---</option>
                      <option value={'M'}>Male</option>
                      <option value={'F'}>Female</option>
                    </select>
                    {errors.gender && <span className='text-sm text-red-500'>{errors.gender}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium'  htmlFor='dob'>Date of birth <span className='text-sm text-red-500'>*</span></label>
                    <input name='dob' onChange={handleChangeUpdateData} value={updateData?.dob.split('T')[0]} className='outline-none border py-1 px-1.5' type='date' id='dob'></input>
                    {errors.dob && <span className='text-sm text-red-500'>{errors.dob}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium' htmlFor='panCard'>Pancard <span className='text-sm text-red-500'>*</span></label>
                    <input name='panCard' onChange={handleChangeUpdateData} value={updateData?.panCard} className='outline-none border py-1 px-1.5' type='text' id='panCard' placeholder='Ex. AFZPK7190K'></input>
                    {errors.panCard && <span className='text-sm text-red-500'>{errors.panCard}</span>}
                 </div>
                 <button onClick={handleUpdateProfile} type='button' className='text-white mt-1 p-2 bg-themeblue'>
                   Submit
                 </button>

               </form>
             </div>
           </div>
     </div>
    }
    {
      bankEditPopUp && 
      <div className='fixed z-40 inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-white w-4/5 md:w-1/3 shadow rounded-md'>
             <div className='flex px-4 py-4 border-b justify-between items-center'>
               <h1 className='text-lg font-semibold'>Edit Bank Details</h1>
               <span onClick={handleCloseBankPopUp} className='bg-gray-500 cursor-pointer w-5 transition-colors h-5 flex justify-center items-center hover:bg-red-500 text-white rounded-full'><CloseIcon style={{fontSize:'.9rem'}}></CloseIcon></span>
             </div>
             <div className='px-4 py-4'>
               <form className='flex flex-col gap-4'>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium' htmlFor='username'>Account Holder Name <span className='text-sm text-red-500'>*</span></label>
                    <input name='username' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' value={bankDetails.acholdername} type='text' id='username' placeholder='Ex. Enter placeholder name'></input>
                    {errors.username && <span className='text-sm text-red-500'>{errors.username}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium' htmlFor='username'>Bank Name <span className='text-sm text-red-500'>*</span></label>
                    <input name='username' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' value={bankDetails.bankName} type='text' id='username' placeholder='Ex. Enter bank name'></input>
                    {errors.username && <span className='text-sm text-red-500'>{errors.username}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium' htmlFor='username'>IFSC Code <span className='text-sm text-red-500'>*</span></label>
                    <input name='username' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' value={bankDetails.ifscCode} type='text' id='username' placeholder='Ex. Enter Ifsc code'></input>
                    {errors.username && <span className='text-sm text-red-500'>{errors.username}</span>}
                 </div>
                 <div className='flex flex-col gap-1'>
                    <label className='font-medium' htmlFor='username'>Account No <span className='text-sm text-red-500'>*</span></label>
                    <input name='username' onChange={handleChangeUpdateData} className='outline-none border py-1 px-1.5' value={bankDetails.bankAcctNo} type='text' id='username' placeholder='Ex. Enter account no'></input>
                    {errors.username && <span className='text-sm text-red-500'>{errors.username}</span>}
                 </div>
                 <button type='button' className='text-white mt-1 p-2 bg-themeblue'>
                   Submit
                 </button>
               </form>
             </div>
        </div>
      </div>
    }
    <div className='flex flex-col gap-3 md:gap-4'>
        <div className='bg-white custom-shadow rounded-md  px-6 flex items-center justify-between'>
            <div className='flex items-center gap-6'>
               <h1 onClick={()=>setCurrentTab('profile')} className={`text-base  py-3 ${currentTab==="profile"?"border-b-2 text-blue-500 border-blue-500":"text-gray-600"} cursor-pointer font-medium`}>Profile</h1>
               <h1 onClick={()=>setCurrentTab('timeline')} className={`${currentTab==="timeline"?"border-b-2 text-blue-500 border-blue-500":"text-gray-600"} cursor-pointer text-base  py-3 font-medium`}>Timeline</h1>
               <h1 onClick={()=>setCurrentTab('leave')} className={`${currentTab==="leave"?"border-b-2 text-blue-500 border-blue-500":"text-gray-600"} cursor-pointer text-base  py-3 font-medium`}>Leaves</h1>
               <h1 onClick={()=>setCurrentTab('bank')} className={`${currentTab==="bank"?"border-b-2 text-blue-500 border-blue-500":"text-gray-600"} cursor-pointer text-base  py-3 font-medium`}>Bank Details</h1>
               <h1 onClick={()=>setCurrentTab('password')} className={`text-base py-3 ${currentTab==="password"?"border-b-2 text-blue-500 border-blue-500":"text-gray-600"} cursor-pointer font-medium`}>Change Password</h1>
            </div>
        </div>
        {renderContent()}
    </div>
     
    
    </>
  )
}
