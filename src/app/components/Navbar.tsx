"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  return (
    <nav
      className="bg-orange-500 text-white p-4 flex justify-between items-center"
      data-testid="navbar"
    >
      <h1 className="text-xl font-semibold" data-testid="navbar-title">
        User Management
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={handleLogout}
          className="text-white-500 text-2xl hover:text-white-700 transition-colors"
          data-testid="logout-button"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
