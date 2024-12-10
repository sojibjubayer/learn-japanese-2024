import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-[#032F30] text-white py-6'>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {/* About Section */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>About</h3>
                        <p className='text-sm'>
                            Learn Japanese effectively with our curated lessons, practice tools, and tutorials.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link to="/lessons" className='hover:underline'>
                                    Lessons
                                </Link>
                            </li>
                            <li>
                                <Link to="/tutorials" className='hover:underline'>
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link to="/vocabulary" className='hover:underline'>
                                    Vocabulary
                                </Link>
                            </li>
                            <li>
                                <Link to="/grammar" className='hover:underline'>
                                    Grammar
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Contact</h3>
                        <ul className='space-y-2'>
                            <li>Email: support@japaneselanguagelearn.com</li>
                            <li>Phone: +81 123-456-7890</li>
                            <li>
                                <Link to="/contact" className='hover:underline'>
                                    Contact Form
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className='mt-6 text-center text-sm border-t border-white/20 pt-4'>
                    © {new Date().getFullYear()} Japanese Language Learn. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
