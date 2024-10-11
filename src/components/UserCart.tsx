import { useEffect, useState } from "react";
import {
  getClientShoppingCart,
  LocalityOrder,
} from "../services/clientCartService";
import UserCartEvent from "./UserCartEvent";

export default function UserCart() {
  const [localitiesToDisplay, setLocalitiesToDisplay] = useState<
    LocalityOrder[]
  >([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  /**
   * gets all the client cart localities paginated
   * @param page the page to get the localities
   */
  const handleGetLocalities = async (page: number = 0) => {
    setIsLoading(true);
    try {
      const response = await getClientShoppingCart(page);

      // verify if the response has localities
      if (Array.isArray(response.data.content)) {
        setLocalitiesToDisplay(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } else {
        // otherwise set the events to display empty
        setLocalitiesToDisplay([]);
        setTotalPages(1);
        setCurrentPage(0);
      }
    } catch (error) {
      setLocalitiesToDisplay([]);
      setTotalPages(1);
      setCurrentPage(0);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handle next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handleGetLocalities(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetLocalities(currentPage - 1);
    }
  };

  // calculate the total price when localitiesToDisplay changes
  useEffect(() => {
    const total = localitiesToDisplay.reduce(
      (acc, locality) => acc + locality.totalPaymentAmount,
      0,
    );
    setTotalPrice(total);
  }, [localitiesToDisplay]);

  // fetch the localities when page changes
  useEffect(() => {
    handleGetLocalities();
  }, []);

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      {/* Pagination buttons */}
      <div className="mb-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={isLoading || currentPage === 0}
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
          disabled={isLoading || currentPage >= totalPages - 1}
          className={`w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
            currentPage >= totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-400"
          }`}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Event cart cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {localitiesToDisplay.map((locality, index) => (
          <UserCartEvent key={index} userEvent={locality} />
        ))}
      </div>

      {/* Inputs for total price and coupon code */}
      <div className="mt-6">
        <div className="mb-4">
          <label className="block text-slate-50 font-medium">Total Price</label>
          <input
            type="text"
            value={`$${totalPrice}`}
            readOnly
            className="bg-custom-gray text-slate-50 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex-1 mr-4">
          <label className="block text-slate-50 font-medium">Coupon Code</label>
          <input
            type="text"
            placeholder="Enter coupon code"
            className="bg-custom-gray text-slate-50 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
          <i className="fa-solid fa-credit-card"></i> Pay Now
        </button>
      </div>
    </div>
  );
}
