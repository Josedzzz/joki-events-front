import { useEffect, useState } from "react";
import UserHistoryEvent from "./UserHistoryEvent";
import { getAllCoupons } from "../services/clientHistoryService";
import { Purchase } from "../services/clientHistoryService";

export default function UserHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches purchase history for the current page
   */
  const handleGetPurchaseHistory = async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await getAllCoupons(page);
      setPurchaseHistory(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setError(null);
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

  /**
   * Handles going to the next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handleGetPurchaseHistory(currentPage + 1);
    }
  };

  /**
   * Handles going to the previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetPurchaseHistory(currentPage - 1);
    }
  };

  // Fetch purchase history when the component mounts
  useEffect(() => {
    handleGetPurchaseHistory();
  }, []);

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      <div className="mb-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={loading || currentPage === 0}
          className={`w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
            currentPage === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-400"
          }`}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          onClick={handleNextPage}
          disabled={loading || currentPage >= totalPages - 1}
          className={`w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
            currentPage >= totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-400"
          }`}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Purchase history display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {purchaseHistory.map((purchase) => (
          <UserHistoryEvent key={purchase.id} purchase={purchase} />
        ))}
      </div>

      {loading && <p className="text-blue-400">Loading...</p>}
    </div>
  );
}
