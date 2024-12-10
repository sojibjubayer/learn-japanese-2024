import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
 

  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = e.target.name.value; 
    const email = e.target.email.value; 
    const imageFile = e.target.image.files[0]; // Get the uploaded file
    const password = e.target.password.value;
  
    setLoading(true); // Set loading state to true
  
    try {
      // Step 1: Upload image to ImgBB
      const formData = new FormData();
      formData.append('image', imageFile); // Append the image file
  
      const imgResponse = await fetch(image_hosting_api, {
        method: 'POST',
        body: formData,
      });
  
      const imgResult = await imgResponse.json();
  
      if (!imgResponse.ok || !imgResult.success) {
        toast.error('Failed to upload image. Please try again.');
        return;
      }
  
      const photoUrl = imgResult.data.url; // Get the URL of the uploaded image
  
      // Step 2: Send form data to backend
      const data = {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        photoUrl, // Use the uploaded image URL
        password,
      };
  
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
        return;
      }
  
      const result = await response.json();
      if (result.insertedId) {
        toast.success('Congrats! Successfully Registered.');
        e.target.reset(); // Reset the form
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  


  return (
    <div className=" flex items-center justify-center bg-gray-100">
    
 
      <div className=" md:w-[40%] max-w-md w-[95%] p-8 bg-white rounded shadow-lg my-4">
        
        <h2 className="font-bold text-center text-[#006A67] text-xl"> Regitration </h2>
       
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email "
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              name="image"
              placeholder=""
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder=""

              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-[#FFF4B7] bg-[#006A67]"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Processing registration...' : 'Submit'} {/* Conditional text */}
            </button>
          </div>

          <div className='text-center text-sm'>
            <p>Already Registered? <br />   <Link to="/login" className='text-blue-600'>Login Here </Link>  </p>
          </div>
        </form>
      </div>
      
      <Toaster position="top-center" reverseOrder={false} className="text-sm" />
    </div>
  );
};

export default Register;
