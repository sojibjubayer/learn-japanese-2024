import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({}); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include', // Include credentials for cookie-based authentication
      });

      if (response.ok) {
        const data = await response.json();       

        if (data.token) { 
          localStorage.setItem('token', data.token);
          

          toast.success('Successfully Logged In!');
          

          
          if (data.role === 'admin') {
            navigate('/dashboard');
          } else if (data.role === 'user') {
            navigate('/lessons');
          } else {
            navigate('/login'); 
          }
        } else {
          setErrorMessage('Token missing in response.');
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center bg-gray-100">
      

      <div className="md:w-[40%] max-w-md w-[95%]  p-8 bg-white rounded shadow-lg my-4">
        <h2 className="font-bold text-center text-[#006A67] text-2xl mb-6">Login</h2>
        <h2 className=" text-center text-[#006A67] text-base mb-10">Please login to learn japanese.</h2>
       
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errorMessage && (
              <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-gray-50 bg-[#DA9E94]"
              disabled={loading} 
            >
              {loading ? 'Logging in...' : 'Submit'} 
            </button>
          </div>
          <div className='text-center text-sm'>
            <p>New Here ?  <Link to="/register" className='text-blue-600 ml-5'>Register here</Link> </p>
          </div>
        </form>
      
      </div>
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
