import React, { useEffect } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "./redux/actions/authActions";
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

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //vallidate user 
  useEffect(()=>{
    const validateUser = async () =>{
       dispatch(loginStart())
       try{
         const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/verify_token`,{api_token:user.api_tokn})
         dispatch(loginSuccess(response.data))
       }catch(err){
         console.log(err)
         dispatch(loginFailure("Validation failed"))
       }
    }
  },[dispatch])

  const AppRouter = createBrowserRouter(
    [
      {
        path:'/',
        element: <Login></Login>,
      },
      {
        path:'/forget-password',
        element:<ForgetPassword></ForgetPassword>
      },
      {
        path:'/reset-password',
        element:<ResetPassword></ResetPassword>
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
            path:'profile',
            element:(
              <ProtectedRoute>
                <Profile></Profile>
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
