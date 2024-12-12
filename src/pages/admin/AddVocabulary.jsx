import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import toast, { Toaster } from 'react-hot-toast';

const AddVocabulary = () => {
  const [word, setWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [meaning, setMeaning] = useState('');
  const [whenToSay, setWhenToSay] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
    if (!word || !pronunciation || !meaning || !whenToSay || !lessonNumber) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!adminEmail) {
      setErrorMessage('Admin email is required.');
      return;
    }

    try {
      setErrorMessage('');

      const response = await fetch('https://learn-japanese-backend.vercel.app/api/dashboard/add-vocabulary', {
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
        toast.success('Vocabulary added successfully!');
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
    <div className="w-[95%] md:w-[70%] mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md my-4 sm:my-6 md:my-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">
        Add New Vocabulary
      </h2>
      {errorMessage && <p className="text-red-500 mb-2 text-sm sm:text-base">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="word" className="block font-medium text-gray-700 text-sm sm:text-base">
            Word
          </label>
          <input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-1 block w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-sm sm:text-base"
            placeholder="Enter Japanese word"
          />
        </div>
        <div>
          <label htmlFor="pronunciation" className="block font-medium text-gray-700 text-sm sm:text-base">
            Pronunciation
          </label>
          <input
            id="pronunciation"
            type="text"
            value={pronunciation}
            onChange={(e) => setPronunciation(e.target.value)}
            className="mt-1 block w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-sm sm:text-base"
            placeholder="Enter pronunciation"
          />
        </div>
        <div>
          <label htmlFor="meaning" className="block font-medium text-gray-700 text-sm sm:text-base">
            Meaning
          </label>
          <input
            id="meaning"
            type="text"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            className="mt-1 block w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-sm sm:text-base"
            placeholder="Enter meaning"
          />
        </div>
        <div>
          <label htmlFor="whenToSay" className="block font-medium text-gray-700 text-sm sm:text-base">
            When to Say
          </label>
          <textarea
            id="whenToSay"
            value={whenToSay}
            onChange={(e) => setWhenToSay(e.target.value)}
            className="mt-1 block w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-sm sm:text-base"
            placeholder="Describe when to use this word"
          />
        </div>
        <div>
          <label htmlFor="lessonNumber" className="block font-medium text-gray-700 text-sm sm:text-base">
            Lesson Number
          </label>
          <input
            id="lessonNumber"
            type="number"
            value={lessonNumber}
            onChange={(e) => setLessonNumber(e.target.value)}
            className="mt-1 block w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-sm sm:text-base"
            placeholder="Enter lesson number"
          />
        </div>
        <div>
          <label htmlFor="adminEmail" className="block font-medium text-gray-700 text-sm sm:text-base">
            Admin Email
          </label>
          <input
            id="adminEmail"
            type="text"
            value={adminEmail}
            className="mt-1 block w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-sm sm:text-base"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#925892] text-white py-2 px-4 rounded-md text-sm sm:text-base md:text-lg hover:bg-[#494A8A] focus:ring focus:ring-blue-300"
        >
          Add Vocabulary
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddVocabulary;
