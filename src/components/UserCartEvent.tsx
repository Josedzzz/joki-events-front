import { useState } from "react";
import {
  deleteLocalityOrder,
  LocalityOrder,
} from "../services/clientCartService";

// Interface for the props of the component
interface UserCartEventProps {
  userEvent: LocalityOrder;
}

export default function UserCartEvent({ userEvent }: UserCartEventProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * handles the deletion of an order on the clients cart
   * @returns
   */
  const handleDeleteOrder = async () => {
    setSuccess("");
    setError("");

    try {
      if (!userEvent.eventId) {
        setError("The order does not contain an Id");
        return;
      }
      const response = await deleteLocalityOrder({
        eventId: userEvent.eventId,
        localityName: userEvent.localityName,
        totalPaymentAmount: userEvent.totalPaymentAmount,
        ticketsSelected: userEvent.numTicketsSelected,
      });
      setSuccess(response.message);
      // reload the page after successfully deletion
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="bg-custom-dark rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-blue-400 hover:scale-105 transition duration-300 ease-in-out bounce-in">
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
        <button
          className="mt-2 text-red-400 hover:text-red-600 transition-colors"
          onClick={handleDeleteOrder}
        >
          <i className="fa-solid fa-trash"></i> Remove
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}
      </div>
    </div>
  );
}
