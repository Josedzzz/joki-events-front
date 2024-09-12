import { useState } from "react";
import AdminCouponCard from "./AdminCouponCard";
import AdminCouponInfo from "./AdminCouponInfo";

// Interface for the coupons
export interface Coupon {
  id: string;
  name: string;
  discountPercent: number;
  expirationDate: string;
  minPurchaseAmount: number;
  currentAmountAvailable: number;
}

export default function AdminCoupons() {
  const couponData: Coupon[] = [
    {
      id: "1",
      name: "Hallowen",
      discountPercent: 0.15,
      expirationDate: "2024-10-05T18:00",
      minPurchaseAmount: 100000,
      currentAmountAvailable: 20,
    },
    {
      id: "2",
      name: "December",
      discountPercent: 0.25,
      expirationDate: "2024-10-05T18:00",
      minPurchaseAmount: 90000,
      currentAmountAvailable: 25,
    },
    {
      id: "3",
      name: "New Year",
      discountPercent: 0.05,
      expirationDate: "2024-10-05T18:00",
      minPurchaseAmount: 50000,
      currentAmountAvailable: 105,
    },
    {
      id: "4",
      name: "Valentine",
      discountPercent: 0.5,
      expirationDate: "2024-10-05T18:00",
      minPurchaseAmount: 200000,
      currentAmountAvailable: 50,
    },
  ];

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isAddingNewCoupon, setIsAddingNewCoupon] = useState<boolean>(false);

  /**
   * handling useStates for when the admin is going to add a new coupon
   */
  const handleAddCoupon = () => {
    setSelectedCoupon(null);
    setIsAddingNewCoupon(true);
  };

  /**
   * handling useStates for when the admin selects a coupon
   * @param coupon the coupon interface contaning the data of the selected coupon
   */
  const handleSelectCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsAddingNewCoupon(false);
  };

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
            <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {couponData.map((coupon) => (
              <AdminCouponCard
                key={coupon.id}
                coupon={coupon}
                onClick={() => handleSelectCoupon(coupon)}
              />
            ))}
          </div>
        </div>
      ) : (
        <AdminCouponInfo
          coupon={selectedCoupon}
          onBack={() => {
            setSelectedCoupon(null);
            setIsAddingNewCoupon(false);
          }}
        />
      )}
    </div>
  );
}
