import { Locality } from "./UserEvents";

// Interface for the locality props
interface UserEventLocalityProps {
  locality: Locality;
  isSelected: boolean;
  onSelect: () => void;
  ticketsSelected: number;
  setTicketsSelected: (quantity: number) => void;
  isDisabled: boolean;
}

export default function UserEventLocality({
  locality,
  isSelected,
  onSelect,
  ticketsSelected,
  setTicketsSelected,
  isDisabled,
}: UserEventLocalityProps) {
  return (
    <div
      onClick={onSelect}
      className={`p-2 rounded-lg shadow-md transition-transform bounce-in ${
        isSelected ? "bg-blue-500 border-4 border-blue-500" : "bg-custom-gray"
      } transform hover:scale-105 cursor-pointer`}
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
      {isSelected && (
        <div className="flex items-center justify-center space-x-2">
          <label className="text-white font-medium" htmlFor="quantity">
            <i className="fa-solid fa-ticket"></i> Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={locality.maxCapacity - locality.currentOccupancy}
            value={ticketsSelected}
            onChange={(e) => setTicketsSelected(parseInt(e.target.value))}
            className="text-sm w-16 text-center p-1 bg-custom-dark border-2 border-blue-400 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isDisabled}
            style={{ appearance: "textfield" }}
          />
        </div>
      )}
    </div>
  );
}
