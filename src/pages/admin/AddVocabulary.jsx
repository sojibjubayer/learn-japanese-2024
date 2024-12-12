import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode

const AddVocabulary = () => {
  const [word, setWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [meaning, setMeaning] = useState('');
  const [whenToSay, setWhenToSay] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAdminEmail(decodedToken.email); 
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!word || !pronunciation || !meaning || !whenToSay || !lessonNumber) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return;
    }

    if (!adminEmail) {
      setErrorMessage('Admin email is required.');
      setSuccessMessage('');
      return;
    }

    try {
      setErrorMessage('');
      setSuccessMessage('');

   
      const response = await fetch('http://localhost:5000/api/dashboard/add-vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word,
          pronunciation,
          meaning,
          whenToSay,
          lessonNumber: Number(lessonNumber),
          adminEmail, 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('Vocabulary added successfully!');
        setWord('');
        setPronunciation('');
        setMeaning('');
        setWhenToSay('');
        setLessonNumber('');
      } else {
        setErrorMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Vocabulary</h2>
      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="word" className="block font-medium text-gray-700">
            Word
          </label>
          <input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            placeholder="Enter Japanese word"
          />
        </div>
        <div>
          <label htmlFor="pronunciation" className="block font-medium text-gray-700">
            Pronunciation
          </label>
          <input
            id="pronunciation"
            type="text"
            value={pronunciation}
            onChange={(e) => setPronunciation(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            placeholder="Enter pronunciation"
          />
        </div>
        <div>
          <label htmlFor="meaning" className="block font-medium text-gray-700">
            Meaning
          </label>
          <input
            id="meaning"
            type="text"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            placeholder="Enter meaning"
          />
        </div>
        <div>
          <label htmlFor="whenToSay" className="block font-medium text-gray-700">
            When to Say
          </label>
          <textarea
            id="whenToSay"
            value={whenToSay}
            onChange={(e) => setWhenToSay(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            placeholder="Describe when to use this word"
          />
        </div>
        <div>
          <label htmlFor="lessonNumber" className="block font-medium text-gray-700">
            Lesson Number
          </label>
          <input
            id="lessonNumber"
            type="number"
            value={lessonNumber}
            onChange={(e) => setLessonNumber(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            placeholder="Enter lesson number"
          />
        </div>
        
        <div>
          <label htmlFor="adminEmail" className="block font-medium text-gray-700">
            Admin Email
          </label>
          <input
            id="adminEmail"
            type="text"
            value={adminEmail}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Add Vocabulary
        </button>
      </form>
    </div>
  );
};

export default AddVocabulary;
