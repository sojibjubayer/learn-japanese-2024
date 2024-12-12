import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-[#FCE4EC] text-[#4A4A4A] py-6'>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>About</h3>
                        <p className='text-sm'>
                            Learn Japanese effectively with our curated lessons, practice tools, and tutorials.
                        </p>
                    </div>
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
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Contact</h3>
                        <ul className='space-y-2'>
                            <li>Email: support@learnjp.com</li>
                            <li>Phone: +81 123-456-7890</li>
                        </ul>
                    </div>

                    <div className='hidden lg:block'>
                        <h3 className='text-lg font-semibold mb-4'>Resources</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link to="#" className='hover:underline'>
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className='hover:underline'>
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='mt-6 text-center text-sm border-t border-white/20 pt-4'>
                    © {new Date().getFullYear()} Japanese Language Learn. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
