import { useCallback, useEffect, useState } from "react";
import UserEventCard from "./UserEventCard";
import UserEventInfo from "./UserEventInfo";
import {
  getSearchEvents,
  SearchEventCredentials,
} from "../services/clientEventService";
import SearchEvent from "./SearchEvent";

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
  const [searchCredentials, setSearchCredentials] =
    useState<SearchEventCredentials>({
      eventName: "",
      city: "",
      startDate: "",
      endDate: "",
      eventType: null,
    });

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
   * handle next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handleGetSearchEvents(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetSearchEvents(currentPage - 1);
    }
  };

  /**
   * Function to format a date from an input (YYYY-MM-DD) and add a default time.
   * @param date string in the format "YYYY-MM-DD" from the input
   * @returns string in the format "YYYY-MM-DDTHH:MM:SS.SSS"
   */
  const formatDate = (date: string) => {
    return `${date}T00:00:00.000`;
  };

  /**
   * gets the events based on the search criteria
   */
  const handleGetSearchEvents = useCallback(
    async (page: number = 0) => {
      setIsLoading(true);
      try {
        const response = await getSearchEvents(searchCredentials, page);

        // Verify if the response has events
        if (Array.isArray(response.data?.content)) {
          setEventsToDisplay(response.data.content);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
        } else {
          // otherwise set the events to display empty
          setEventsToDisplay([]);
          setTotalPages(1);
          setCurrentPage(0);
        }
      } catch (error) {
        setEventsToDisplay([]);
        setTotalPages(1);
        setCurrentPage(0);
        console.error("Error fetching search results: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchCredentials],
  );

  /**
   * handle search when the search button is clicked
   */
  const handleSearch = (credentials: SearchEventCredentials) => {
    // Format startDate and endDate if they are not empty
    const formattedCredentials = {
      ...credentials,
      startDate: credentials.startDate ? formatDate(credentials.startDate) : "",
      endDate: credentials.endDate ? formatDate(credentials.endDate) : "",
    };

    setSearchCredentials(formattedCredentials);
    handleGetSearchEvents(0); // Reset to the first page with new search
  };

  useEffect(() => {
    handleGetSearchEvents(); // Fetch all events on initial render
  }, [handleGetSearchEvents]);

  if (selectedEvent) {
    return (
      <UserEventInfo userEvent={selectedEvent} onBack={handleUnselectEvent} />
    );
  }

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      <SearchEvent onSearch={handleSearch} />

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
