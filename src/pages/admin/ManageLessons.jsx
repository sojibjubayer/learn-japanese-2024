import { useState, useEffect } from "react";
import axios from "axios";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("/api/admin/lessons", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Manage Lessons</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">Lesson Name</th>
            <th className="border px-4 py-2">Lesson Number</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td className="border px-4 py-2">{lesson.name}</td>
              <td className="border px-4 py-2">{lesson.number}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLessons;
