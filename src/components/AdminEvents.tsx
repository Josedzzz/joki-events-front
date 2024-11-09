import { useEffect, useState } from "react";
import AdminEventInfo from "./AdminEventInfo";
import { getAllEvents } from "../services/eventService";
import AdminEventCard from "./AdminEventCard";

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
  localitiesImageUrl: string;
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
  const [eventsToDisplay, setEventsToDisplay] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  /**
   * gets all the events paginated
   * @param page the page to get the events
   */
  const handleGetEvents = async (page: number = 0) => {
    setIsLoading(true);
    try {
      const response = await getAllEvents(page);
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
      handleGetEvents(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetEvents(currentPage - 1);
    }
  };

  // fetch events when page changes
  useEffect(() => {
    handleGetEvents();
  }, []);

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6 slide-in-left">
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
              <AdminEventCard
                key={event.id}
                event={event}
                onClick={() => handleSelectEvent(event)}
              />
            ))}
          </div>
          {isLoading && <p>Loading...</p>}
        </div>
      ) : (
        <AdminEventInfo
          event={selectedEvent}
          onBack={async () => {
            setSelectedEvent(null);
            setIsAddingNewEvent(false);
            await handleGetEvents(currentPage);
          }}
        />
      )}
    </div>
  );
}
