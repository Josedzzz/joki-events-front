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
      key={locality.id}
      className="bg-custom-gray p-4 rounded-lg shadow-md transition-transform hover:border-2 hover:border-blue-400 transform hover:scale-105"
    >
      <h4 className="text-lg text-slate-50 font-semibold text-center">
        {locality.name}
      </h4>
      <p className="text-slate-200 text-sm text-center">
        Price: ${locality.price}
      </p>
      <p className="text-slate-200 text-sm text-center">
        Capacity: {locality.currentCapacity} / {locality.maxCapacity}
      </p>
    </div>
  );
}
