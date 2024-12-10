import {
    createBrowserRouter,
  } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import NotFound from "../pages/NotFound";
import Lessons from "../pages/Lessons";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserRoute from "./UserRoute";
import Tutorials from "../pages/Tutorials";
import AdminDashboard from "../pages/admin/AdminDashboard";





export const router=createBrowserRouter([
    {
      path: "/",
      element: <UserLayout></UserLayout>,
      errorElement:<NotFound></NotFound>,
      children: [
        {
            path: '/',
            element: <UserRoute><Lessons></Lessons></UserRoute>
        }, 
        {
            path: '/lessons',
            element: <UserRoute><Lessons></Lessons></UserRoute>
        }, 
        {
            path: '/tutorials',
            element: <UserRoute><Tutorials></Tutorials></UserRoute>
        }, 
        {
            path: '/register',
            element: <Register></Register>
        }, 
      
        {
            path: '/login',
            element: <Login></Login>
        }, 

        //AdminPart
        {
          path: '/dashboard',
          element: <AdminDashboard></AdminDashboard>
      }, 
      
        
        
        
      ]
    },

   
  ]);