import { useState } from "react";
import { verifyCode } from "../services/verifyService";

export default function VerificationCard() {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Handles the submission of the verification code form
   * @param e the form submission event
   */
  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    let userId = localStorage.getItem("userId");
    if (userId === null) {
      userId = "";
    }

    try {
      const message = await verifyCode({
        id: userId,
        verificationCode: verificationCode,
      });
      setSuccess(message);
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
      <div className="w-full max-w-md bg-custom-dark p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-blue-400 text-center mb-4">
          Enter Verification Code
        </h2>
        <form onSubmit={handleVerification}>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter your verification code"
            className="mb-4 bg-custom-gray text-slate-50 w-full px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
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
