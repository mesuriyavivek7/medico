import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";

//importing images
import LOGO from "../../assets/logo.png";
import PERSON from "../../assets/asset4.jpg";

//importing icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { useLocation , Outlet, useNavigate} from "react-router-dom";

//importing icons
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isActive = (pathname) =>{
    return location.pathname.includes(pathname)
  }

  const handleNavigate = (pathname) =>{
     navigate(pathname)
  }

  const [isMenuOpen,setIsMenuOpen] = useState(true)
  const [isProfileOpen,setIsProfileOpen] = useState(false)

  const popupRef = useRef(null)

  // Handle click outside
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsProfileOpen(false)
    }
  };

  const getName = (name) =>{
    if(!name) return "Unknown"
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  }

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logoutUser = () =>{
     dispatch(logout())
     console.log("logout user")
     navigate('/')
  }

  return (
    <div className="flex h-screen bg-lightgray">
      {/* Navbar */}
      <div className="fixed bg-white z-40 top-0 right-0 left-0 md:h-24 h-20 flex items-center">
        <div className={`${isMenuOpen?"md:w-72":"md:w-28"} w-28 duration-300 transition-all px-5 h-full flex items-center gap-2`}>
          <img className="w-14 h-14" alt="logo" src={LOGO}></img>
          {isMenuOpen && <h1 className="text-themeblue md:block hidden text-3xl transition-all duration-300 font-semibold">Elvira</h1>}
        </div>
        <div className="flex justify-between px-2 md:px-8 h-full w-full items-center">
          <div className="flex items-center gap-3">
            <span onClick={()=>setIsMenuOpen(!isMenuOpen)} className="text-themeblue cursor-pointer">
              {isMenuOpen ? <MenuIcon style={{ fontSize: "2rem" }}></MenuIcon> : <ArrowRightAltIcon style={{fontSize: "2rem"}}></ArrowRightAltIcon>}
            </span>
            <span className="text-2xl md:block hidden font-bold">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-8">
          <div className="p-2 rounded-md hidden md:flex bg-gray-100 items-center gap-1">
            <span>
              <SearchIcon style={{ fontSize: "1.6rem" }}></SearchIcon>
            </span>
            <input
              placeholder="Search here...."
              className="bg-transparent outline-none"
              type="text"
            ></input>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <span className="bg-gray-100 text-themeblue rounded-md flex justify-center items-center w-12 h-12">
              <NotificationsNoneOutlinedIcon
                style={{ fontSize: "1.8rem" }}
              ></NotificationsNoneOutlinedIcon>
            </span>
            <div onClick={()=>setIsProfileOpen(!isProfileOpen)} className="relative flex cursor-pointer items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={PERSON}
                alt="profile"
              ></img>
              <div className="md:flex hidden flex-col">
                <h4 className="text-base leading-4 font-bold">{getName(user?.firstName)}</h4>
                <h4 className="text-sm">{user?.isAdmin?"Admin":"Member"}</h4>
              </div>
              {isProfileOpen && 
               <div ref={popupRef} className="absolute z-40 w-36 md:w-48 shadow rounded-md border bg-white top-[120%] right-0 flex flex-col ">
                 <Link to="/admin/profile"><div className="flex hover:bg-lightgray p-2 items-center gap-2 text-gray-500"><span className="text-blue-500"><AccountCircleIcon></AccountCircleIcon></span> Profile</div></Link>
                 <div onClick={logoutUser} className="flex hover:bg-lightgray p-2 items-center gap-2 text-gray-500"><span className="text-red-500"><LogoutIcon></LogoutIcon></span> Logout</div>
              </div>
              }
            </div>
          </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="w-full relative flex md:mt-24 mt-20">
        {/* Sidebar For Web screen */}
        <div className={`${isMenuOpen?"w-72":"w-28"} z-40 md:block hidden transition-all duration-300 shadow-lg bg-white`}>
            <div onClick={()=>handleNavigate('/admin/dashboard')} className={`group flex ${isActive("dashboard") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('dashboard') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><DashboardOutlinedIcon style={{fontSize:'1.5rem'}}></DashboardOutlinedIcon></span>
               {isMenuOpen && <span className={`${isActive("dashboard") && "text-themeblue"} group-hover:text-themeblue font-medium text-lg`}>Dashboard</span>}
            </div>
            <div onClick={()=>handleNavigate('doctors')} className={`group flex ${isActive("doctors") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('doctors') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><LocalHospitalOutlinedIcon style={{fontSize:'1.5rem'}}></LocalHospitalOutlinedIcon></span>
               {isMenuOpen && <span className={`${isActive("doctors") && "text-themeblue"} group-hover:text-themeblue font-medium text-lg`}>Doctors</span>}
            </div>
            <div onClick={()=>handleNavigate('chemist')} className={`group flex ${isActive("chemist") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('chemist') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><ScienceOutlinedIcon style={{fontSize:'1.5rem'}}></ScienceOutlinedIcon></span>
               {isMenuOpen && <span className={`${isActive("chemist") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>Chemist</span>}
            </div>
            <div onClick={()=>handleNavigate('employee')} className={`group flex ${isActive("employee") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('employee') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><PersonOutlineIcon style={{fontSize:'1.5rem'}}></PersonOutlineIcon></span>
               {isMenuOpen && <span className={`${isActive("employee") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>Employee</span>}
            </div>
            <div onClick={()=>handleNavigate('myleaves')} className={`group flex ${isActive("myleaves") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('myleaves') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><ExitToAppIcon style={{fontSize:'1.5rem'}}></ExitToAppIcon></span>
               {isMenuOpen && <span className={`${isActive("myleaves") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>My Leaves</span>}
            </div>
            <div onClick={()=>handleNavigate('pendingonme')} className={`group flex ${isActive("pendingonme") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('pendingonme') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><ExitToAppIcon style={{fontSize:'1.5rem'}}></ExitToAppIcon></span>
               {isMenuOpen && <span className={`${isActive("pendingonme") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>Pending On Me</span>}
            </div>
        </div>
        {/* sidebar for mobile screen */}
        <div className={`${isMenuOpen?"-left-96":"left-0"} z-40 w-64 bottom-0 top-0 md:hidden absolute transition-all duration-300 shadow-lg bg-white`}>
            <div onClick={()=>handleNavigate('/admin')} className={`group flex ${isActive("dashboard") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('dashboard') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><DashboardOutlinedIcon style={{fontSize:'1.5rem'}}></DashboardOutlinedIcon></span>
               <span className={`${isActive("dashboard") && "text-themeblue"} group-hover:text-themeblue font-medium text-lg`}>Dashboard</span>
            </div>
            <div onClick={()=>handleNavigate('doctors')} className={`group flex ${isActive("doctors") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('doctors') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><LocalHospitalOutlinedIcon style={{fontSize:'1.5rem'}}></LocalHospitalOutlinedIcon></span>
               <span className={`${isActive("doctors") && "text-themeblue"} group-hover:text-themeblue font-medium text-lg`}>Doctors</span>
            </div>
            <div onClick={()=>handleNavigate('chemist')} className={`group flex ${isActive("chemist") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('chemist') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><ScienceOutlinedIcon style={{fontSize:'1.5rem'}}></ScienceOutlinedIcon></span>
               <span className={`${isActive("chemist") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>Chemist</span>
            </div>
            <div onClick={()=>handleNavigate('employee')} className={`group flex ${isActive("employee") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('employee') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><PersonOutlineIcon style={{fontSize:'1.5rem'}}></PersonOutlineIcon></span>
               <span className={`${isActive("employee") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>Employee</span>
            </div>
            <div onClick={()=>handleNavigate('myleaves')} className={`group flex ${isActive("myleaves") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('myleaves') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><ExitToAppIcon style={{fontSize:'1.5rem'}}></ExitToAppIcon></span>
               <span className={`${isActive("myleaves") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>My Leaves</span>
            </div>
            <div onClick={()=>handleNavigate('pendingonme')} className={`group flex ${isActive("pendingonme") && "bg-blue-50 border-r-2 border-themeblue"} hover:bg-blue-50 py-4 cursor-pointer px-8 items-center gap-2`}>
               <span className={`${isActive('pendingonme') ? "text-themeblue" : "text-gray-700 group-hover:text-themeblue"} `}><ExitToAppIcon style={{fontSize:'1.5rem'}}></ExitToAppIcon></span>
               <span className={`${isActive("pendingonme") && "text-themeblue"} group-hover:text-themeblue font-medium  text-lg`}>Pending On Me</span>
            </div>
        </div>
        {/* Outlate */}
        <div className="w-full md:px-6 px-4 py-2 md:py-4 overflow-y-auto ">
            <Outlet></Outlet>
        </div>
      </div>

    </div>
  );
}
