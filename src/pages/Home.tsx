import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <div className="max-w-screen-xl mx-auto p-6 flex items-center justify-between h-full">
                {/* Left Section: Welcome Message */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-5xl font-extrabold leading-tight mb-4">Welcome to Our Platform</h1>
                    <p className="text-lg mb-6">
                        Discover the power of seamless management and enhanced insights. Start exploring our services today.
                    </p>
                    <div className="flex justify-center lg:justify-start space-x-4">
                        <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
                            Get Started
                        </button>
                        <button className="border-2 border-white text-white font-semibold py-2 px-6 rounded-lg hover:bg-white hover:text-blue-500 transition duration-300">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right Section: Image or Graphic */}
                <div className="hidden lg:block w-1/2">
                    <img
                        src="https://via.placeholder.com/500x350" 
                        alt="Home Illustration"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Feature Section */}
            <div className="bg-white py-16">
                <div className="max-w-screen-xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-center mb-8">Our Key Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-3">Feature 1</h3>
                            <p className="text-gray-600">Brief description of the feature, highlighting its benefits.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-3">Feature 2</h3>
                            <p className="text-gray-600">Brief description of the feature, highlighting its benefits.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-3">Feature 3</h3>
                            <p className="text-gray-600">Brief description of the feature, highlighting its benefits.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-gray-800 text-white py-6">
                <div className="max-w-screen-xl mx-auto text-center">
                    <p>&copy; 2025 Your Company. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
