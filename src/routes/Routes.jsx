import {
    createBrowserRouter,
  } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import NotFound from "../pages/NotFound";
import Lessons from "../pages/Lessons";





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
      
        
        
        
      ]
    },

   
  ]);