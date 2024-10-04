import { useEffect, useState } from "react";
import UserEventCard from "./UserEventCard";
import UserEventInfo from "./UserEventInfo";
import { getAllClientEvents } from "../services/clientEventService";

// Interface for the event localities
export interface Locality {
  name: string;
  price: number;
  maxCapacity: number;
  currentOccupancy: number;
}

// Interface for the user events
export interface UserEvent {
  id: string;
  name: string;
  address: string;
  city: string;
  eventDate: string;
  availableForPurchase: boolean;
  localities: {
    name: string;
    price: number;
    maxCapacity: number;
    currentOccupancy: number;
  }[];
  totalAvailablePlaces: number;
  eventImageUrl: string;
  localitiesImageUrl: string;
  eventType: string;
}

export default function UserEvents() {
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);
  const [eventsToDisplay, setEventsToDisplay] = useState<UserEvent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  /**
   * gets all the events paginated
   * @param page the page to get the events
   */
  const handleGetClientEvents = async (page: number = 0) => {
    setIsLoading(true);
    try {
      const response = await getAllClientEvents(page);
      setEventsToDisplay(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handle next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handleGetClientEvents(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetClientEvents(currentPage - 1);
    }
  };

  useEffect(() => {
    handleGetClientEvents();
  }, []);

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
        <button
          onClick={handlePreviousPage}
          disabled={isLoading || currentPage === 0}
          className={`w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
            currentPage === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-400"
          }`}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          onClick={handleNextPage}
          disabled={isLoading || currentPage >= totalPages - 1}
          className={`w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
            currentPage >= totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-400"
          }`}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {eventsToDisplay.map((event) => (
          <UserEventCard
            key={event.id}
            userEvent={event}
            onClick={() => handlesSelectEvent(event)}
          />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
