import { Coupon } from "./AdminCoupons";

// Interface for the props of the component
interface AdminCouponCardProps {
  coupon: Coupon;
  onClick: () => void;
}

export default function AdminCouponCard({
  coupon,
  onClick,
}: AdminCouponCardProps) {
  /**
   * format the expirationDate Array
   * @param date the date to format
   * @returns the formated date
   */
  const formatExpirationDate = (date: string | number[]): string => {
    if (Array.isArray(date)) {
      const [year, month, day] = date;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
    return date;
  };

  return (
    <div
      onClick={onClick}
      className="bg-custom-dark rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-blue-400 hover:scale-105 transition duration-300 ease-in-out bounce-in"
    >
      <div className="p-4">
        <h3 className="text-lg font-bold text-custom-white mb-2">
          {coupon.name}
        </h3>
        <p className="text-custom-white">
          {"Discount: " + coupon.discountPercent + "%"}
        </p>
        <p className="text-custom-white">
          Expiration: {formatExpirationDate(coupon.expirationDate)}
        </p>
      </div>
    </div>
  );
}
