import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

//importing icons
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { LoaderCircle } from 'lucide-react';

import { chemistMapColumns, getAllChemist } from '../data/chemistDataTable';
import { empMapColumns, fetchAllUsers } from '../data/EmployeeDataTable';
import api from '../api';

const prepareObj = (chemistList, employeeList) => 
  employeeList.flatMap(employee => 
    chemistList.map(chemist => ({ chemistCode:chemist.chemistCode, employeeCode:employee.id }))
  );


function ChemistMapping() {
  const { user } = useSelector((state) => state.auth);

  const [loading,setLoading] = useState(false)
  const [saveLoader,setSaveLoader] = useState(false)
  const [users,setUsers] = useState([])
  const [chemist,setChemist] = useState([])
  const [selectedChemist,setSelectedChemist] = useState([])
  const [selectedEmployee,setSelectedEmployee] = useState([])
  const [selectedEmpIdx,setSelectedEmpIdx] = useState([])
  const [selectedChemIdx,setSelectedChemIdx] = useState([])

  //Fetch data get all chemist data
  const getChemistData = async ()=>{
    try{
     setLoading(true)
     const data = await getAllChemist()
     setChemist(data.map((item,index)=>({...item,id:index+1})))
    }catch(err){
     console.log(err)
     toast.error(err.response.data.message || "Something went wrong.")
    }finally{
     setLoading(false)
    }
 }

 //Fetch data for get all employees 
 const fetchData = async ()=>{
    setLoading(true)
    try{
       const users = await fetchAllUsers()
       setUsers(users.map((item,index)=>({...item,id:index+1})))
    }catch(err){
      console.log(err)
      toast.error("Something went wrong while fetching data.")
    }finally{
      setLoading(false)
    }
  }

  const fetchAllData = () =>{
    getChemistData()
    fetchData()
  }

  useEffect(()=>{
     fetchAllData()
  },[])

 const handleSelectChemist = (newChemist) =>{
    setSelectedChemIdx(newChemist)
    setSelectedChemist(chemist.filter((item, index) => newChemist.includes(index + 1)));
 }

 
 const handleSelectEmployee = (newEmployee) => {
    setSelectedEmpIdx(newEmployee)
    setSelectedEmployee(users.filter((item, index) => newEmployee.includes(index + 1)));
};

 const handleSave = async () =>{
     let mappingObj ={
      chemistsMappingList:prepareObj(selectedChemist,selectedEmployee),
      employeeCode:user.id,
      isActive:0,
      createdBy:0
     }
     try{
       setSaveLoader(true)
       await api.post('/ChemistMapping/AddChemistMapping',mappingObj)
       setSelectedChemist([])
       setSelectedEmployee([])
       setSelectedEmpIdx([])
       setSelectedChemIdx([])
       toast.success("New chemist mapping created successfully.")
     }catch(err){
      console.log(err)
      toast.error("Something went wrong.")
     } finally{
      setSaveLoader(false)
     }
 }

  return (
    <div className='flex h-full flex-col gap-3 md:gap-4'>
       <div className="bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between">
        <h1 className="text-gray-600 text-base md:text-lg font-medium">
          Chemist Mapping
        </h1>
        <div className="flex items-center gap-3">
          <span onClick={()=>fetchAllData} className="cursor-pointer md:w-9 md:h-9 w-8 h-8 border border-slate-200 flex justify-center items-center rounded-md">
            <AutorenewIcon></AutorenewIcon>
          </span>
        </div>
      </div>
      <div className='h-full grid md:grid-cols-2 grid-cols-1 items-center gap-2'>
         
         <div className='h-full py-4 px-3 custom-shadow rounded-md bg-white'>
         <h1 className='mb-2 font-medium text-lg'>Employee</h1>
         <Box
          sx={{
            height: "95%",
          }}
        >
          <DataGrid
            rows={users}
            columns={empMapColumns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5,10]}
            checkboxSelection
            rowSelectionModel={selectedEmpIdx}
            onRowSelectionModelChange={(newSelected)=>handleSelectEmployee(newSelected)}
          />
         </Box>
         </div>
         <div className='h-full py-4 px-3 custom-shadow rounded-md bg-white'>
         <h1 className='mb-2 font-medium text-lg'>Chemist</h1>
         <Box
          sx={{
            height: "95%",
          }}
        >
          <DataGrid
            rows={chemist}
            columns={chemistMapColumns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5,10]}
            checkboxSelection
            rowSelectionModel={selectedChemIdx}
            onRowSelectionModelChange={(newSelected)=>handleSelectChemist(newSelected)}
          />
         </Box>
         </div>
      </div>
      <div className='flex place-content-center  items-center rounded-md custom-shadow p-2 bg-white'>
            <button disabled={selectedChemist.length===0 || selectedEmployee.length===0} onClick={handleSave} className={`bg-themeblue disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md hover:bg-blue-800 transition-all duration-300 text-white w-24 p-1`}>
              {
                saveLoader ? (
                  <div className='flex items-center gap-2'>
                    <LoaderCircle className='animate-spin'></LoaderCircle>
                    Loading..
                  </div>
                ) : (
                  <span>Save</span>
                )
              }
            </button>
         </div>
    </div>
  )
}

export default ChemistMapping