import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

//importing data
import { columns, fetchAllUsers } from '../data/EmployeeDataTable';

//Importing icons
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';



export default function Employee() {

  const { user } = useSelector((state) => state.auth);
  const [users,setUsers] = useState([])
  const [loader,setLoader] = useState(false)

  const fetchData = async ()=>{
    setLoader(true)
    try{
       const users = await fetchAllUsers(user.api_token)
       setUsers(users.map((item,index)=>({...item,srno:index+1})))
    }catch(err){
      console.log(err)
      toast.error("Something went wrong while fetching data.")
    }finally{
      setLoader(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
       <div className='bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between'>
         <h1 className='text-gray-600 text-base md:text-lg font-medium'>Employee Details</h1>
         <div className='flex items-center gap-3'>
           <div className='bg-gray-100 p-1.5 md:flex hidden rounded-md gap-1 items-center'>
            <span><SearchIcon></SearchIcon></span>
            <input className='outline-none bg-transparent' placeholder='Search Employee...' type='text'></input>
           </div>
           <span onClick={fetchData} className='cursor-pointer md:w-9 md:h-9 w-8 h-8 border border-slate-200 flex justify-center items-center rounded-md'><AutorenewIcon></AutorenewIcon></span>
           <Link to={'/admin/employee/addnew'}><button className='md:p-2 p-1.5 bg-themeblue md:text-base text-sm text-white rounded-md'>Add New Employee</button></Link>
         </div>
       </div>
       <div className='h-full py-4 px-3 custom-shadow rounded-md bg-white'>
         <Box sx={{height:"100%",
          '& .super-app-theme--header': {
            backgroundColor: '#edf3fd',
          },}}>
           <DataGrid
            rows={users}
            columns={columns}
            loading={loader}
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
    </div>
  )
}
