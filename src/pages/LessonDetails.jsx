import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";

const LessonDetails = () => {
    const { lessonNo } = useParams();
    const [lessonData, setLessonData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessonData = async () => {
            const response = await fetch(`http://localhost:5000/api/vocabularies/${lessonNo}`);
            const data = await response.json();
            setLessonData(data);
        };

        if (lessonNo) {
            fetchLessonData();
        }
    }, [lessonNo]);

    const goToNextVocabulary = () => {
        if (lessonData && currentIndex < lessonData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPreviousVocabulary = () => {
        if (lessonData && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleCompletion = () => {
        setIsComplete(true);
        setTimeout(() => {
            navigate('/lessons');
        }, 3000);
    };

    const playPronunciation = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP'; // Japanese language code
        speechSynthesis.speak(utterance);
    };

    if (!lessonData || lessonData.length === 0) {
        return <div>Loading...</div>;
    }

    const currentLesson = lessonData[currentIndex];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {isComplete && <Confetti />}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-semibold text-center mb-6">{currentLesson.word}</h1>

                <div className="flex flex-col items-center space-y-6">
                    <div className="text-lg font-medium">Vocabulary:</div>
                    <div className="bg-gray-100 p-4 rounded-md shadow-md w-full md:w-3/4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{currentLesson.word}</h2>
                            <button
                                className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600"
                                onClick={() => playPronunciation(currentLesson.pronunciation)}
                                aria-label="Play pronunciation"
                            >
                                {/* Play Icon */}
                                <FaPlay />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600">Pronunciation: {currentLesson.pronunciation}</p>
                        <p className="mt-2">{currentLesson.meaning}</p>
                        <p className="mt-2 text-sm text-gray-500">{currentLesson.whenToSay}</p>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600"
                            onClick={goToPreviousVocabulary}
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600"
                            onClick={goToNextVocabulary}
                            disabled={currentIndex === lessonData.length - 1}
                        >
                            Next
                        </button>
                    </div>

                    {currentIndex === lessonData.length - 1 && (
                        <div className="mt-4">
                            <button
                                className="bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600"
                                onClick={handleCompletion}
                            >
                                Complete Lesson
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonDetails;
