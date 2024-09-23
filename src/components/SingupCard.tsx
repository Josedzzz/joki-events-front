import { useState } from "react";
import { signup } from "../services/signupService";
import VerificationCard from "./VerificationCard";
import Cookies from "js-cookie";

export default function SignupCard() {
  const [idCard, setIdCard] = useState("");
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  /**
   * Handles the submission of the signup form
   * @param e the form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { message, data, token } = await signup({
        idCard,
        name,
        address,
        phone,
        email,
        password,
      });
      localStorage.setItem("userId", data);
      setIsRegistered(true);
      setSuccess(message);
      // Set a cookie that expires in 1 day for the authToken
      Cookies.set("authToken", token, { expires: 1 });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  if (isRegistered) {
    return <VerificationCard />;
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-2 show-animation">
      <div className="w-full max-w-md bg-custom-dark p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-blue-400 text-center mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="name"
            >
              <i className="fa-regular fa-id-card"></i> Id-card
            </label>
            <input
              type="text"
              id="id-card"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your id"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="name"
            >
              <i className="fa-solid fa-user"></i> Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="address"
            >
              <i className="fa-regular fa-map"></i> Address
            </label>
            <input
              type="text"
              id="address"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAdress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="phone"
            >
              <i className="fa-solid fa-phone"></i> Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="email"
            >
              <i className="fa-regular fa-envelope"></i> Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-1 text-sm"
              htmlFor="password"
            >
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full text-slate-50 font-bold p-2 text-sm border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}

        <p className="text-gray-600 text-xs text-center mt-4">
          Already have an account? Log in
        </p>
      </div>
    </main>
  );
}
