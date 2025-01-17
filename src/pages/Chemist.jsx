import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

//Importing data
import { columns, getAllChemist } from "../data/chemistDataTable";

//Importing icons
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';


export default function Chemist() {
  const { user } = useSelector((state) => state.auth);
  const [chemist,setChemist] = useState([])
  const [searchQuery,setSearchQuery] = useState('')
  const [filteredChemist,setFilteredChemist] = useState([])
  const [loading,setLoading] = useState(false)
  
  const getChemistData = async ()=>{
     try{
      setLoading(true)
      const data = await getAllChemist(user.api_token)
      setChemist(data.map((item,index)=>({...item,id:index+1})))
     }catch(err){
      console.log(err)
      toast.error(err.response.data.message || "Something went wrong.")
     }finally{
      setLoading(false)
     }
  }

  useEffect(()=>{
    if(searchQuery){
      setFilteredChemist(()=>chemist.filter((chm)=>chm.chemistName.toLowerCase().includes(searchQuery.trim().toLowerCase())))
    }else{
      setFilteredChemist(chemist)
    }
  },[searchQuery,chemist])

  useEffect(()=>{
    getChemistData()
  },[])

  return (
    <div className="flex h-full flex-col gap-3 md:gap-4">
      <div className="bg-white custom-shadow rounded-md md:py-4 py-3 px-3 flex items-center justify-between">
        <h1 className="text-gray-600 text-base md:text-lg font-medium">
          Chemist Details
        </h1>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-1.5 rounded-md hidden md:flex gap-1 items-center">
            <span>
              <SearchIcon></SearchIcon>
            </span>
            <input
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="outline-none bg-transparent"
              placeholder="Search Chemist..."
              type="text"
            ></input>
          </div>
          <span onClick={getChemistData} className="cursor-pointer md:w-9 md:h-9 w-8 h-8 border border-slate-200 flex justify-center items-center rounded-md">
            <AutorenewIcon></AutorenewIcon>
          </span>
          <Link to={"/admin/chemist/addnew"}>
            <button className="md:p-2 p-1.5 bg-themeblue md:text-base text-sm text-white rounded-md">
              Add New Chemist
            </button>
          </Link>
        </div>
      </div>
      <div className="h-full py-4 px-3 custom-shadow rounded-md bg-white">
        <Box
          sx={{
            height: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#edf3fd",
            },
          }}
        >
          <DataGrid
            rows={filteredChemist}
            columns={columns}
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
    </div>
  );
}
