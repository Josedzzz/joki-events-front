import { useState } from "react";
import UserEventCatd from "./UserEventCard";
import UserEventInfo from "./UserEventInfo";

// Interface for the user events
export interface UserEvent {
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

export default function UserEvents() {
  const eventsData: UserEvent[] = [
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

  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);

  /**
   * handling useState for when an user selects an event
   * @param userEvent
   */
  const handlesSelectEvent = (userEvent: UserEvent) => {
    setSelectedEvent(userEvent);
  };

  /**
   * handling useState for when an user unselects an event
   */
  const handleUnselectEvent = () => {
    setSelectedEvent(null);
  };

  if (selectedEvent) {
    return (
      <UserEventInfo userEvent={selectedEvent} onBack={handleUnselectEvent} />
    );
  }

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      <div className="relative mb-6 flex flex-row gap-5">
        <input
          type="text"
          placeholder="Search events..."
          className="bg-custom-gray text-slate-50 px-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-50"></i>
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
          <UserEventCatd
            key={event.id}
            userEvent={event}
            onClick={() => handlesSelectEvent(event)}
          />
        ))}
      </div>
    </div>
  );
}
