import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

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

function App() {
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
        element:<Dashboard></Dashboard>,
        children:[
          {
            path:'dashboard',
            element:<MyDashboard></MyDashboard>
          },
          {
            path:'doctors',
            element:<Doctors></Doctors>,
          },
          {
            path:'doctors/addnew',
            element:<AddNewDoc></AddNewDoc>
          },
          {
            path:'chemist',
            element:<Chemist></Chemist>
          },
          {
            path:'chemist/addnew',
            element:<AddNewChemist></AddNewChemist>
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
