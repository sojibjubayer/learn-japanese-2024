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
        console.log(data);

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

  // Check for existing token and retrieve user role upon component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Fetch user data based on token (if your backend supports it)
//       fetch('http://localhost:5000/api/user-data', { // Replace with your user data endpoint
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.user) { // Check for user data presence
//             setUser(data.user);
//             // Redirect to appropriate dashboard or other page based on user role
//             if (user === 'admin') {
//               navigate('/admin-dashboard');
//             } else if (user === 'user') {
//               navigate('/lessons');
//             }
//           }
//         })
//         .catch((error) => console.error('Error fetching user data:', error));
//     }
//   }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      

      <div className="md:w-[40%] max-w-md w-[95%] p-8 bg-white rounded shadow-lg my-4">
        <h2 className="font-bold text-center text-[#006A67] text-xl">Login</h2>
       
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
              className="w-full px-4 py-2 text-[#FFF4B7] bg-[#006A67]"
              disabled={loading} 
            >
              {loading ? 'Logging in...' : 'Submit'} 
            </button>
          </div>
          <div className='text-center text-sm'>
            <p>New Here ?  <Link to="/register" className='text-blue-600'>Register here</Link> </p>
          </div>
        </form>
      
      </div>
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
