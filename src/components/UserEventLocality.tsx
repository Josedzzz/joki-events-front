import { Locality } from "./UserEvents";

// Interface for the locality props
interface UserEventLocalityProps {
  locality: Locality;
}

export default function UserEventLocality({
  locality,
}: UserEventLocalityProps) {
  return (
    <div
      key={locality.name}
      className="bg-custom-gray p-2 rounded-lg shadow-md transition-transform hover:border-2 hover:border-blue-400 transform hover:scale-105"
    >
      <h4 className="text-lg text-slate-50 font-semibold text-center mb-1">
        {locality.name}
      </h4>
      <p className="text-slate-200 text-center mb-1">
        Price: ${locality.price}
      </p>
      <p className="text-slate-200 text-center mb-2">
        Capacity: {locality.currentOccupancy} / {locality.maxCapacity}
      </p>

      {/* Quantity Selection */}
      <div className="flex items-center justify-center space-x-2">
        <label className="text-blue-400 font-medium" htmlFor="quantity">
          <i className="fa-solid fa-ticket"></i> Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          className="text-sm w-16 text-center p-1 bg-custom-dark border-2 border-blue-400 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ appearance: "textfield" }}
        />
      </div>
    </div>
  );
}
