import UserEventLocality from "./UserEventLocality";
import { Locality, UserEvent } from "./UserEvents";
import { orderLocality } from "../services/clientEventService";
import { useState } from "react";

// Interface for the props of the component
interface UserEventInfoProps {
  userEvent: UserEvent;
  onBack: () => void;
}

export default function UserEventInfo({
  userEvent,
  onBack,
}: UserEventInfoProps) {
  const [selectedLocality, setSelectedLocality] = useState<Locality | null>(
    null,
  );
  const [ticketsSelected, setTicketsSelected] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * change the selected locality and the tickets quantity
   * @param locality the selected locality
   */
  const handleSelectLocality = (locality: Locality) => {
    setSelectedLocality(locality);
    setTicketsSelected(1);
  };

  /**
   * handles the submission of the order locality event
   */
  const handleOrderLocality = async () => {
    setError("");
    setSuccess("");

    if (selectedLocality) {
      const credentials = {
        eventId: userEvent.id,
        localityName: selectedLocality.name,
        totalPaymentAmount: selectedLocality.price * ticketsSelected,
        selectedTickets: ticketsSelected,
      };

      setIsLoading(true);

      try {
        const response = await orderLocality(credentials);
        setSuccess(response.message);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-5xl mx-auto w-full mt-6 mb-6 fade-in">
      {/* Button to go back */}
      <button
        onClick={onBack}
        className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out mb-6 transform hover:scale-105"
      >
        <i className="fa-solid fa-arrow-left mr-1"></i> Back
      </button>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Image */}
        <div>
          <img
            src={userEvent.eventImageUrl}
            alt={userEvent.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Event Details */}
        <div>
          <h2 className="text-2xl font-bold text-custom-white mb-4">
            {userEvent.name}
          </h2>
          <form>
            <div className="grid grid-cols-1 gap-4">
              {/* Event Name */}
              <div className="mb-1">
                <label className="block text-blue-400 font-medium text-lg">
                  Event Type
                </label>
                <p className="text-slate-200 text-base">
                  {userEvent.eventType}
                </p>
              </div>

              {/* Event Date */}
              <div className="mb-1">
                <label className="block text-blue-400 font-medium text-lg">
                  Event Date
                </label>
                <p className="text-slate-200 text-base">
                  {new Date(userEvent.eventDate).toLocaleString()}
                </p>
              </div>

              {/* City */}
              <div className="mb-1">
                <label className="block text-blue-400 font-medium text-lg">
                  City
                </label>
                <p className="text-slate-200 text-base">{userEvent.city}</p>
              </div>

              {/* Address */}
              <div className="mb-1">
                <label className="block text-blue-400 font-medium text-lg">
                  Address
                </label>
                <p className="text-slate-200 text-base">{userEvent.address}</p>
              </div>

              {/* Total Available Quantity */}
              <div className="mb-1">
                <label className="block text-blue-400 font-medium text-lg">
                  Available Tickets
                </label>
                <p className="text-slate-200 text-base">
                  {userEvent.totalAvailablePlaces}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Localities Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-slate-50">Localities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {userEvent.localities.map((locality: Locality) => (
            <UserEventLocality
              key={locality.name}
              locality={locality}
              isSelected={selectedLocality?.name === locality.name} // Determina si la localidad está seleccionada
              onSelect={() => handleSelectLocality(locality)} // Manejador de selección
              ticketsSelected={ticketsSelected}
              setTicketsSelected={setTicketsSelected}
              isDisabled={
                selectedLocality?.name !== locality.name &&
                selectedLocality !== null
              }
            />
          ))}
        </div>

        {selectedLocality && (
          <button
            onClick={handleOrderLocality}
            className={`mt-4 text-custom-white font-bold p-2 border-4 border-blue-400 rounded-xl ${
              isLoading
                ? "cursor-not-allowed"
                : "hover:bg-blue-400 hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Add to the cart"
            )}
          </button>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}

        {/* Locality Image */}
        <div className="mt-6">
          <label className="block text-slate-50 font-medium">
            Localities Image
          </label>
          <img
            src={userEvent.localitiesImageUrl}
            alt="Localities"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
