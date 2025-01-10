"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

interface User {
  username: string;
  fullName: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!user) return null;

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const filteredUsers = users.filter((u) => u.username !== user.username);
  console.log(filteredUsers, "filteredUsers");

  const capitalizedUsername =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  const capitalizeWords = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl text-center font-bold">
          Welcome, {capitalizedUsername}
        </h1>

        {user.username === "admin" ? (
          <>
            <h2 className="text-lg mt-4 text-center ml-5">Registered Users:</h2>
            {filteredUsers.length === 0 ? (
              <p className="text-center">No users have registered</p>
            ) : (
              <div className="list-disc pl-6 text-center">
                {filteredUsers.map((user) => (
                  <h4 key={user.username}>
                    {capitalizeWords(user.fullName || user.username)}
                  </h4>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="mt-4 text-center">This is your user dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
