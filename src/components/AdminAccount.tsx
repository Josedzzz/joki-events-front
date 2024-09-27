import { useEffect, useState } from "react";
import {
  getAdminAccountInfo,
  updateAdmin,
} from "../services/updateAdminService";
import Cookies from "js-cookie";

export default function AdminAccount() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * function to validate the email format
   * @param email the email to validate
   * @returns
   */
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * function to validate the username (at least 3 characters)
   * @param username the username to validate
   * @returns
   */
  const validateUsername = (username: string) => {
    return username.length >= 3;
  };

  /**
   * Fetch the admin account info on component mount
   */
  const fetchAdminInfo = async () => {
    try {
      const response = await getAdminAccountInfo();
      setEmail(response.data.email);
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching admin info:", error);
      setError("Failed to load admin info");
    }
  };

  /**
   * Handles the account updateAdmin form
   * @param e the form submission event
   */
  const handleAccountUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // validations before sending the form
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!validateUsername(username)) {
      setError("Username must be at least 3 characters long");
      return;
    }

    try {
      const message = await updateAdmin({ username, email });
      // Set a cookie that expires in 1 day for the authToken
      Cookies.set("authAdminToken", message.token, { expires: 1 });
      setSuccess(message.message);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  // Fetch admin info when the component mounts
  useEffect(() => {
    fetchAdminInfo();
  }, []);

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6 flex items-center">
      <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-xl mx-auto flex flex-col">
        <h2 className="text-xl font-bold text-blue-400 mb-4">
          Account information
        </h2>
        <form onSubmit={handleAccountUpdate}>
          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="email"
            >
              <i className="fa-regular fa-envelope mr-1"></i> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your new email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="username"
            >
              <i className="fa-regular fa-user mr-1"></i> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your new username"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Update data
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}
      </div>
    </div>
  );
}
