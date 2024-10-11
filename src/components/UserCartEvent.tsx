import { LocalityOrder } from "../services/clientCartService";

// Interface for the props of the component
interface UserCartEventProps {
  userEvent: LocalityOrder;
}

export default function UserCartEvent({ userEvent }: UserCartEventProps) {
  return (
    <div className="bg-custom-dark rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-blue-400 hover:scale-105 transition duration-300 ease-in-out">
      {/* Event Image */}
      <img
        className="w-full h-32 sm:h-48 object-cover"
        src={userEvent.eventImageUrl}
        alt={userEvent.eventName}
      />

      {/* Event Information */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-custom-white mb-2">
          {userEvent.eventName} - {userEvent.localityName}
        </h3>
        <p className="text-custom-white">
          {userEvent.address}, {userEvent.city}
        </p>
        <p className="text-gray-500 text-sm">
          {new Date(userEvent.eventDate).toLocaleDateString()} -{" "}
          {userEvent.eventType}
        </p>

        {/* Additional Information */}
        <p className="text-custom-white mt-2">
          <strong>Tickets Selected: </strong>
          {userEvent.numTicketsSelected}
        </p>
        <p className="text-custom-white">
          <strong>Total Payment: </strong>${userEvent.totalPaymentAmount}
        </p>

        {/* Remove Button */}
        <button className="mt-2 text-red-400 hover:text-red-600 transition-colors">
          <i className="fa-solid fa-trash"></i> Remove
        </button>
      </div>
    </div>
  );
}
