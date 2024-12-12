import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Lessons = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/lessons');
                setLessons(response.data || []);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch lessons. Please try again later.');
                setLessons([]);
                setLoading(false);
            }
        };
        fetchLessons();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lessons</h1>
            {lessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons.map((lesson) => (
                        <div
                            key={lesson._id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="text-lg font-semibold text-gray-800">
                                Lesson No: {lesson.lessonNumber}
                            </div>
                            <div className="text-xl font-bold text-gray-900 mt-2">
                                {lesson.lessonName}
                            </div>
                            <div className="mt-4">
                                <Link
                                    to={`/lesson/${lesson.lessonNumber}`}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Start Lesson
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No lessons available.</p>
            )}
        </div>
    );
};

export default Lessons;
