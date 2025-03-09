"use client";
import React from 'react'
import PopupComponent from '@/components/ai_input_form';
import { useState } from 'react';


const page = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='overflow-scroll overflow-x-hidden'>
            <nav className='flex justify-between items-center p-4 sticky top-0'>
                <div className=''>
                    <p>hi</p>
                </div>
                <div>
                    <ul className='flex justify-center items-center gap-6'>
                        <li>Home</li>
                        <li>Log Out</li>
                        <li>About</li>
                    </ul>
                </div>

            </nav>
            <div>
                <div className=" p-5 h-[40vh] bg-gray-900">
                    <p className="my-4 text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient">
                        Hello Username
                    </p>
                    <p className="my-4 text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient">
                        What you want to lern?
                    </p>
                    <style jsx>{ `
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientAnimation 3s ease infinite;
        }
      `}</style>
                </div>
            </div>

            <div className='m-auto'>
                <div className="m-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg" src="/IITB.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                sample roadmap
                            </h5>
                        </a>
                        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">

                            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                    style={ { width: "45%" } }>
                                    45%
                                </div>
                            </div>


                        </div>
                        <a
                            href="#"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            continue
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
            <button
            onClick={() => setIsOpen(true)}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 fixed bottom-5 right-0 "
            >
                <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14M5 12h14"
                    />
                </svg>
                <span className="sr-only">Icon description</span>
            </button>
            {isOpen && <PopupComponent onClose={() => setIsOpen(false)} />}
        </div>
    )
}

export default page
