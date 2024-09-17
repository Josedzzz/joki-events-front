import { UserEvent } from "./UserEvents";

// Interface for the props of the component
interface UserEventInfoProps {
  userEvent: UserEvent;
  onBack: () => void;
}

export default function UserEventInfo({
  userEvent,
  onBack,
}: UserEventInfoProps) {
  return (
    <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-5xl mx-auto w-full mt-6">
      <button
        onClick={onBack}
        className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out mb-4"
      >
        <i className="fa-solid fa-arrow-left mr-1"></i> Back
      </button>
      <h2 className="text-xl font-bold text-custom-white mb-4">
        {"Event " + userEvent.name}
      </h2>
    </div>
  );
}
