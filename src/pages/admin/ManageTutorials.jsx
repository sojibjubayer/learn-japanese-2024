import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ManageTutorials = () => {
  const [tutorials, setTutorials] = useState([]); // Store the tutorials
  const [newTitle, setNewTitle] = useState(''); // Store the new tutorial title
  const [newLink, setNewLink] = useState(''); // Store the new YouTube embed link
  const [loading, setLoading] = useState(false);

  // Fetch all tutorials from the server
  const fetchTutorials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getTutorials');
      const result = await response.json();
      if (response.ok) {
        setTutorials(result.tutorials);
      } 
      else {
        toast.error(result.message || 'Failed to fetch tutorials.');
      }
    } catch (error) {
      toast.error('Error fetching tutorials.');
    }
  };

  useEffect(() => {
    fetchTutorials(); // Fetch tutorials on page load
  }, []);

  // Add new tutorial
  const handleAddTutorial = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLink.startsWith('https://www.youtube.com/embed/')) {
      toast.error('Please provide a valid title and YouTube embed link.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/postTutorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, link: newLink }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Tutorial added successfully!');
        setNewTitle('');
        setNewLink('');
        fetchTutorials(); // Refresh the tutorial list
      } else {
        toast.error(result.message || 'Failed to add tutorial.');
      }
    } catch (error) {
      toast.error('Error adding tutorial.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a tutorial
  const handleDeleteTutorial = async (id) => {
    if (window.confirm('Are you sure you want to delete this tutorial?')) {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:5000/api/deleteTutorial/${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();
        if (response.ok) {
          toast.success('Tutorial deleted successfully!');
          fetchTutorials(); // Refresh the tutorial list
        } else {
          toast.error(result.message || 'Failed to delete tutorial.');
        }
      } catch (error) {
        toast.error('Error deleting tutorial.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[95%] md:w-[70%] mx-auto p-6 bg-gray-200 my-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Tutorial Management</h2>

      <form onSubmit={handleAddTutorial} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter tutorial title"
            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">YouTube Embed Link</label>
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter YouTube embed link (e.g., https://www.youtube.com/embed/video_id)"
            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-[#925892] text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Tutorial'}
        </button>
      </form>

      <div className="tutorials-list bg-gray-50 p-2">
        <h3 className="text-lg font-medium text-gray-700">Added Tutorials</h3>
        {tutorials?.length === 0 ? (
          <p>No tutorials added yet.</p>
        ) : (
          <ul className="space-y-2">
            {tutorials?.map((tutorial) => (
              <li
                key={tutorial._id}
                className="flex justify-between items-center p-2 border rounded-md"
              >
                <span className="text-gray-700">{tutorial.title}</span>
                <button
                  onClick={() => handleDeleteTutorial(tutorial._id)}
                  className="text-white bg-red-400 px-2 py-1 hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ManageTutorials;
