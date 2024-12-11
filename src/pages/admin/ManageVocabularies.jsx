import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const ManageVocabularies = () => {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lessonFilter, setLessonFilter] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for modal visibility
  const [currentVocabulary, setCurrentVocabulary] = useState(null); // State for the current vocabulary to edit

  // Fetch vocabularies from API
  const fetchVocabularies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/vocabularies",
        {
          params: { lessonNumber: lessonFilter }, // Optional filtering based on lesson number
        }
      );
      setVocabularies(response.data);
    } catch (err) {
      toast.error("No vocabulary found");
    } finally {
      setLoading(false);
    }
  };

  // Delete a vocabulary
  const handleDeleteVocabulary = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vocabulary?"))
      return;
    try {
      await axios.delete(
        `http://localhost:5000/api/dashboard/vocabularies/delete/${id}`
      );
      toast.success("Vocabulary deleted successfully");
      fetchVocabularies();
    } catch (err) {
      toast.error("Failed to delete vocabulary");
    }
  };

  // Open and edit vocabulary modal
  const openEditModal = (vocabulary) => {
    setCurrentVocabulary(vocabulary);
    setIsEditModalOpen(true);
  };

  // Close the Edit Modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentVocabulary(null);
  };

  // Update a vocabulary
  const handleUpdateVocabulary = async (e) => {
    e.preventDefault();
    const { word, pronunciation, meaning, whenToSay, lessonNumber } =
      currentVocabulary;

    try {
      await axios.put(
        `http://localhost:5000/api/dashboard/vocabularies/update/${currentVocabulary._id}`,
        {
          word,
          pronunciation,
          meaning,
          whenToSay,
          lessonNumber: Number(lessonNumber),
        }
      );
      toast.success("Vocabulary updated successfully");
      fetchVocabularies();
      closeEditModal();
    } catch (err) {
      toast.error("Failed to update vocabulary");
    }
  };

  useEffect(() => {
    fetchVocabularies();
  }, [lessonFilter]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Vocabulary Management</h1>
      <Toaster />

      {/* Filter by Lesson Number */}
      <div className="mb-4">
        <input
          type="text"
          value={lessonFilter}
          onChange={(e) => setLessonFilter(e.target.value)}
          placeholder="Filter by Lesson No."
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>

      {/* Vocabulary List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">All Vocabularies</h2>
        {loading ? (
          <p className="text-blue-500">Loading vocabularies...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Word</th>
                  <th className="border border-gray-300 p-2">Pronunciation</th>
                  <th className="border border-gray-300 p-2">Meaning</th>
                  <th className="border border-gray-300 p-2">When to Say</th>
                  <th className="border border-gray-300 p-2">Lesson No</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vocabularies.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 p-4">
                      No vocabularies found
                    </td>
                  </tr>
                ) : (
                  vocabularies?.map((vocabulary) => (
                    <tr key={vocabulary._id}>
                      <td className="border border-gray-300 p-2">
                        {vocabulary.word}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vocabulary.pronunciation}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vocabulary.meaning}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vocabulary.whenToSay}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vocabulary.lessonNumber}
                      </td>
                      <td className="border border-gray-300 p-2 text-center flex flex-col">
                        <button
                          onClick={() => openEditModal(vocabulary)}
                          className="bg-yellow-500 text-white px-2 w-20 rounded hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteVocabulary(vocabulary._id)}
                          className="bg-red-500 text-white px-2 mt-2 w-20 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Vocabulary Modal */}
      {isEditModalOpen && currentVocabulary && (
        <div className="fixed overflow-auto inset-0 md:pt-28 pt-48 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Vocabulary</h2>
            <form onSubmit={handleUpdateVocabulary}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Word</label>
                <input
                  type="text"
                  value={currentVocabulary.word}
                  onChange={(e) =>
                    setCurrentVocabulary({
                      ...currentVocabulary,
                      word: e.target.value,
                    })
                  }
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Pronunciation
                </label>
                <input
                  type="text"
                  value={currentVocabulary.pronunciation}
                  onChange={(e) =>
                    setCurrentVocabulary({
                      ...currentVocabulary,
                      pronunciation: e.target.value,
                    })
                  }
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Meaning
                </label>
                <input
                  type="text"
                  value={currentVocabulary.meaning}
                  onChange={(e) =>
                    setCurrentVocabulary({
                      ...currentVocabulary,
                      meaning: e.target.value,
                    })
                  }
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  When to Say
                </label>
                <input
                  type="text"
                  value={currentVocabulary.whenToSay}
                  onChange={(e) =>
                    setCurrentVocabulary({
                      ...currentVocabulary,
                      whenToSay: e.target.value,
                    })
                  }
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Lesson Number
                </label>
                <input
                  type="number"
                  value={currentVocabulary.lessonNumber}
                  onChange={(e) =>
                    setCurrentVocabulary({
                      ...currentVocabulary,
                      lessonNumber: e.target.value,
                    })
                  }
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Vocabulary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVocabularies;
