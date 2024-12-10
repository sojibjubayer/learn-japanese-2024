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
import AdminRoute from "./AdminRoute";





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
      //   {
      //     path: '/dashboard',
      //     element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
      // }, 
      
        
        
        
      ]
    },
    //ADMIN DASHBOARD
    {
      path: '/dashboard',
      element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
      children: [
        //normal user routes
        // {
        //   path:'userHome',
        //   element:<PrivateRoute><UserHome></UserHome></PrivateRoute>

        // },
       
      ]
    }

   
  ]);