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
import AddLesson from "../pages/admin/AddLesson";
import AddVocabulary from "../pages/admin/AddVocabulary";
import ManageUsers from "../pages/admin/ManageUsers";
import LessonManagement from "../pages/admin/LessonManagement";
import ManageVocabularies from "../pages/admin/ManageVocabularies";
import LessonDetails from "../pages/LessonDetails";
import ManageTutorials from "../pages/admin/ManageTutorials";


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
        //FOR USERS
        {
            path: '/lesson/:lessonNo',
            element: <UserRoute><LessonDetails></LessonDetails></UserRoute>
        }, 
        

       
        
        
      ]
    },
    //ADMIN DASHBOARD
    {
      path: '/dashboard',
      element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
      children: [
        
        {
          path:'add-lesson',
          element:<AdminRoute><AddLesson></AddLesson></AdminRoute>
        },
        {
          path:'add-vocabulary',
          element:<AdminRoute><AddVocabulary></AddVocabulary></AdminRoute>
        },
        {
          path:'manage-users',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'manage-lessons',
          element:<AdminRoute><LessonManagement></LessonManagement></AdminRoute>
        },
        {
          path:'manage-vocabularies',
          element:<AdminRoute><ManageVocabularies></ManageVocabularies></AdminRoute>
        },
        {
          path:'manage-tutorials',
          element:<AdminRoute><ManageTutorials></ManageTutorials></AdminRoute>
        },
       
      ]
    }

   
  ]);