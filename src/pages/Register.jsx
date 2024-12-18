import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d).{6,}$/; // Must be at least 6 characters and include at least one number
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const imageFile = e.target.image.files[0];
    const role = 'user'; // Default role

    // Check password validity
    if (!validatePassword(password)) {
      toast.error('Password must be at least 6 characters long and include at least one number.');
      return;
    }

    if (!imageFile) {
      toast.error('Please upload a profile photo.');
      return;
    }

    setLoading(true); 

    try {
      // Upload image to image hosting service
      const formData = new FormData();
      formData.append('image', imageFile);

      const imgResponse = await fetch(imageHostingApi, {
        method: 'POST',
        body: formData,
      });

      const imgResult = await imgResponse.json();

      if (!imgResponse.ok || !imgResult.success) {
        throw new Error('Image upload failed.');
      }

      const photoUrl = imgResult.data.url; // Extract uploaded image URL

      
      const userData = {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        photoUrl,
        password,
        role,
      };

      // Register the user
      const response = await fetch('https://learn-japanese-backend.vercel.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed.');
      }

      toast.success('Congrats! Successfully Registered.');
      e.target.reset(); 
      setTimeout(() => navigate('/login'), 1000); 
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred during registration.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="md:w-[40%] max-w-md w-[95%] p-8 bg-white rounded shadow-lg">
        <h2 className="font-bold text-center text-[#4A4A4A] text-xl">Registration</h2>

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

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              name="image"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              accept="image/*"
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
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-[#4A4A4A] bg-[#FCE4EC] hover:bg-[#e6bdca] rounded-md"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Register'}
            </button>
          </div>

          <div className="text-center text-sm">
            <p>
              Already Registered?{' '}
              <Link to="/login" className="text-blue-600 ml-2">
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Register;
