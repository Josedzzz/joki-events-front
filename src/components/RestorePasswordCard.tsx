import { useState } from "react";
import {
  sendRecoverPasswordCode,
  recoverPasswordCode,
} from "../services/restorePassword";

export default function RestorePasswordCard() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle sending verification code
   */
  const handleSendVerificationCode = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await sendRecoverPasswordCode({ email: email });
      setSuccess(response.message);
      setIsCodeSent(true); // Show verification code and new password fields
      setError("");
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
   * Handle password recovery
   */
  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the new password
    if (!validatePassword(newPassword)) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    const credentials = {
      email,
      verificationCode,
      newPassword,
    };

    try {
      const response = await recoverPasswordCode(credentials);
      setSuccess(response.message);
      setError("");
      // reload the page after successfully password update
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  /**
   * Helper function to validate the password (at least 4 characters)
   * @param password the password to be validated
   * @returns
   */
  const validatePassword = (password: string) => {
    return password.length >= 4;
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-2 show-animation">
      <div className="w-full max-w-md bg-custom-dark p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-blue-400 text-center mb-4">
          Restore Password
        </h2>

        {/* Email and Send Verification Code */}
        <div className="mb-6">
          <label className="block text-slate-50 font-bold mb-2">
            <i className="fa-solid fa-envelope"></i> Email
          </label>
          <input
            className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="isAdmin"
            className="mr-2"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label htmlFor="isAdmin" className="text-slate-50 font-bold">
            Admin
          </label>
        </div>

        {/* Username Field (Only for Admin) */}
        {isAdmin && (
          <div className="mb-6">
            <label className="block text-slate-50 font-bold mb-2">
              <i className="fa-solid fa-user"></i> Username
            </label>
            <input
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <button
          onClick={handleSendVerificationCode}
          disabled={isLoading}
          className={`w-full text-slate-50 font-bold p-2 mb-6 text-sm border-4 border-blue-400 rounded-xl ${
            isLoading
              ? "bg-blue-200 cursor-not-allowed"
              : "hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
          }`}
        >
          {isLoading ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            "Send Verification Code"
          )}
        </button>

        {/* Show this part only after the verification code is sent */}
        {isCodeSent && (
          <form onSubmit={handleRecoverPassword}>
            <div className="mb-6">
              <label className="block text-slate-50 font-bold mb-2">
                <i className="fa-solid fa-key"></i> Verification Code
              </label>
              <input
                className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Enter your verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-slate-50 font-bold mb-2"
                htmlFor="password"
              >
                <i className="fa-solid fa-lock"></i> New Password
              </label>
              <input
                className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                id="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* Button to submit the form */}
            <button
              type="submit"
              className="w-full text-slate-50 font-bold p-2 text-sm border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Verify
            </button>
          </form>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}
      </div>
    </main>
  );
}
