import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import { useSelector } from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//importing images
import Loader from '../assets/loader.svg'

//Importing icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { toast } from 'react-toastify'

function MTP() {
   const { user } = useSelector((state) => state.auth);
   const [userDetails,setUserDetails] = useState(null)
   const [mtpPlan,setMtpPlan] = useState([])
   const [filterMtpPlan,setFilterMtpPlan] = useState([])
   
   const [loading,setLoading] = useState(false)
   const [openDate,setOpenDate] = useState(false)

   const [mtpType,setMtpType] = useState(0)

   const [date, setDate] = useState(new Date())

   const getDate = (orgdate) => {
    if (!orgdate) return "";
    const dateObj = new Date(orgdate);

    // Format the date as dd-MM-yyyy
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(dateObj);

    return formattedDate;
  };

  const getShortName = (name) =>{
     if(!name) return ''

     return name.split(' ').map((char)=>char.charAt(0).toUpperCase()).join('')
  }


   const getAllTourPlan = async () =>{
     try{
       setLoading(true)
       const response = await api.post(`/STPMTP/getMTP`,
       {
          mtpDate:date
       })
   
       console.log(response.data)
       setUserDetails(response.data?.data?.userDetails)
       setMtpPlan(response.data?.data?.mtpdetails)
       
     }catch(err){
      console.log(err)
      toast.error("Something went wrong.")
     }finally{
      setLoading(false)
     }
   }

   useEffect(()=>{
    getAllTourPlan()
   },[date])


   useEffect(()=>{
    setFilterMtpPlan(()=>mtpPlan.filter(item=>item.mtpType===mtpType))
   },[mtpType,mtpPlan])

   console.log(mtpType)
  
  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className="bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-600 text-base md:text-lg font-medium">
            Monthly Tour Plan
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className='flex flex-col'>
            <span>MTP</span>
            <div className='flex items-center gap-2'>
             <div className='flex items-center gap-1'>
                <input onChange={()=>setMtpType(0)} checked={mtpType===0}  type='radio'></input>
                <span className='text-sm'>Planed</span>
             </div>
             <div className='flex items-center gap-1'>
                <input onChange={()=>setMtpType(1)} checked={mtpType===1} type='radio'></input>
                <span className='text-sm'>Reporting</span>
             </div>
            </div>
          </div>

          <div className='relative w-44 border md:p-2 p-1.5 rounded-md'>
             <span onClick={()=>setOpenDate((prev)=>!prev)} className='text-center cursor-pointer'>Date: {getDate(date)}</span>
            {
              openDate && 
              <div className='absolute bg-white border rounded-md -right-4 shadow p-4 top-12'>
                 <DatePicker
                     selected={date}
                     onChange={(date) => {
                       setDate(new Date(date));
                     }}
                    dateFormat="MM/yyyy"
                     showMonthYearPicker
                  />
              </div>
            }
          </div>
          <Link
            to={user.isAdmin?"/admin/mtpplan/add":"/employee/mtpplan/add"}
          >
            <button className="md:p-2 p-1.5 bg-themeblue md:text-base text-sm text-white rounded-md">
              Add Tour Plan
            </button>
          </Link>
        </div>
      </div>

      <div className='flex h-full flex-col overflow-scroll gap-4'>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <img src={Loader} alt="loader" className="w-10 h-10"></img>
          </div>
        ) : (
          <div className='flex flex-col gap-4 w-full h-full'>
          <div className='bg-white custom-shadow rounded-md flex justify-between md:py-4 py-3 px-3'>
             <div className='flex gap-2 items-center'>
               <div className='text-white font-bold bg-[#14b8a6] rounded-full w-12 h-12 flex justify-center items-center'>
                  {getShortName(userDetails?.fullName)}
               </div>
               <div className='flex flex-col'>
                  <span className='font-medium'>{userDetails?.fullName}</span>
                  <span className='text-sm'>{userDetails?.headQuater ? userDetails?.headQuater : "No HeadQuater"}</span>
               </div>
             </div>
             <div className='flex flex-col'>
              <div className='flex gap-2'>
                 <span className='font-medium'>Reporting To:</span>
                 <span className='text-gray-600'>{userDetails?.reportToName ? userDetails?.reportToName : "No Repoting"}</span>
              </div>
              <div className='flex gap-2'>
                 <span className='font-medium'>Reporting To HeadQuater:</span>
                 <span className='text-gray-600'>{userDetails?.reportingToHeadQuater ? userDetails?.reportingToHeadQuater : "No Headquater"}</span>
              </div>
             </div>
          </div>
          <div className='grid grid-cols-3 items-start gap-4'>
            {
               filterMtpPlan.map((mtp)=>(
                <div className='flex p-4 border-t-2 bg-white custom-shadow rounded-md border-[#14b8a6] flex-col gap-4'>
                <div className='flex justify-between items-center'>
                   <span>{mtp?.drName}</span>
                   <span className='p-1 px-2 text-sm text-white bg-[#14b8a6] rounded-md font-medium'>
                     Class {mtp?.className}
                   </span>
                </div>
                <div className='flex items-center gap-2'>
                   <span className='p-1 text-center text-xs bg-green-200 rounded-md text-green-600 w-20'>
                      {mtp?.speciality}
                   </span>
                   <span className='p-1 text-center text-xs bg-violet-200 rounded-md text-violet-500 w-20'>
                      {mtp?.qualification}
                   </span>
                   <span className='p-1 text-center text-xs bg-neutral-400 rounded-md text-black w-20'>
                     {mtp?.gender==="M"?"MALE":"FEMALE"}
                   </span>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                     <CalendarTodayIcon className='text-[#14b8a6]' style={{fontSize:'1.2rem'}}></CalendarTodayIcon>
                     <span className='text-sm'>{mtp?.mtpdate}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <LocationOnOutlinedIcon className='text-[#14b8a6]' style={{fontSize:'1.2rem'}}></LocationOnOutlinedIcon>
                     <span className='text-sm'>{mtp?.address},{mtp?.pinCode}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <AccessTimeOutlinedIcon className='text-[#14b8a6]' style={{fontSize:'1.2rem'}}></AccessTimeOutlinedIcon>
                     <span className='text-sm'>V Freq: {mtp?.vfreq}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <LocalHospitalOutlinedIcon className='text-[#14b8a6]' style={{fontSize:'1.2rem'}}></LocalHospitalOutlinedIcon>
                     <span className='text-sm'>Area: {mtp?.doctorArea}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <NearMeOutlinedIcon className='text-[#14b8a6]' style={{fontSize:'1.2rem'}}></NearMeOutlinedIcon>
                     <span className='text-sm'>MTP: {mtp?.mtp}</span>
                  </div>
                </div>
                <div className='bg-gray-100 flex  gap-1 flex-col p-2 rounded-md'>
                    <span>Products</span>
                    <span className='text-sm'>{mtp?.products}</span>
                </div>
             </div>
               ))
            }
          </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MTP