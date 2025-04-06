import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//importing images
import NODATA from '../assets/computer.png'
import Loader from '../assets/loader.svg'

//Importing icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { toast } from 'react-toastify'

function PendingMtp() {
  const [mtpPlan,setMtpPlan] = useState([])
  const [activeState,setActiveState] = useState('approve')
  const [loading,setLoading] = useState(false)
  const [activeCounts, setActiveCounts] = useState(1);
  const [pendingCounts, setPendingCounts] = useState(1);
  const [rejectCounts, setRejectCounts] = useState(1);
  const [openDate,setOpenDate] = useState(false)

  const [date,setDate] = useState(new Date())

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

  const getAllTourPlan = async () =>{
    try{
      setLoading(true)
      const response = await api.post(`/STPMTP/getMTP`,
      {
        mtpDate: date
      })
      console.log(response.data.data)

      // if(response.data.data.mtpdetails.length>0){
      //  setMtpPlan(response.data.data[0].tours.filter((tour)=> tour.tourType === 1))
      // }
      
    }catch(err){
     console.log(err)
     toast.error("Something went wrong.")
    }finally{
     setLoading(false)
    }
  }

  useEffect(()=>{
    setActiveCounts(mtpPlan.filter((item)=>item.status==="Approved").length)
    setPendingCounts(mtpPlan.filter((item)=>item.status==="Pending").length)
    setRejectCounts(mtpPlan.filter((item)=>item.status==="Rejected").length)
  },[mtpPlan])

  useEffect(()=>{
    getAllTourPlan()
  },[date])

  const renderMTP = () =>{
    switch(activeState) {
      case "approve":
        return activeCounts > 0 ? (
          mtpPlan.filter((plan) => plan.status === "Approved")
          .map((item,index) => (
          <div key={index} className='rounded-md custom-shadow border-l-4 border-black  bg-white p-4 flex flex-col gap-2'>
          <div className='w-full flex justify-between'>
            <h1 className='text-lg font-bold'>{item.tourName || ""}</h1>
            <div className='flex items-center gap-4'>
              <span className='font-medium'>Approved By : {item.approvedBy || ""}</span>
              <span className='bg-green-200 flex justify-center items-center px-2 p-1 rounded-2xl text-sm text-green-600'>Approved</span>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
           <div className='flex gap-2 items-center'>
             <span className='text-[#71717a]'><CalendarTodayIcon style={{fontSize:'1.1rem'}}></CalendarTodayIcon></span> 
             <span className='text-[#71717a] font-medium'>{getDate(item.addedDate)}</span>
           </div>
           <p className='text-[15px] font-medium text-[#71717a]'>{item.comments || ""}</p>
          </div>
          <div className='flex flex-col mt-2 gap-2'>
           <div className='flex items-center gap-2'>
             <span className='text-[#71717a]'><LocationOnOutlinedIcon></LocationOnOutlinedIcon></span>
             <span className='font-medium'>Tour Locations</span>
           </div>
           <hr></hr>
           <div className='flex flex-col gap-1'>
             {
               item.tourLocations.map((location,index)=> <span key={index}>{location.locationSequence+1} {location.locationName || ""}</span>)
             }
           </div>
          </div>
       </div>
       ))
        ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col gap-1 items-center">
            <img src={NODATA} alt="nodata" className="w-24 h-24"></img>
            <span className="text-gray-600 font-medium">
              No Approved Tour Plan
            </span>
          </div>
        </div>
        )

      case "pending":
        return pendingCounts > 0 ? (
          mtpPlan.filter((plan)=> plan.status==="Pending").
          map((item,index) => (
          <div key={index} className='rounded-md custom-shadow border-l-4 border-black  bg-white p-4 flex flex-col gap-2'>
          <div className='w-full flex justify-between'>
            <h1 className='text-lg font-bold'>{item.tourName || ""}</h1>
            <span className='bg-orange-200 flex justify-center items-center px-2 rounded-2xl text-sm text-yellow-600'>Pending</span>
          </div>
          <div className='flex flex-col gap-1'>
           <div className='flex gap-2 items-center'>
             <span className='text-[#71717a]'><CalendarTodayIcon style={{fontSize:'1.1rem'}}></CalendarTodayIcon></span> 
             <span className='text-[#71717a] font-medium'>{getDate(item.addedDate)}</span>
           </div>
           <p className='text-[15px] font-medium text-[#71717a]'>{item.comments || ""}</p>
          </div>
          <div className='flex flex-col mt-2 gap-2'>
           <div className='flex items-center gap-2'>
             <span className='text-[#71717a]'><LocationOnOutlinedIcon></LocationOnOutlinedIcon></span>
             <span className='font-medium'>Tour Locations</span>
           </div>
           <hr></hr>
           <div className='flex flex-col gap-1'>
            {
               item.tourLocations.map((location,index)=> <span key={index}>{location.locationSequence+1} {location.locationName || ""}</span>)
             }
           </div>
          </div>
         </div>
        ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col gap-1 items-center">
              <img src={NODATA} alt="nodata" className="w-24 h-24"></img>
              <span className="text-gray-600 font-medium">
                No Pending Tour Plan
              </span>
            </div>
          </div>
          )
        
      case "rejected" : 
        return rejectCounts > 0 ? (
          mtpPlan.filter((plan)=> plan.status==="Rejected").
          map((item,index)=>(
          <div key={index} className='rounded-md custom-shadow border-l-4 border-black  bg-white p-4 flex flex-col gap-2'>
          <div className='w-full flex justify-between'>
            <h1 className='text-lg font-bold'>{item.tourName || ""}</h1>
            <div className='flex items-center gap-4'>
              <span className='font-medium'>Reject By : {item.approvedBy || ""}</span>
              <span className='bg-red-200 flex justify-center items-center px-2 p-1 rounded-2xl text-sm text-red-600'>Approved</span>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
           <div className='flex gap-2 items-center'>
             <span className='text-[#71717a]'><CalendarTodayIcon style={{fontSize:'1.1rem'}}></CalendarTodayIcon></span> 
             <span className='text-[#71717a] font-medium'>{getDate(item.addedDate)}</span>
           </div>
           <p className='text-[15px] font-medium text-[#71717a]'>{item.comments || ""}</p>
          </div>
          <div className='flex flex-col mt-2 gap-2'>
           <div className='flex items-center gap-2'>
             <span className='text-[#71717a]'><LocationOnOutlinedIcon></LocationOnOutlinedIcon></span>
             <span className='font-medium'>Tour Locations</span>
           </div>
           <hr></hr>
           <div className='flex flex-col gap-1'>
             {
               item.tourLocations.map((location,index)=> <span key={index}>{location.locationSequence+1} {location.locationName || ""}</span>)
             }
           </div>
          </div>
       </div>))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col gap-1 items-center">
              <img src={NODATA} alt="nodata" className="w-24 h-24"></img>
              <span className="text-gray-600 font-medium">
                No Rejected Tour Plan
              </span>
            </div>
          </div>
        )  
    }
   }

  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
    <div className="bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-600 text-base md:text-lg font-medium">
         Pending Monthly Tour Plan
        </h1>
        <div className="flex items-center gap-2">
          <span
            onClick={() => setActiveState("approve")}
            className={`w-20 ${
              activeState === "approve"
                ? "bg-themeblue text-white"
                : "text-gray-600"
            } cursor-pointer hover:bg-themeblue hover:text-white transition-colors duration-300 flex justify-center items-center text-sm p-1 border rounded-md`}
          >
            Approved
          </span>
          <span
            onClick={() => setActiveState("pending")}
            className={`w-20 ${
              activeState === "pending"
                ? "bg-themeblue text-white"
                : "text-gray-600"
            } cursor-pointer hover:bg-themeblue hover:text-white transition-colors duration-300 flex justify-center items-center text-sm p-1 border rounded-md`}
          >
            Pending
          </span>
          <span
            onClick={() => setActiveState("rejected")}
            className={`w-20 ${
              activeState === "rejected"
                ? "bg-themeblue text-white"
                : "text-gray-600"
            } cursor-pointer hover:bg-themeblue hover:text-white transition-colors duration-300 flex justify-center items-center text-sm p-1 border rounded-md`}
          >
            Rejected
          </span>
        </div>
      </div>

      <div className='relative w-44 border md:p-2 p-1.5 rounded-md'>
             <span onClick={()=>setOpenDate((prev)=>!prev)} className='text-center cursor-pointer'>Date: {getDate(date)}</span>
            {
              openDate && 
              <div className='absolute right-0 top-12'>
                <Calendar onChange={setDate} value={date}></Calendar>
              </div>
            }
       </div>
     
    </div>

    <div className='flex h-full flex-col overflow-scroll gap-4'>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <img src={Loader} alt="loader" className="w-10 h-10"></img>
        </div>
      ) : (
        renderMTP()
      )}
    </div>
  </div>
  )
}

export default PendingMtp