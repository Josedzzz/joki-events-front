import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/loginService";
import Cookies from "js-cookie";

export default function LoginCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Handles the submission of the login form
   * @param e the form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isAdmin) {
        const { message, data, token } = await login(
          { username: email, password },
          "admin",
        );
        localStorage.setItem("adminId", data);
        // Set a cookie that expires in 1 day for the authToken
        Cookies.set("authToken", token, { expires: 1 });
        setSuccess(message);
        navigate("/admin-dashboard");
      } else {
        const { message, data, token } = await login(
          { email, password },
          "client",
        );
        localStorage.setItem("userId", data);
        // Set a cookie that expires in 1 day for the authToken
        Cookies.set("authToken", token, { expires: 1 });
        setSuccess(message);
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-2 show-animation">
      <div className="w-full max-w-md bg-custom-dark p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-blue-400 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="username"
            >
              <i className="fa-regular fa-envelope"></i> Email
            </label>
            <input
              type="text"
              id="username"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-slate-50 font-bold mb-2"
              htmlFor="password"
            >
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center text-slate-50 font-bold mb-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-md mr-2"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <span className="flex items-center">
                I am an admin{" "}
                <i className="fa-solid fa-user-tie ml-2 text-slate-50"></i>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}

        <p className="text-gray-600 text-sm text-center mt-6">
          Forgot your password? Click here
        </p>
      </div>
    </main>
  );
}
