import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

//Importing icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LoaderCircle } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

import {toast} from 'react-toastify'
import api from '../api';

import { mtpcolumns } from '../data/mtpTable';


function AddMtp() {
    const { user } = useSelector((state) => state.auth);
    
    const [users,setUsers] = useState([])
    const [doctors,setDoctors] = useState([])
    const [chemist,setChemist] = useState([])
    const [stp,setStp] = useState([])
    const [loading,setLoading] = useState(false)
    const [errors,setErrors] = useState({})
    const [mtpRow,setMtpRow] = useState([])
    const [product,setProduct] = useState([])

    const [selectedStp,setSelectedStp] = useState(null)
    const [mtpDate,setSelectedMtpDate] = useState(null)

    const [open,setOpen] = useState(false)
 
    let docchem = [...doctors,...chemist]


    const [formData,setFormData] = useState({
      user:null,
      doctor:null,
      description:'',
      modeOfWork:'',
      product:[]
    })
  

    const fetchData = async ()=>{
      let stpObj = {
        pageNumber: 0,
        pageSize: 0,
        criteria: "string",
        reportingTo: 0,
        tourType: 0
      }
      try{
          const [users,doctors,chemists,stps,products] = await Promise.all([api.get('/User/GetAllUsers'),
          api.get('/Doctor/GetAllDoctor'),
          api.get('/Chemist/GetAllChemist'),
          api.post('/STPMTP/GetAll',stpObj),
          api.get('/Product')
        ])
      
          setUsers(users.data.data)
          setDoctors(doctors.data.data)
          setChemist(chemists.data.data)
          setStp(stps.data.data)
          setProduct(products.data.data)
          
      }catch(err){
        console.log(err)
        toast.error("Something went wrong.")
      }
    }

    useEffect(()=>{
      fetchData()
    },[])

    const handleChange = (e) =>{
       const {name, value} = e.target
       
       if(name==="user" || name==="stp" || name==="doctor"){
          let parsedValue = JSON.parse(value)
          if(name==="stp"){
            setSelectedStp(parsedValue)
            return 
          }
          setFormData((prevData)=>({...prevData,[name]:parsedValue}))
       }else{
        setFormData((prevData)=>({...prevData,[name]:value}))
       }

    }


    const validateData = () =>{
       let newErrors = {}

       if(!formData.doctor) newErrors.doc = "Please select doctor or chemist."
       if(!formData.description) newErrors.description = "Please enter description."
       if(formData.product.length===0) newErrors.product = "Please select any one product"

       setErrors(newErrors)

       return Object.keys(newErrors).length===0
    }

    const handleSubmit = async () =>{
        try{
          setLoading(true)
          
          await Promise.all(mtpRow.map(async (mtp)=>{
            let obj = {
              mtpID:0,
              stPid:selectedStp?.tourID,
              docID:mtp.doctor?.drCode || mtp.doctor?.chemistCode,
              superiorID:mtp.user.id,
              userID:user.id,
              mtpDate:mtpDate,
              insertDate:new Date(),
              ModeOfWork:mtp.modeOfWork,
              insertBy:user.id,
              status:"",
              description:mtp.description,
              prodIDs:mtp.product
            }

            console.log('mtp--->',obj)

            await api.post('/STPMTP/addMTP',obj)

          }))
          
          toast.success("Successfully mtp created.")
          setMtpRow([])
        }catch(err){
          console.log(err)
          toast.error("Something went wrong.")
        }finally{
          setLoading(false)
        }
    }

    const handleAdd = () =>{
      if(validateData()){
          setMtpRow((prevData)=>[{id:prevData.length+1,...formData},...prevData])
          setFormData({
            user:null,
            doctor:null,
            product:[],
            description:'',
            modeOfWork:''
          })
      }
    }

    const handleRemove = (id) =>{
        setMtpRow(()=>mtpRow.filter((item)=> item.id!==id))
    }

    const handleSelectProduct = (id) =>{
       const existProduct = formData.product.find((pid)=>pid===id)

       if(existProduct){
        let filterProduct = formData.product.filter((pid)=>pid!==id)
        setFormData((prevData)=> ({...prevData,product:filterProduct}))
       }else{
        let addProduct = [...formData.product,id]
        setFormData((prev)=>({...prev,product:addProduct}))
       }
    }

    console.log("mtp row -->",mtpRow)
    
  return (
    
    <div className='flex h-full flex-col gap-3 md:gap-4'>
      <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 md:px-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
           <Link to={user.isAdmin?'/admin/mtpplan':'/employee/mtpplan'}><span className='text-gray-600 cursor-pointer'><ArrowBackIosIcon style={{fontSize:'1.4rem'}}></ArrowBackIosIcon></span></Link>
           <h1 className='text-gray-800 text-base md:text-lg font-medium'>Add Monthly Tour Plan</h1>
        </div>
     </div>
     <div className='bg-white h-full custom-shadow flex flex-col gap-4 rounded-md md:py-4 py-3 px-3 md:px-4'>
       <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mb-2 items-center'>
        <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>Select STP <span className='text-sm text-red-500'>*</span></label>
             <select name='stp' value={JSON.stringify(formData.stp)} onChange={handleChange} className='p-2 border border-gray-200 outline-none'>
               <option value={''}>--Select Stp---</option>
               {
                 stp.map((item, index)=>(
                  <option key={index} value={JSON.stringify(item)}>{item.tourName}</option>
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
            <input name='mtpDate' type='date' onChange={(e)=>setSelectedMtpDate(e.target.value)} value={formData.mtpDate} className='p-2 border border-gray-200 outline-none'></input>
            {
               errors.mtpDate && 
               <span className='text-sm text-red-500'>{errors.mtpDate}</span>
             }
          </div>
       </div>
      <div className='flex flex-col gap-4'>
         <h1 className='font-medium text-lg'>Select Mtp Details</h1>
      
        <div className='grid gap-4 md:grid-cols-2 grid-cols-1'>
          <div className='flex flex-col gap-2'>
             <label className='font-medium text-gray-700'>Select Doctor/Chemist <span className='text-sm text-red-500'>*</span></label>
             <select name='doctor' className='p-2 outline-none border border-gray-200' value={JSON.stringify(formData.doctor)} onChange={handleChange}> 
               <option value={''}>--- Select Doctor/Chemist ---</option>
               {
                docchem.map((item,index)=>(
                  <option key={index} value={JSON.stringify(item)}>{item.drName || item.chemistName}</option>
                ))
               }
             </select>
             {
               errors.doc && 
               <span className='text-sm text-red-500'>{errors.doc}</span>
             }
          </div>
          <div className='flex flex-col gap-2'>
             <label className='font-medium text-gray-700'>Select Users </label>
             <select name='user' value={JSON.stringify(formData.user)} onChange={handleChange} className='p-2 border border-gray-200 outline-none'>
               <option value={''}>--Select User ---</option>
               {
                 users.map((item, index)=>(
                  <option key={index} value={JSON.stringify(item)}>{item.firstName} {item.lastName}</option>
                 ))
               }
             </select>
             {
               errors.user && 
               <span className='text-sm text-red-500'>{errors.user}</span>
             }
          </div>
         
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>Description <span className='text-sm text-red-500'>*</span></label>
            <textarea name='description' onChange={handleChange} type='text' value={formData.description} placeholder='enter description' className='p-2 border border-gray-200 outline-none'></textarea>
            {
               errors.description && 
               <span className='text-sm text-red-500'>{errors.description}</span>
             }
          </div>

          <div className='flex flex-col gap-2'>
             <label className='font-medium text-gray-700'>Mode Of Work <span className='text-sm text-red-500'>*</span></label>
             <select name='modeOfWork' value={formData.modeOfWork} onChange={handleChange} className='p-2 outline-none border-2 border-gray-200 '>
               <option value={''}>--- Select Mode Of Work ---</option>
               <option value={'MEETING'}>MEETING</option>
               <option value={'TRANSIT'}>TRANSIT</option>
               <option value={'STRIKE'}>STRIKE</option>
               <option value={'CAMP'}>CAMP</option>
               <option value={'Other'}>Other</option>
             </select>
          </div>

          <div className='flex w-52 flex-col gap-2'>
               <label className='font-medium' htmlFor='allowance'>Products <span className='text-red-500'>*</span></label>
               <div className='relative w-full'>
                <div onClick={()=>setOpen((prev)=>!prev)} className='p-1.5 cursor-pointer border flex gap-2 justify-between items-center rounded-md '>
                  <span>{formData.product.length===0?"Select Products":`${formData.product.length} Products`}</span>
                  <span >{open ? <ChevronUp className='w-5 h-5 text-gray-600'></ChevronUp>:<ChevronDown className='w-5 h-5 text-gray-600'></ChevronDown>}</span>
                </div>
                {
                  open && 
                  <div className='absolute h-24 overflow-scroll w-full shadow bg-white z-40'>
                  {
                    product.map((item,index) =>(
                      <div key={index} className='grid p-2 grid-cols-4 items-center gap-2'>
                         <input onChange={()=>handleSelectProduct(item.prodId)} className='col-span-1' checked={formData.product.includes(item.prodId)} type='checkbox'></input>
                         <span className='text-xs col-span-3'>{item.productName}</span>
                      </div>
                    ))
                  }
                  </div>
                }
                {errors.product && <span className='text-sm text-red-500'>{errors.product}</span>}
               </div>
          </div>

        </div>
        </div>
        <div className='flex w-full place-content-end'>
             <button onClick={handleAdd} disabled={loading} className='bg-themeblue cursor-pointer text-white p-2 w-20'>
               {
                loading ? 
                <LoaderCircle className='animate-spin'></LoaderCircle>
                : <span>Add</span>
               }
             </button>
          </div>
     </div>
     <div className='h-full py-4 px-3 custom-shadow rounded-md bg-white'>
        <Box sx={{height:"100%",
          '& .super-app-theme--header': {
            backgroundColor: '#edf3fd',
          },}}>
           <DataGrid
            rows={mtpRow}
            columns={mtpcolumns(handleRemove)}
            loading={loading}
            initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
           }}
           pageSizeOptions={[5,10]}
           disableRowSelectionOnClick
          />
         </Box>
     </div>
     <div onClick={handleSubmit} className='p-2 bg-white flex place-content-end'>
         <button disabled={mtpRow.length===0} className='w-36  disabled:bg-gray-500 disabled:cursor-not-allowed p-2 font-medium flex justify-center items-center bg-themeblue text-white'>
            {
              loading? 
              <LoaderCircle className='animate-spin'></LoaderCircle>
              :<span>Submit</span>
            }
         </button>
     </div>
    </div>
  
  )
}

export default AddMtp