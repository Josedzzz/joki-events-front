import { useState } from "react";
import AdminEventInfo from "./AdminEventInfo";

export interface Event {
  id: string;
  name: string;
  address: string;
  city: string;
  eventDate: string;
  availableForPurchase: boolean;
  localities: Locality[];
  totalAvailablePlaces: number;
  eventImageUrl: string;
  eventType: string;
}

export interface Locality {
  name: string;
  price: number;
  maxCapacity: number;
  currentOccupancy: number;
}

export default function AdminEvents() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAddingNewEvent, setIsAddingNewEvent] = useState<boolean>(false);

  /**
   * handling useStates for when the admin is going to add a new event
   */
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsAddingNewEvent(true);
  };

  /**
   * handling useStates for when the admin selects a event
   * @param event the event interface containing the data of the selected event
   */
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsAddingNewEvent(false);
  };

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      {!selectedEvent && !isAddingNewEvent ? (
        <div className="px-4 py-6">
          <div className="flex flex-row items-center gap-4 mb-2">
            <h2 className="text-2xl font-bold text-blue-400">Manage Events</h2>
            <button
              onClick={handleAddEvent}
              className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <i className="fa-solid fa-plus"></i> Add a new event
            </button>
          </div>
          <div className="mb-4 flex justify-between">
            <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div>
        </div>
      ) : (
        <AdminEventInfo
          event={selectedEvent}
          onBack={() => {
            setSelectedEvent(null);
            setIsAddingNewEvent(false);
          }}
        />
      )}
    </div>
  );
}
