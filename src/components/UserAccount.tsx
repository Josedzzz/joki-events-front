import { useEffect, useState } from "react";
import { getClientAccountInfo } from "../services/updateClientService";

export default function UserAccount() {
  const [idCard, setIdCard] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * fetch the client account information
   */
  const fetchClientInfo = async () => {
    try {
      const response = await getClientAccountInfo();
      setIdCard(response.data.idCard);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setUsername(response.data.name);
      setAddress(response.data.address);
    } catch (error) {
      console.error("Error fetching admin info:", error);
      setError("Failed to load the information");
    }
  };

  // fetch the client info when the component mounts
  useEffect(() => {
    fetchClientInfo();
  }, []);

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6 flex items-center">
      <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-xl mx-auto flex flex-col">
        <h2 className="text-xl font-bold text-blue-400 mb-4">
          Account Information
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="idCard"
            >
              <i className="fa-regular fa-id-card mr-2"></i> idCard
            </label>
            <input
              type="text"
              id="idCard"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your id card"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
            />
          </div>

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
              className="w-full text-slate-50 font-bold p-2 border-4 border-red-400 rounded-xl hover:bg-red-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Delete account
            </button>
            <button
              type="submit"
              className="w-full text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Update account information
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
