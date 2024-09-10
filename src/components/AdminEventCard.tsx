import { Event } from "./AdminEvents";

interface AdminEventCardProps {
  event: Event;
}

export default function AdminEventCard({ event }: AdminEventCardProps) {
  return (
    <div className="bg-custom-dark rounded-lg shadow-lg overflow-hidden max-w-xs">
      <img
        className="w-full h-32 sm:h-48 object-cover"
        src={event.imageUrl}
        alt={event.name}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-custom-white mb-2">
          {event.name}
        </h3>
        <p className="text-gray-700">
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
