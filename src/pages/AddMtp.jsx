import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

//Importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LoaderCircle } from 'lucide-react';


import {toast} from 'react-toastify'
import api from '../api';


function AddMtp() {
    const { user } = useSelector((state) => state.auth);
    
    const [users,setUsers] = useState([])
    const [doctors,setDoctors] = useState([])
    const [chemist,setChemist] = useState([])
    const [stp,setStp] = useState([])
    const [loading,setLoading] = useState(false)
    const [products,setProducts] = useState([])
    const [errors,setErrors] = useState({})

    const [selectedUser,setSelectedUser] = useState(null)
    const [selectedDoc,setSelectedDoc] = useState(null)
    const [selectedStp,setSelectdStp] = useState(null)
    const [selectedProducts,setSelectedProducts] = useState([])


    const [description,setDescription] = useState('')
    const [mtpDate,setMtpDate] = useState(null)

    let docchem = [...doctors,...chemist]

    console.log(docchem)

    const fetchData = async ()=>{
      let stpObj = {
        pageNumber: 0,
        pageSize: 0,
        criteria: "string",
        reportingTo: 0,
        tourType: 0
      }
      try{
          const [users,doctors,chemists,stps] = await Promise.all([api.get('/User/GetAllUsers'),
          api.get('/Doctor/GetAllDoctor'),
          api.get('/Chemist/GetAllChemist'),
          api.post('/STPMTP/GetAll',stpObj)
        ])

         let allTours = stps.data.data.map((item)=> item.tours).flat()

         console.log(allTours)

          setUsers(users.data.data)
          setDoctors(doctors.data.data)
          setChemist(chemists.data.data)
          setStp(allTours)
     
          
      }catch(err){
        console.log(err)
        toast.error("Something went wrong.")
      }
    }

    useEffect(()=>{
      fetchData()
    },[])

    const validateData = () =>{
       let newErrors = {}

       if(!selectedDoc) newErrors.doc = "Please select doctor or chemist."
       if(!selectedUser) newErrors.user = "Please select user."
       if(!selectedStp) newErrors.stp = "Please select stp."
       if(!description) newErrors.description = "Please enter description."
       if(!mtpDate) newErrors.mtpDate = "Please enter mtp date."

       setErrors(newErrors)

       return Object.keys(newErrors).length===0
    }

    const handleSubmit = async () =>{
       if(validateData()){
        try{
          setLoading(true)
          let Obj = {
            mtpID: 0,
            stPid: selectedStp,
            docID: selectedDoc,
            superiorID: selectedUser,
            userID: user.id,
            mtpDate: mtpDate,
            insertDate: "2025-03-31T06:37:38.928Z",
            insertBy: "string",
            description: description,
            prodIDs: [0]
          }
          const response = await api.post("/STPMTP",Obj)
          toast.success("Successfully mtp created.")
        }catch(err){
          console.log(err)
          toast.error("Something went wrong.")
        }finally{
          setLoading(false)
        }
       }
    }
    
  return (
    
    <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 md:px-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
           <Link to={user.isAdmin?'/admin/mtpplan':'/employee/mtpplan'}><span className='text-gray-600 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span></Link>
           <h1 className='text-gray-800 text-base md:text-lg font-medium'>Add Monthly Tour Plan</h1>
        </div>
     </div>
     <div className='bg-white h-full custom-shadow flex flex-col gap-4 rounded-md md:py-4 py-3 px-3 md:px-4'>
        <div className='grid gap-4 md:grid-cols-2 grid-cols-1'>
          <div className='flex flex-col gap-2'>
             <label className='font-medium text-gray-700'>Select Doctor/Chemist <span className='text-sm text-red-500'>*</span></label>
             <select className='p-2 outline-none border border-gray-200' value={selectedDoc} onChange={(e)=>setSelectedDoc(e.target.value)}> 
               <option value={''}>--- Select Doctor/Chemist ---</option>
               {
                docchem.map((item,index)=>(
                  <option key={index} value={item.drCode || item.chemistCode}>{item.drName || item.chemistName}</option>
                ))
               }
             </select>
             {
               errors.doc && 
               <span className='text-sm text-red-500'>{errors.doc}</span>
             }
          </div>
          <div className='flex flex-col gap-2'>
             <label className='font-medium text-gray-700'>Select Users <span className='text-sm text-red-500'>*</span></label>
             <select value={selectedUser} onChange={(e)=>setSelectedUser(e.target.value)} className='p-2 border border-gray-200 outline-none'>
               <option value={''}>--Select User ---</option>
               {
                 users.map((item, index)=>(
                  <option key={index} value={item.id}>{item.firstName} {item.lastName}</option>
                 ))
               }
             </select>
             {
               errors.user && 
               <span className='text-sm text-red-500'>{errors.user}</span>
             }
          </div>
          <div className='flex flex-col gap-2'>
             <label className='font-medium text-gray-700'>Select STP <span className='text-sm text-red-500'>*</span></label>
             <select value={selectedStp} onChange={(e)=>setSelectdStp(e.target.value)} className='p-2 border border-gray-200 outline-none'>
               <option value={''}>--Select Stp---</option>
               {
                 stp.map((item, index)=>(
                  <option key={index} value={item.tourID}>{item.tourName}</option>
                 ))
               }
             </select>
             {
               errors.stp && 
               <span className='text-sm text-red-500'>{errors.stp}</span>
             }
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>Select MTP Date <span className='text-sm text-red-500'>*</span></label>
            <input type='date' onChange={(e)=>setMtpDate(e.target.value)} value={mtpDate} className='p-2 border border-gray-200 outline-none'></input>
            {
               errors.mtpDate && 
               <span className='text-sm text-red-500'>{errors.mtpDate}</span>
             }
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>Description <span className='text-sm text-red-500'>*</span></label>
            <textarea onChange={(e)=>setDescription(e.target.value)} type='text' value={description} placeholder='enter description' className='p-2 border border-gray-200 outline-none'></textarea>
            {
               errors.description && 
               <span className='text-sm text-red-500'>{errors.description}</span>
             }
          </div>


        </div>
        <div className='flex w-full place-content-end'>
             <button onClick={handleSubmit} disabled={loading} className='bg-themeblue cursor-pointer text-white p-2 w-20'>
               {
                loading ? 
                <LoaderCircle className='animate-spin'></LoaderCircle>
                : <span>Submit</span>
               }
             </button>
          </div>
     </div>
    </div>
  
  )
}

export default AddMtp