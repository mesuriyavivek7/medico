import React, { useEffect } from "react";
import { Navigate, RouterProvider,useNavigate, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { loginStart, loginFailure, logout } from "./redux/actions/authActions";
import axios from 'axios'

//importing General components
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

//Importing Admin dashboard components
import Dashboard from "./components/Admin/Dashboard";
import PendingLeaves from "./pages/PendingLeaves";
import MyTeam from "./pages/MyTeam";
import StourPlan from "./pages/StourPlan";
import MTP from "./pages/MTP";
import AddMtp from "./pages/AddMtp";
import PreviewEmp from "./pages/PreviewEmp";
import Report from "./pages/Report";
import PendingMtp from "./pages/PendingMtp";
import DownloadReport from "./pages/DownloadReport";

//Importing General Components
import MyDashboard from "./pages/MyDashboard";
import Doctors from "./pages/Doctors";
import AddNewDoc from "./pages/AddNewDoc";
import Chemist from "./pages/Chemist";
import ChemistMapping from "./pages/ChemistMapping";
import DoctorMapping from "./pages/DoctorMapping";
import AddNewChemist from "./pages/AddNewChemist";
import Employee from "./pages/Employee";
import AddNewEmp from "./pages/AddNewEmp";
import Profile from "./pages/Profile";
import EditEmp from "./pages/EditEmp";
import MyLeave from "./pages/MyLeave";
import AddLeave from "./pages/AddLeave";

//Importing Employee dashboard components
import EmpDashboard from "./components/Employee/EmpDashboard";
import AddStourPlan from "./pages/AddStourPlan";

// ProtectedRoute Component
const ProtectedRoute = ({ children , requiredRole }) => {
  const dispatch = useDispatch();
  const { user, api_token } = useSelector((state) => state.auth);

  //vallidate user 
  useEffect(()=>{
      const validateUser = async () =>{
         dispatch(loginStart())
         try{
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/User/verify_token`,{api_token:api_token})
         }catch(err){
           console.log(err)
           dispatch(logout())
         }
      }

      if(api_token){
        validateUser()
      }


  },[api_token,dispatch])
  

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!user.isAdmin && requiredRole==="admin") {
    console.log("you are not employee")
    return <Navigate to='/employee/dashboard'></Navigate>
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { user, api_token } = useSelector((state) => state.auth);

  //vallidate user
  useEffect(()=>{
    const validateUser = async () =>{
       dispatch(loginStart())
       try{
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/User/verify_token`,{api_token:api_token})
       }catch(err){
         console.log(err)
         dispatch(logout())
       }
    }
    validateUser()
   },[])
  

  //Set bearer token
  useEffect(()=>{
     const token = api_token
     if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     }
  },[user])

  const AppRouter = createBrowserRouter(
    [
      {
        path:'/',
        element: !user ? (
          <Login/>
        ) : (
          <Navigate to={`/${user.isAdmin?"admin":"employee"}/dashboard/`} />
        ),
      },
      {
        path:'/forget-password',
        element: !user ? (
          <ForgetPassword/>
        ) : (
          <Navigate to={`/${user.isAdmin?"admin":"employee"}/dashboard/`}/>
        )
      },
      {
        path:'/reset-password',
        element: !user ? (
          <ResetPassword/>
        ) : (
          <Navigate to={`/${user.isAdmin?"admin":"employee"}/dashboard/`}/>
        )
      },
      {
        path:'/admin',
        element:(
          <ProtectedRoute requiredRole="admin">
            <Dashboard></Dashboard>
          </ProtectedRoute>
        ),
        children:[
          {
            path:'dashboard',
            element:(
              <ProtectedRoute requiredRole="admin">
                <MyDashboard></MyDashboard>
              </ProtectedRoute>
            )
          },
          {
            path:'doctors',
            element:(
              <ProtectedRoute requiredRole="admin">
                <Doctors></Doctors>
              </ProtectedRoute>
            ),
          },
          {
            path:'doctors/addnew',
            element:(
              <ProtectedRoute requiredRole="admin">
                <AddNewDoc></AddNewDoc>
              </ProtectedRoute>
            )
          },
          {
            path:'chemists',
            element:(
              <ProtectedRoute requiredRole="admin">
                <Chemist></Chemist>
              </ProtectedRoute>
            )
          },
          {
            path:'chemists/addnew',
            element:(
              <ProtectedRoute requiredRole="admin">
                <AddNewChemist></AddNewChemist>
              </ProtectedRoute>
            )
          },
          {
            path:'employee',
            element:(
              <ProtectedRoute requiredRole="admin">
                <Employee></Employee>
              </ProtectedRoute>
            )
          },
          {
            path:'employee/addnew',
            element:(
              <ProtectedRoute requiredRole="admin">
                <AddNewEmp></AddNewEmp>
              </ProtectedRoute>
            )
          },
          {
            path:'employee/edit',
            element:(
              <ProtectedRoute requiredRole="admin">
                <EditEmp></EditEmp>
              </ProtectedRoute>
            )
          },
          {
            path:'employee/preview',
            element:(
            <ProtectedRoute requiredRole="admin">
              <PreviewEmp></PreviewEmp>
             </ProtectedRoute>
            )
          },
          {
            path:'profile',
            element:(
              <ProtectedRoute requiredRole="admin">
                <Profile></Profile>
              </ProtectedRoute>
            )
          },
          {
            path:'myleaves',
            element:(
              <ProtectedRoute requiredRole="admin">
                <MyLeave></MyLeave>
              </ProtectedRoute>
            )
          },
          {
            path:'myleaves/add',
            element:(
              <ProtectedRoute requiredRole="admin">
                <AddLeave></AddLeave>
              </ProtectedRoute>
            )
          },
          {
            path:'pendingleaves',
            element:(
              <ProtectedRoute requiredRole="admin">
                <PendingLeaves></PendingLeaves>
              </ProtectedRoute>
            )
          },
          {
            path:'myteam',
            element:(
              <ProtectedRoute requiredRole="admin">
                <MyTeam></MyTeam>
              </ProtectedRoute>
            )
          },
          {
            path:'myteam/preview',
            element:(
              <ProtectedRoute requiredRole='admin'>
                 <PreviewEmp></PreviewEmp>
              </ProtectedRoute>
            )
          },
          {
            path:'stpplan',
            element:(
              <ProtectedRoute requiredRole="admin">
                <StourPlan></StourPlan>
              </ProtectedRoute>
            )
          },
          {
            path:'stpplan/add',
            element:(
              <ProtectedRoute requiredRole="admin">
                <AddStourPlan></AddStourPlan>
              </ProtectedRoute>
            )
          },
          {
            path:'mtpplan',
            element:(
              <ProtectedRoute requiredRole="admin">
                <MTP></MTP>
              </ProtectedRoute>
            )
          },
          {
            path:'mtpplan/add',
            element:(
              <ProtectedRoute requiredRole="admin">
                <AddMtp></AddMtp>
              </ProtectedRoute>
            )
          },
          {
            path:'pendingmtp',
            element:(
              <ProtectedRoute requiredRole="admin">
                <PendingMtp></PendingMtp>
              </ProtectedRoute>
            )
          },
          {
            path:'chemistmapping',
            element:(
              <ProtectedRoute requiredRole='admin'>
                <ChemistMapping></ChemistMapping>
              </ProtectedRoute>
            )
          },
          {
            path:"doctormapping",
            element:(
              <ProtectedRoute requiredRole='admin'>
                <DoctorMapping></DoctorMapping>
              </ProtectedRoute>
            )
          },
          {
            path:"report",
            element:(
              <ProtectedRoute requiredRole='admin'>
                <Report></Report>
              </ProtectedRoute>
            )
          },
          {
            path:"download",
            element:(
              <ProtectedRoute requiredRole='admin'>
                <DownloadReport></DownloadReport>
              </ProtectedRoute>
            )
          }
        ]
      },
      {
        path:'/employee',
        element:(
          <ProtectedRoute requiredRole="employee">
            <EmpDashboard></EmpDashboard>
          </ProtectedRoute>
        ),
        children:[
          {
            path:'dashboard',
            element:(
              <ProtectedRoute requiredRole="employee" >
                <MyDashboard></MyDashboard>
              </ProtectedRoute>
            )
          },
          {
            path:'doctors',
            element:(
              <ProtectedRoute requiredRole="employee">
                <Doctors></Doctors>
              </ProtectedRoute>
            ),
          },
          {
            path:'doctors/addnew',
            element:(
              <ProtectedRoute requiredRole="employee">
                <AddNewDoc></AddNewDoc>
              </ProtectedRoute>
            )
          },
          {
            path:'chemists',
            element:(
              <ProtectedRoute requiredRole="employee">
                <Chemist></Chemist>
              </ProtectedRoute>
            )
          },
          {
            path:'chemists/addnew',
            element:(
              <ProtectedRoute requiredRole="employee">
                <AddNewChemist></AddNewChemist>
              </ProtectedRoute>
            )
          },
          {
            path:'myteam',
            element:(
              <ProtectedRoute requiredRole="employee">
                <MyTeam></MyTeam>
              </ProtectedRoute>
            )
          },
          {
            path:'myteam/addnew',
            element:(
              <ProtectedRoute requiredRole="employee">
                <AddNewEmp></AddNewEmp>
              </ProtectedRoute>
            )
          },
          {
            path:'myteam/edit',
            element:(
              <ProtectedRoute requiredRole="employee">
                <EditEmp></EditEmp>
              </ProtectedRoute>
            )
          },
          {
            path:'myteam/preview',
            element:(
            <ProtectedRoute requiredRole="employee">
              <PreviewEmp></PreviewEmp>
             </ProtectedRoute>
            )
          },
          {
            path:'profile',
            element:(
              <ProtectedRoute requiredRole="employee">
                <Profile></Profile>
              </ProtectedRoute>
            )
          },
          {
            path:'myleaves',
            element:(
              <ProtectedRoute requiredRole="employee">
                <MyLeave></MyLeave>
              </ProtectedRoute>
            )
          },
          {
            path:'myleaves/add',
            element:(
              <ProtectedRoute requiredRole="employee">
                <AddLeave></AddLeave>
              </ProtectedRoute>
            )
          },
          {
            path:'pendingleaves',
            element:(
              <ProtectedRoute requiredRole="employee">
                <PendingLeaves></PendingLeaves>
              </ProtectedRoute>
            )
          },
          {
            path:'mtpplan',
            element:(
              <ProtectedRoute requiredRole="employee">
                <MTP></MTP>
              </ProtectedRoute>
            )
          },
          {
            path:'mtpplan/add',
            element:(
              <ProtectedRoute requiredRole="employee">
                <AddMtp></AddMtp>
              </ProtectedRoute>
            )
          },
          {
            path:'pendingmtp',
            element:(
              <ProtectedRoute requiredRole="employee">
                <PendingMtp></PendingMtp>
              </ProtectedRoute>
            )
          },
          {
            path:"download",
            element:(
              <ProtectedRoute requiredRole='employee'>
                <DownloadReport></DownloadReport>
              </ProtectedRoute>
            )
          }
        ]
      }
    ]
  )
  return (
    <div className="max-w-[100vw] max-h-screen">
       <ToastContainer></ToastContainer>
       <RouterProvider router={AppRouter}></RouterProvider>
     </div>

  );
}

export default App;
