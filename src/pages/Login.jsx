import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const navigate = useNavigate();

 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.name.value;


    const user={email,password}
   

    setLoading(true); // Set loading to true
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user
        }),
        credentials: 'include', 
      });

      if (response.ok) {
        toast.success('Successfully Loggedin');
        const data = await response.json();
        
        localStorage.setItem('token', data.token); 

        setTimeout(() => {
          setLoading(false); 
          navigate('/');
        }, 1500);
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
      

      <div className="md:w-[40%] max-w-md w-[95%] p-8 bg-white rounded shadow-lg my-4">
        <h2 className="font-bold text-center text-[#006A67] text-xl">Login</h2>
       
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
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
              className="w-full px-4 py-2 text-[#FFF4B7] bg-[#006A67]"
              disabled={loading} 
            >
              {loading ? 'Logging in...' : 'Submit'} 
            </button>
          </div>
          <div className='text-center text-sm'>
            <p>Registerd? <br /> <Link to="/register" className='text-blue-600'>register here</Link> </p>
          </div>
        </form>
      </div>
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
