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
                const response = await axios.get('https://learn-japanese-backend.vercel.app/api/users/lessons');
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
        return <div className="h-screen">Loading...</div>;
    }

    return (
        <div className="mx-auto p-4 mt-5 mb-10">
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
                            <div className="text-xl font-bold text-[#4A4A4A] mt-2">
                                {lesson.lessonName}
                            </div>
                            <div className="mt-4">
                                <Link
                                    to={`/lesson/${lesson.lessonNumber}`}
                                    className="bg-[#E1BEE7] text-[#4A4A4A] py-2 px-4 rounded-lg hover:bg-[#FCE4EC] transition-colors duration-200"
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
