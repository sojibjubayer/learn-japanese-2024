import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const LessonManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonData, setLessonData] = useState({
    lessonNumber: '',
    lessonName: '',
  });

  // Fetch lessons from API
  const fetchLessons = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/lessons');
      const { rawLessons, lessonsWithVocabularyCounts } = response.data;

      // Merge rawLessons and lessonsWithVocabularyCounts
      const mergedLessons = rawLessons.map((rawLesson) => {
        const vocabData = lessonsWithVocabularyCounts.find(
          (lesson) => lesson.lessonNumber === rawLesson.lessonNumber
        );
        return {
          ...rawLesson,
          vocabularyCount: vocabData ? vocabData.vocabularyCount : 0,
        };
      });

      setLessons(mergedLessons);
    } catch (err) {
      setError('Failed to load lessons. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a lesson
  const deleteLesson = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/lessons/delete/${id}`);
      fetchLessons(); // Refresh lessons after deletion
      toast.success('Lesson deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete lesson. Please try again.');
    }
  };

  // Open edit modal and set current lesson data
  const editLesson = (lesson) => {
    setLessonData({
      lessonNumber: lesson.lessonNumber,
      lessonName: lesson.lessonName,
    });
    setCurrentLesson(lesson);
    setEditMode(true);
  };

  // Update a lesson
  const updateLesson = async () => {
    try {
      await axios.put(`http://localhost:5000/api/lessons/update/${currentLesson._id}`, lessonData);
      fetchLessons(); // Refresh lessons after update
      toast.success('Lesson updated successfully!');
      setEditMode(false); // Close edit modal
    } catch (err) {
      toast.error('Failed to update lesson. Please try again.');
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Lesson Management</h1>

      {loading && <p className="text-blue-500">Loading lessons...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Lessons List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">All Lessons</h2>
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Lesson Number</th>
                <th className="border border-gray-300 p-2">Lesson Name</th>
                <th className="border border-gray-300 p-2">Vocabulary Count</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons?.map((lesson) => (
                <tr key={lesson.lessonNumber}>
                  <td className="border border-gray-300 p-2 text-center text-black">{lesson.lessonNumber}</td>
                  <td className="border border-gray-300 p-2">{lesson.lessonName}</td>
                  <td className="border border-gray-300 p-2 text-center">{lesson.vocabularyCount}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => editLesson(lesson)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteLesson(lesson._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Lesson</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Lesson Number</label>
              <input
                type="text"
                value={lessonData.lessonNumber}
                onChange={(e) => setLessonData({ ...lessonData, lessonNumber: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Lesson Name</label>
              <input
                type="text"
                value={lessonData.lessonName}
                onChange={(e) => setLessonData({ ...lessonData, lessonName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={updateLesson}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default LessonManagement;
