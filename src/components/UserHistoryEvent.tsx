import { UserEvent } from "./UserEvents";

// Interface for the props of the component
interface UserHistoryEventProps {
  userEvent: UserEvent;
}

export default function UserHistoryEvent({ userEvent }: UserHistoryEventProps) {
  const { name, imageUrl, address, city, eventDate } = userEvent;

  return (
    <div className="bg-custom-dark rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-blue-400 hover:scale-105 transition duration-300 ease-in-out">
      <img
        className="w-full h-32 sm:h-48 object-cover"
        src={imageUrl}
        alt={name}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-custom-white mb-2">{name}</h3>
        <p className="text-custom-white">
          {address}, {city}
        </p>
        <p className="text-gray-500 text-sm">
          {new Date(eventDate).toLocaleDateString()}
        </p>

        {/* Remove Button */}
        <button className="mt-2 text-red-400 hover:text-red-600 transition-colors">
          <i className="fa-solid fa-trash"></i> Cancel Purchase
        </button>
      </div>
    </div>
  );
}
