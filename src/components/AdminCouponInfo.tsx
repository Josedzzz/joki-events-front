import { Coupon } from "./AdminCoupons";

// Interface for the props of the component
interface AdminCouponInfoProps {
  coupon: Coupon | null; // null when the coupon is new
  onBack: () => void;
}

export default function AdminCouponInfo({
  coupon,
  onBack,
}: AdminCouponInfoProps) {
  return (
    <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out mb-4"
      >
        <i className="fa-solid fa-arrow-left mr-1"></i> Back
      </button>
      <h2 className="text-xl font-bold text-custom-white mb-4">
        {coupon ? "Edit Coupon" : "Add New Coupon"}
      </h2>

      <form>
        {/* Two-column layout for the inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-pen mr-1"></i> Name
            </label>
            <input
              type="text"
              defaultValue={coupon?.name || ""}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter coupon name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-percent mr-1"></i> Discount Percentage
            </label>
            <input
              type="text"
              defaultValue={coupon?.discountPercent || 0}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              placeholder="Enter discount percentage"
            />
          </div>

          <div className="mb-4">
            <label className="block text-custom-white mb-2">
              <i className="fa-regular fa-calendar mr-1"></i> Expiration Date
            </label>
            <input
              type="date"
              defaultValue={coupon?.expirationDate || ""}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-money-bill-wave mr-1"></i> Minimum
              Purchase Amount
            </label>
            <input
              type="text"
              defaultValue={coupon?.minPurchaseAmount || 0}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              placeholder="Enter minimum purchase amount"
            />
          </div>

          <div className="mb-4">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-arrow-down-9-1 mr-1"></i> Current Amount
              Available
            </label>
            <input
              type="text"
              defaultValue={coupon?.currentAmountAvailable || 0}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              placeholder="Enter current amount available"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {coupon ? (
            <>
              <button
                type="button"
                className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <i className="fa-solid fa-share mr-1"></i> Update
              </button>
              <button
                type="button"
                className="text-red-500 font-bold p-2 border-4 border-red-400 rounded-xl hover:bg-red-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <i className="fa-solid fa-trash mr-1"></i> Delete
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <i className="fa-solid fa-plus mr-1"></i> Add Coupon
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
