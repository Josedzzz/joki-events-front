import { Event } from "./AdminEvents";

// Interface for the props of the component
interface AdminEventInfoProps {
  event: Event | null; // null when the event is new
  onBack: () => void;
}

export default function AdminEventInfo({ event, onBack }: AdminEventInfoProps) {
  return (
    <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <button
        onClick={onBack}
        className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out"
      >
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>

      {event ? (
        <>
          <h2 className="text-xl font-bold text-custom-white mt-4 mb-4">
            Event Details
          </h2>
          <p className="text-custom-white">Name: {event.name}</p>
          <p className="text-custom-white">City: {event.city}</p>
          <p className="text-custom-white">
            Date: {new Date(event.eventDate).toLocaleDateString()}
          </p>
          <p className="text-custom-white">
            Total Available: {event.totalAvailableQuantity}
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-custom-white mt-4 mb-4">
            Add New Event
          </h2>
          {/* Aquí puedes añadir un formulario para agregar un nuevo evento */}
          <p className="text-custom-white">Event form goes here</p>
        </>
      )}
    </div>
  );
}
