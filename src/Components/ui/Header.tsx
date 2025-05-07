import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  // Example fake user data
  const userAuth = { firstName: "Mohamed", lastName: "Ait", profilePicture: "" };

  // Function to generate avatar letters
  const generateAvatarLetters = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div className="w-full top-0 flex flex-row items-center justify-between bg-white p-2 border-b border-gray-300">
      {/* Logo */}
      <div className="flex justify-center items-center">
        <strong className="text-emerald-500 text-lg font-semibold ml-2">
          Immeuble
        </strong>
      </div>

      {/* User Info */}
      <Link
        to="/profile"
        className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-full"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-emerald-500 text-white font-bold rounded-full mr-2">
            {userAuth ? generateAvatarLetters(userAuth.firstName, userAuth.lastName) : ""}
          </div>
          <span className="text-gray-700 text-lg">
            {userAuth ? `${userAuth.firstName} ${userAuth.lastName}` : ""}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Header;
