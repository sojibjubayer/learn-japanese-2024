import {
    createBrowserRouter,
  } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import NotFound from "../pages/NotFound";
import Lessons from "../pages/Lessons";
import Register from "../pages/Register";
import Login from "../pages/Login";





export const router=createBrowserRouter([
    {
      path: "/",
      element: <UserLayout></UserLayout>,
      errorElement:<NotFound></NotFound>,
      children: [
        {
            path: '/',
            element: <Lessons></Lessons>
        }, 
        {
            path: '/register',
            element: <Register></Register>
        }, 
      
        {
            path: '/login',
            element: <Login></Login>
        }, 
      
        
        
        
      ]
    },

   
  ]);