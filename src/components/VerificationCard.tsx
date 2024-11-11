import { useState } from "react";
import { verifyCode } from "../services/verifyService";
import { useNavigate } from "react-router-dom";

export default function VerificationCard() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the submission of the verification code form
   * @param e the form submission event
   */
  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const message = await verifyCode(verificationCode);
      setSuccess(message);
      navigate("/user-dashboard");
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
            disabled={isLoading}
            className={`w-full text-slate-50 font-bold p-2 mb-6 text-sm border-4 border-blue-400 rounded-xl ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            }`}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Verify"}
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
