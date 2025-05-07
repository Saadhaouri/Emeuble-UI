import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center border rounded-md px-3 py-2">
                    <FaUser className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className="w-full outline-none"
                    />
                </div>
                <div className="flex items-center border rounded-md px-3 py-2">
                    <FaUser className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        className="w-full outline-none"
                    />
                </div>
                <div className="flex items-center border rounded-md px-3 py-2">
                    <FaEnvelope className="text-gray-500 mr-2" />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full outline-none"
                    />
                </div>
                <div className="flex items-center border rounded-md px-3 py-2">
                    <FaLock className="text-gray-500 mr-2" />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full outline-none"
                    />
                </div>
                <div className="flex items-center border rounded-md px-3 py-2">
                    <FaLock className="text-gray-500 mr-2" />
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        className="w-full outline-none"
                    />
                </div>
                <div className="flex items-center border rounded-md px-3 py-2">
                    <FaUserTag className="text-gray-500 mr-2" />
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full outline-none bg-transparent"
                    >
                        <option value="" disabled>
                            Select Role
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="SysAdmin">SysAdmin</option>
                        <option value="User">User</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;