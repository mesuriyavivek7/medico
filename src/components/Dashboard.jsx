import React, { useState } from "react";

//importing images
import LOGO from "../assets/logo.png";
import PERSON from "../assets/asset4.jpg";

import { useLocation , Outlet, useNavigate} from "react-router-dom";

//importing icons
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

export default function Dashboard() {

  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (pathname) =>{
    return location.pathname === pathname
  }

  const handleNavigate = (pathname) =>{
     navigate(pathname)
  }

  const [isMenuOpen,setIsMenuOpen] = useState(true)

  return (
    <div className="flex h-screen bg-lightgray">
      {/* Navbar */}
      <div className="fixed bg-white top-0 right-0 left-0 h-24 flex items-center">
        <div className={`${isMenuOpen?"w-72":"w-28"} duration-300 transition-all px-5 h-full flex items-center gap-2`}>
          <img className="w-14 h-14" alt="logo" src={LOGO}></img>
          {isMenuOpen && <h1 className="text-themeblue text-3xl transition-all duration-300 font-semibold">MEDICO</h1>}
        </div>
        <div className="flex justify-between px-8 h-full w-full items-center">
          <div className="flex items-center gap-3">
            <span onClick={()=>setIsMenuOpen(!isMenuOpen)} className="text-themeblue cursor-pointer">
              {isMenuOpen ? <MenuIcon style={{ fontSize: "2rem" }}></MenuIcon> : <ArrowRightAltIcon style={{fontSize: "2rem"}}></ArrowRightAltIcon>}
            </span>
            <span className="text-2xl font-bold">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-8">
          <div className="p-2 rounded-md flex bg-gray-100 items-center gap-1">
            <span>
              <SearchIcon style={{ fontSize: "1.6rem" }}></SearchIcon>
            </span>
            <input
              placeholder="Search here...."
              className="bg-transparent outline-none"
              type="text"
            ></input>
          </div>
          <div className="flex items-center gap-8">
            <span className="bg-gray-100 text-themeblue rounded-md flex justify-center items-center w-12 h-12">
              <NotificationsNoneOutlinedIcon
                style={{ fontSize: "1.8rem" }}
              ></NotificationsNoneOutlinedIcon>
            </span>
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={PERSON}
                alt="profile"
              ></img>
              <div className="flex flex-col">
                <h4 className="text-base font-bold">Harsh Patel</h4>
                <h4 className="text-sm">Super Admin</h4>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="w-full flex mt-24">
        {/* Sidebar */}
        <div className={`${isMenuOpen?"w-72":"w-28"} transition-all duration-300 shadow-lg bg-white`}>
            <div onClick={()=>handleNavigate('/')} className={`group flex ${isActive("/dashboard") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('/dashboard') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><DashboardOutlinedIcon style={{fontSize:'1.5rem'}}></DashboardOutlinedIcon></span>
               {isMenuOpen && <span className={`${isActive("/dashboard") && "text-themeblue"} group-hover:text-themeblue font-medium text-lg`}>Dashboard</span>}
            </div>
            <div onClick={()=>handleNavigate('doctors')} className={`group flex ${isActive("/dashboard/doctors") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('/dashboard/doctors') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><LocalHospitalOutlinedIcon style={{fontSize:'1.5rem'}}></LocalHospitalOutlinedIcon></span>
               {isMenuOpen && <span className={`${isActive("/dashboard/doctors") && "text-themeblue"} group-hover:text-themeblue font-medium text-lg`}>Doctors</span>}
            </div>
            <div onClick={()=>handleNavigate('chemist')} className={`group flex ${isActive("/dashboard/chemist") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('/dashboard/chemist') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><ScienceOutlinedIcon style={{fontSize:'1.5rem'}}></ScienceOutlinedIcon></span>
               {isMenuOpen && <span className={`${isActive("/dashboard/chemist") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>Chemist</span>}
            </div>
        </div>
        {/* Outlate */}
        <div className="w-full px-6 py-4 overflow-y-auto ">
            <Outlet></Outlet>
        </div>
      </div>

    </div>
  );
}
