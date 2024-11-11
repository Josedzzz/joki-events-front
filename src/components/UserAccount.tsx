import { useEffect, useState } from "react";
import {
  deleteClientAccount,
  getClientAccountInfo,
  updateClient,
} from "../services/updateClientService";
import Cookies from "js-cookie";

export default function UserAccount() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * function to validate if a string contains only numbers
   * @param phone the phone string to validate
   * @returns true if the string contains only numbers, false otherwise
   */
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };

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
   * function to validate the address (at least 3 characters)
   * @param address the address to validate
   * @returns
   */
  const validateAddress = (address: string) => {
    return address.length >= 3;
  };

  /**
   * fetch the client account information
   */
  const fetchClientInfo = async () => {
    try {
      const response = await getClientAccountInfo();
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setUsername(response.data.name);
      setAddress(response.data.address);
    } catch (error) {
      console.error("Error fetching admin info:", error);
      setError("Failed to load the information");
    }
  };

  /**
   * handles the account update form
   * @returns
   */
  const handleAccountUpdate = async () => {
    setError("");
    setSuccess("");

    // validations before sending the form
    if (!validatePhone(phone)) {
      setError("Please enter a valid phone format");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email format");
      return;
    }
    if (!validateUsername(username)) {
      setError("Username must be at least 3 characters long");
      return;
    }
    if (!validateAddress(address)) {
      setError("Address must be at least 3 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const message = await updateClient({
        phone,
        email,
        name: username,
        address,
      });
      // Set a cookie that expires in 1 day for the authToken
      Cookies.set("authToken", message.token, { expires: 1 });
      setSuccess(message.message);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handles the submission for the delete account
   * @returns
   */
  const handleDeleteAccount = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await deleteClientAccount();
      setSuccess(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // fetch the client info when the component mounts
  useEffect(() => {
    fetchClientInfo();
  }, []);

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6 flex items-center slide-in-left">
      <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-xl mx-auto flex flex-col">
        <h2 className="text-xl font-bold text-blue-400 mb-4">
          Account Information
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="phone"
            >
              <i className="fa-solid fa-phone mr-2"></i> Phone
            </label>
            <input
              type="text"
              id="phone"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="email"
            >
              <i className="fa-regular fa-envelope mr-2"></i> Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="username"
            >
              <i className="fa-regular fa-user"></i> Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="address"
            >
              <i className="fa-solid fa-location-dot mr-2"></i> Address
            </label>
            <input
              type="text"
              id="address"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="justify-between grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="submit"
              onClick={handleDeleteAccount}
              className={`text-custom-white font-bold p-2 border-4 border-blue-400 rounded-xl w-full ${
                isLoading
                  ? "cursor-not-allowed"
                  : "hover:bg-blue-400 hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Delete Account"
              )}
            </button>
            <button
              type="submit"
              onClick={handleAccountUpdate}
              className={`text-custom-white font-bold p-2 border-4 border-blue-400 rounded-xl w-full ${
                isLoading
                  ? "cursor-not-allowed"
                  : "hover:bg-blue-400 hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Update Account"
              )}
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
