import { useEffect, useState } from "react";
import AdminCouponCard from "./AdminCouponCard";
import AdminCouponInfo from "./AdminCouponInfo";
import { getAllCoupons } from "../services/couponService";

// Interface for the coupons
export interface Coupon {
  id: string;
  name: string;
  discountPercent: number;
  expirationDate: string;
  minPurchaseAmount: number;
  used: boolean;
}

export default function AdminCoupons() {
  const [couponsToDisplay, setCouponsToDisplay] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isAddingNewCoupon, setIsAddingNewCoupon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * manage the states to add a coupon
   */
  const handleAddCoupon = () => {
    setSelectedCoupon(null);
    setIsAddingNewCoupon(true);
  };

  /**
   * manage the states to select coupon
   * @param coupon the selected coupon
   */
  const handleSelectCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsAddingNewCoupon(false);
  };

  /**
   * get all the coupons paginated
   */
  const handleGetCoupons = async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await getAllCoupons(page);
      setCouponsToDisplay(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * handle next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handleGetCoupons(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetCoupons(currentPage - 1);
    }
  };

  // fetch books when page changes
  useEffect(() => {
    handleGetCoupons();
  }, []);

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      {!selectedCoupon && !isAddingNewCoupon ? (
        <div className="px-4 py-6">
          <div className="flex flex-row items-center gap-4 mb-2">
            <h2 className="text-2xl font-bold text-blue-400">Manage Coupons</h2>
            <button
              onClick={handleAddCoupon}
              className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <i className="fa-solid fa-plus"></i> Add a new Coupon
            </button>
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {couponsToDisplay.map((coupon) => (
              <AdminCouponCard
                key={coupon.id}
                coupon={coupon}
                onClick={() => handleSelectCoupon(coupon)}
              />
            ))}
          </div>
          {loading && <p>Loading...</p>}
        </div>
      ) : (
        <AdminCouponInfo
          coupon={selectedCoupon}
          onBack={async () => {
            setSelectedCoupon(null);
            setIsAddingNewCoupon(false);
            await handleGetCoupons(currentPage);
          }}
        />
      )}
    </div>
  );
}
