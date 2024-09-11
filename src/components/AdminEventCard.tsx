import { Event } from "./AdminEvents";

// Interface for the props of the component
interface AdminEventCardProps {
  event: Event;
  onClick: () => void;
}

export default function AdminEventCard({
  event,
  onClick,
}: AdminEventCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-custom-dark rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-blue-400 transition duration-300 ease-in-out"
    >
      <img
        className="w-full h-32 sm:h-48 object-cover"
        src={event.imageUrl}
        alt={event.name}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-custom-white mb-2">
          {event.name}
        </h3>
        <p className="text-custom-white">
          {event.address}, {event.city}
        </p>
        <p className="text-gray-500 text-sm">
          {new Date(event.eventDate).toLocaleDateString()}
        </p>
        <div className="mt-3"></div>
      </div>
    </div>
  );
}
