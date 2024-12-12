import React, { useState } from 'react';

const AddLesson = () => {
  const [lessonName, setLessonName] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lessonName || !lessonNumber) {
      setErrorMessage('Both fields are required.');
      setSuccessMessage('');
      return;
    }

    try {
      setErrorMessage('');
      setSuccessMessage('');

      const response = await fetch('https://learn-japanese-backend.vercel.app/api/dashboard/add-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonName, lessonNumber: Number(lessonNumber) }),
      });

      const data = await response.json();

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
    <div className="w-[95%] sm:w-[80%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-4 sm:mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Add New Lesson
      </h2>
      {errorMessage && (
        <p className="text-red-500 mb-2 text-sm sm:text-base">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 mb-2 text-sm sm:text-base">
          {successMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="lessonName"
            className="block font-medium text-gray-700 text-sm sm:text-base"
          >
            Lesson Name
          </label>
          <input
            id="lessonName"
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            className="mt-1 block w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-sm sm:text-base"
            placeholder="Enter lesson name"
          />
        </div>
        <div>
          <label
            htmlFor="lessonNumber"
            className="block font-medium text-gray-700 text-sm sm:text-base"
          >
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
        <button
          type="submit"
          className="w-full bg-[#925892] text-white py-2 px-4 rounded-md text-sm sm:text-base hover:bg-[#494A8A] focus:ring focus:ring-blue-300"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
