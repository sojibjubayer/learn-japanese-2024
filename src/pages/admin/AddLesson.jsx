import React, { useState } from 'react';

const AddLesson = () => {
  const [lessonName, setLessonName] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!lessonName || !lessonNumber) {
      setErrorMessage('Both fields are required.');
      setSuccessMessage('');
      return;
    }

    try {
      // Reset messages
      setErrorMessage('');
      setSuccessMessage('');

      // Make the API request
      const response = await fetch('http://localhost:5000/api/dashboard/add-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonName, lessonNumber: Number(lessonNumber) }),
      });

      const data = await response.json();

      // Handle success and error responses
      if (response.ok && data.success) {
        setSuccessMessage('Lesson added successfully!');
        setLessonName('');
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
      <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="lessonName" className="block font-medium text-gray-700">
            Lesson Name
          </label>
          <input
            id="lessonName"
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            placeholder="Enter lesson name"
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;