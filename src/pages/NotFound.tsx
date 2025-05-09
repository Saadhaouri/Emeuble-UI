import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link
                to="/"
                className="text-blue-500 hover:text-blue-700 font-medium"
            >
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;