import React, { useEffect, useState } from 'react';

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tutorials from the database
    const fetchTutorials = async () => {
        try {
            const response = await fetch('https://learn-japanese-backend.vercel.app/api/getTutorials');
            const result = await response.json();
            if (response.ok) {
                setTutorials(result.tutorials);
            } else {
                setError(result.message || 'Failed to fetch tutorials.');
            }
        } catch (err) {
            setError('Error fetching tutorials.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTutorials();
    }, []);

    if (loading) {
        return <div className="mt-2 h-screen">Loading tutorials...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="md:text-3xl text-xl font-bold text-center mb-6">
                    Japanese Language Learning Tutorials
                </h1>
                <p className="text-center text-gray-600 mb-10">
                    Watch these videos to enhance your Japanese language skills.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
                    {tutorials?.map((tutorial) => (
                        <div key={tutorial._id} className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={tutorial.link}
                                title={tutorial.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg shadow-md"
                            ></iframe>
                            <p className="text-center text-gray-700 mt-2 font-medium">{tutorial.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tutorials;
