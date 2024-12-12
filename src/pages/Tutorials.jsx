import React from 'react';



const Tutorials = () => {
    

    const videos = [
        'https://www.youtube.com/embed/EwJgubX_J4k?si=FwhHBbc6KueKhl88',
        'https://www.youtube.com/embed/rGrBHiuPlT0?si=UT70EUIO94ZNpwb9',
        'https://www.youtube.com/embed/MYiEcPEZS2U?si=E7AGZoYNSv1j_dQo',
        'https://www.youtube.com/embed/BvH7T5vKTlc?si=nqdsqoatZIWwXPuY',
        'https://www.youtube.com/embed/y53Y1QFAWX4?si=izU22BNi9neP1FT0',
        'https://www.youtube.com/embed/zORSDJVTpzg?si=w4yugI3OcWSzSfQB',
        'https://www.youtube.com/embed/JYEutL_zQQc?si=E5EJldtbcSCP29BK',
        'https://www.youtube.com/embed/hVOvyR3fSrU?si=UEuAu1l6roa0YgVE',
        'https://www.youtube.com/embed/PfZf8D6MVzo?si=pVeT5yE1Cy7ZGx0o',
        
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Japanese Language Learning Tutorials
                </h1>
                <p className="text-center text-gray-600 mb-10">
                    Watch these videos to enhance your Japanese language skills.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <div key={index} className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={video}
                                title={`Tutorial Video ${index + 1}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-lg shadow-md"
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tutorials;
