import React, { useEffect } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { loginStart, loginFailure } from "./redux/actions/authActions";
import axios from 'axios'

//importing General components
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

//Importing dashboard components
import Dashboard from "./components/Dashboard";
import MyDashboard from "./pages/MyDashboard";
import Doctors from "./pages/Doctors";
import AddNewDoc from "./pages/AddNewDoc";
import Chemist from "./pages/Chemist";
import AddNewChemist from "./pages/AddNewChemist";
import Employee from "./pages/Employee";
import AddNewEmp from "./pages/AddNewEmp";
import Profile from "./pages/Profile";
import EditEmp from "./pages/EditEmp";
import Leave from "./pages/Leave";
import AddLeave from "./pages/AddLeave";

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Set bearer token
  useEffect(()=>{
     const token = user?.api_token
     if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     }
  },[user])

  //vallidate user 
  useEffect(()=>{
    const validateUser = async () =>{
       dispatch(loginStart())
       try{
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/User/verify_token`,{api_token:user.api_token})
       }catch(err){
         console.log(err)
         dispatch(loginFailure("Validation failed"))
       }
    }
    validateUser()
  },[dispatch])

  const AppRouter = createBrowserRouter(
    [
      {
        path:'/',
        element: !user ? (
          <Login/>
        ) : (
          <Navigate to="/admin/dashboard"/>
        ),
      },
      {
        path:'/forget-password',
        element: !user ? (
          <ForgetPassword/>
        ) : (
          <Navigate to="/admin/dashboard"/>
        )
      },
      {
        path:'/reset-password',
        element: !user ? (
          <ResetPassword/>
        ) : (
          <Navigate to="/admin/dashboard"/>
        )
      },
      {
        path:'/admin',
        element:(
          <ProtectedRoute>
            <Dashboard></Dashboard>
          </ProtectedRoute>
        ),
        children:[
          {
            path:'dashboard',
            element:(
              <ProtectedRoute>
                <MyDashboard></MyDashboard>
              </ProtectedRoute>
            )
          },
          {
            path:'doctors',
            element:(
              <ProtectedRoute>
                <Doctors></Doctors>
              </ProtectedRoute>
            ),
          },
          {
            path:'doctors/addnew',
            element:(
              <ProtectedRoute>
                <AddNewDoc></AddNewDoc>
              </ProtectedRoute>
            )
          },
          {
            path:'chemist',
            element:(
              <ProtectedRoute>
                <Chemist></Chemist>
              </ProtectedRoute>
            )
          },
          {
            path:'chemist/addnew',
            element:(
              <ProtectedRoute>
                <AddNewChemist></AddNewChemist>
              </ProtectedRoute>
            )
          },
          {
            path:'employee',
            element:(
              <ProtectedRoute>
                <Employee></Employee>
              </ProtectedRoute>
            )
          },
          {
            path:'employee/addnew',
            element:(
              <ProtectedRoute>
                <AddNewEmp></AddNewEmp>
              </ProtectedRoute>
            )
          },
          {
            path:'employee/edit',
            element:(
              <ProtectedRoute>
                <EditEmp></EditEmp>
              </ProtectedRoute>
            )
          },
          {
            path:'profile',
            element:(
              <ProtectedRoute>
                <Profile></Profile>
              </ProtectedRoute>
            )
          },
          {
            path:'leaves',
            element:(
              <ProtectedRoute>
                <Leave></Leave>
              </ProtectedRoute>
            )
          },
          {
            path:'leaves/add',
            element:(
              <ProtectedRoute>
                <AddLeave></AddLeave>
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
