import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import api from '../api';
import { useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//Importing icons
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

import { latestColumns, fetchAllUsers } from '../data/EmployeeDataTable';
import { Link } from 'react-router-dom';

export default function MyDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [doctorsCount,setDoctorsCount] = useState(0)
  const [chemistCount,setChemistCount] = useState(0)
  const [productCount,setProductCount] = useState(0)

  const fetchCounts = async ()=>{
     try{
        const [doctorsResponse, chemistResponse] = await Promise.all(user.isAdmin?[
          api.get('/Doctor/GetAllDoctor'),
          api.get('/Chemist/GetAllChemist')
        ]:[
          api.get('/DoctorMapping/GetAllDoctorMappingData'),
          api.get('/ChemistMapping/GetAllChemistMappingData')
        ])
        setDoctorsCount(doctorsResponse.data.data.length)
        setChemistCount(chemistResponse.data.data.length)
     }catch(err){
       console.log(err)
       toast.error("Something went wrong.")
     }
  }

  const [employee,setEmployee] = useState([])
  const [loading,setLoading] = useState(false)

    
  const getEmployeeData = async ()=>{
    try{
     setLoading(true)
     const data = await fetchAllUsers()
     setEmployee(data.map((item,index)=>({...item,id:index+1}))?.slice(0,5))
    }catch(err){
     console.log(err)
     toast.error(err.response.data.message || "Something went wrong.")
    }finally{
     setLoading(false)
    }
 }

 useEffect(()=>{
   getEmployeeData()
   fetchCounts()
 },[])

 const localizer = momentLocalizer(moment);
 const [events, setEvents] = useState([
  {
    title: "Meeting with Team",
    start: new Date(2025, 3, 5), // Year, Month (0-based), Day, Hours, Minutes
    end: new Date(2025, 3, 5),
  },
  {
    title: "Doctor Appointment",
    start: new Date(2025, 3, 14),
    end: new Date(2025, 3, 18),
  },
]);
 
  return (
  <div className='h-full overflow-y-scroll gap-4'>
    <div className='grid mb-4 md:grid-cols-3 grid-cols-1 gap-4'>
      <div className='flex custom-shadow p-4 bg-gradient-to-r from-blue-400 to-blue-600  rounded-lg flex-col gap-2'>
         <h1 className='text-lg text-white font-semibold'>DOCTORS</h1>
         <span className='text-2xl font-bold text-gray-100'>{doctorsCount}</span>
         <div className='flex justify-between items-center'>
            <Link to={user.isAdmin?'/admin/doctors':'/employee/doctors'}><span className='underline text-white cursor-pointer'>See all doctors</span></Link>
            <span className='bg-themeblue text-white w-10 h-10 flex justify-center items-center rounded-md'><LocalHospitalOutlinedIcon style={{fontSize:'1.8rem'}}></LocalHospitalOutlinedIcon></span>
         </div>
      </div>
      <div className='flex p-4 bg-gradient-to-r from-violet-400 to-violet-600 custom-shadow rounded-lg flex-col gap-2'>
         <h1 className='text-lg text-white font-semibold'>CHEMIST</h1>
         <span className='text-2xl font-bold text-gray-100'>{chemistCount}</span>
         <div className='flex justify-between items-center'>
            <Link to={user.isAdmin?'/admin/chemists':'/employee/chemists'}><span className='underline text-white cursor-pointer'>See all chemist</span></Link>
            <span className='bg-themeblue text-white w-10 h-10 flex justify-center items-center rounded-md'><ScienceOutlinedIcon style={{fontSize:'1.8rem'}}></ScienceOutlinedIcon></span>
         </div>
      </div>
      <div className='flex p-4 bg-gradient-to-r from-emerald-400 to-teal-600 custom-shadow rounded-lg flex-col gap-2'>
         <h1 className='text-lg text-white font-semibold'>PRODUCTS</h1>
         <span className='text-2xl font-bold text-gray-100'>120</span>
         <div className='flex justify-between items-center'>
            <span className='underline cursor-pointer text-white'>See all products</span>
            <span className='bg-themeblue text-white w-10 h-10 flex justify-center items-center rounded-md'><Inventory2OutlinedIcon style={{fontSize:'1.8rem'}}></Inventory2OutlinedIcon></span>
         </div>
      </div>
    </div>

    <div className='w-full mb-4 h-[500px]'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    
    </div>


    <div className="h-full flex flex-col gap-2 py-4 px-3 custom-shadow rounded-md bg-white">
        <h1 className='font-medium text-lg'>New Employees</h1>
        <Box
          sx={{
            height: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#edf3fd",
            },
          }}
        >
          <DataGrid
            rows={employee}
            columns={latestColumns}
            loading={loading}
            pagination={false}
            disableRowSelectionOnClick
          />
        </Box>
    </div>
    

    
  </div>
    
  )
}
