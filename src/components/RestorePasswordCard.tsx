import { useState } from "react";

export default function RestorePasswordCard() {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Helper function to validate the password (at least 4 characters)
   * @param password the password to be validate
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
        <form>
          <div className="mb-6">
            <label className="block text-slate-50 font-bold mb-2">
              <i className="fa-solid fa-user-tie"></i> verification Code
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
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}
      </div>
    </main>
  );
}
