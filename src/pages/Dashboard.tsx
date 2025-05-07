import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Ajouter de nouvelles données
                </button>
            </div>

            {/* Statistiques Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Carte 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-700">Ventes Totales</h3>
                    <p className="text-2xl font-bold text-blue-500 mt-2">$120,450</p>
                    <div className="mt-4 flex items-center text-gray-500">
                        <span>+12%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Carte 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-700">Nouveaux Clients</h3>
                    <p className="text-2xl font-bold text-green-500 mt-2">35</p>
                    <div className="mt-4 flex items-center text-gray-500">
                        <span>-5%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11l-4-4m0 0l-4 4m4-4v12" />
                        </svg>
                    </div>
                </div>

                {/* Carte 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-700">Revenu de ce Mois</h3>
                    <p className="text-2xl font-bold text-purple-500 mt-2">$45,000</p>
                    <div className="mt-4 flex items-center text-gray-500">
                        <span>+8%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Carte 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-700">Commandes en Attente</h3>
                    <p className="text-2xl font-bold text-red-500 mt-2">12</p>
                    <div className="mt-4 flex items-center text-gray-500">
                        <span>-3%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11l-4-4m0 0l-4 4m4-4v12" />
                        </svg>
                    </div>
                </div>

                {/* Carte 5 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-700">Satisfaction des Clients</h3>
                    <p className="text-2xl font-bold text-yellow-500 mt-2">89%</p>
                    <div className="mt-4 flex items-center text-gray-500">
                        <span>+2%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Carte 6 */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-700">Projets Actifs</h3>
                    <p className="text-2xl font-bold text-teal-500 mt-2">8</p>
                    <div className="mt-4 flex items-center text-gray-500">
                        <span>+10%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
