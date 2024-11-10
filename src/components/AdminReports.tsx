import { useState } from "react";
import { getReports, EventReport } from "../services/reportService";
import AdminReportCard from "./AdminReportCard";

export default function AdminReports() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [reports, setReports] = useState<EventReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handler for generating the reports
  const handleGenerateReports = async () => {
    // Validation for year and month inputs
    if (!year || !month) {
      setError("Please enter both year and month.");
      return;
    }

    if (!/^\d{4}$/.test(year)) {
      setError("Please enter a valid 4-digit year.");
      return;
    }

    const monthNumber = Number(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      setError("Please enter a valid month between 1 and 12.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await getReports(month, year);
      setReports(response.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-custom-black min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold text-custom-white mb-4 text-center">
        Generate Reports
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-4 w-full max-w-2xl mb-4 items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-slate-50 font-medium mb-1 text-center md:text-left">
            Year
          </label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year (e.g., 2024)"
            className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex-1">
          <label className="block text-slate-50 font-medium mb-1 text-center md:text-left">
            Month
          </label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Enter month (1-12)"
            className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateReports}
        className={`text-blue-400 font-bold p-2 border-4 border-blue-400 rounded-xl w-full max-w-lg ${
          loading
            ? "text-custom-white cursor-not-allowed"
            : "hover:bg-blue-400 hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
        }`}
        disabled={loading}
      >
        {loading ? <i className="fa fa-spinner fa-spin"></i> : "Generate"}
      </button>

      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {reports.map((report) => (
          <AdminReportCard key={report.eventId} report={report} />
        ))}
      </div>
    </div>
  );
}

