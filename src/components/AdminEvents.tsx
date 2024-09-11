import { useState } from "react";
import AdminEventCard from "./AdminEventCard";
import AdminEventInfo from "./AdminEventInfo";

// Interface for the events
export interface Event {
  id: string;
  idDistributionLocality: string[];
  name: string;
  address: string;
  city: string;
  eventDate: string;
  totalAvailableQuantity: number;
  imageUrl: string;
  localityImageUrl: string;
}

export default function AdminEvents() {
  const eventsData: Event[] = [
    {
      id: "1",
      idDistributionLocality: ["loc1", "loc2"],
      name: "Music Festival",
      address: "123 Main St",
      city: "Los Angeles",
      eventDate: "2024-10-05T18:00",
      totalAvailableQuantity: 10,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
    {
      id: "2",
      idDistributionLocality: ["loc3"],
      name: "Art Expo",
      address: "456 Elm St",
      city: "New York",
      eventDate: "2024-09-20T10:00",
      totalAvailableQuantity: 200,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
    {
      id: "3",
      idDistributionLocality: ["loc4"],
      name: "Tech Conference",
      address: "789 Oak St",
      city: "San Francisco",
      eventDate: "2024-11-15T09:00",
      totalAvailableQuantity: 34,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
    {
      id: "4",
      idDistributionLocality: ["loc5", "loc6"],
      name: "Food Fair",
      address: "101 Maple St",
      city: "Chicago",
      eventDate: "2024-12-01T12:00",
      totalAvailableQuantity: 45,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
    {
      id: "5",
      idDistributionLocality: ["loc1", "loc2"],
      name: "Music Festival",
      address: "123 Main St",
      city: "Los Angeles",
      eventDate: "2024-10-05T18:00",
      totalAvailableQuantity: 10,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
    {
      id: "6",
      idDistributionLocality: ["loc3"],
      name: "Art Expo",
      address: "456 Elm St",
      city: "New York",
      eventDate: "2024-09-20T10:00",
      totalAvailableQuantity: 200,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
    {
      id: "7",
      idDistributionLocality: ["loc4"],
      name: "Tech Conference",
      address: "789 Oak St",
      city: "San Francisco",
      eventDate: "2024-11-15T09:00",
      totalAvailableQuantity: 34,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
    {
      id: "8",
      idDistributionLocality: ["loc5", "loc6"],
      name: "Food Fair",
      address: "101 Maple St",
      city: "Chicago",
      eventDate: "2024-12-01T12:00",
      totalAvailableQuantity: 45,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventsData.map((event) => (
              <AdminEventCard
                key={event.id}
                event={event}
                onClick={() => handleSelectEvent(event)}
              />
            ))}
          </div>
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
