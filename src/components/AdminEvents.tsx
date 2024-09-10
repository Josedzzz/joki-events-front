import AdminEventCard from "./AdminEventCard";

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
      imageUrl: "https://example.com/image1.jpg",
    },
    {
      id: "2",
      idDistributionLocality: ["loc3"],
      name: "Art Expo",
      address: "456 Elm St",
      city: "New York",
      eventDate: "2024-09-20T10:00",
      totalAvailableQuantity: 200,
      imageUrl: "https://example.com/image2.jpg",
    },
    {
      id: "3",
      idDistributionLocality: ["loc4"],
      name: "Tech Conference",
      address: "789 Oak St",
      city: "San Francisco",
      eventDate: "2024-11-15T09:00",
      totalAvailableQuantity: 34,
      imageUrl: "https://example.com/image3.jpg",
    },
    {
      id: "4",
      idDistributionLocality: ["loc5", "loc6"],
      name: "Food Fair",
      address: "101 Maple St",
      city: "Chicago",
      eventDate: "2024-12-01T12:00",
      totalAvailableQuantity: 45,
      imageUrl: "https://example.com/image4.jpg",
    },
    {
      id: "5",
      idDistributionLocality: ["loc1", "loc2"],
      name: "Music Festival",
      address: "123 Main St",
      city: "Los Angeles",
      eventDate: "2024-10-05T18:00",
      totalAvailableQuantity: 10,
      imageUrl: "https://example.com/image1.jpg",
    },
    {
      id: "6",
      idDistributionLocality: ["loc3"],
      name: "Art Expo",
      address: "456 Elm St",
      city: "New York",
      eventDate: "2024-09-20T10:00",
      totalAvailableQuantity: 200,
      imageUrl: "https://example.com/image2.jpg",
    },
    {
      id: "7",
      idDistributionLocality: ["loc4"],
      name: "Tech Conference",
      address: "789 Oak St",
      city: "San Francisco",
      eventDate: "2024-11-15T09:00",
      totalAvailableQuantity: 34,
      imageUrl: "https://example.com/image3.jpg",
    },
    {
      id: "8",
      idDistributionLocality: ["loc5", "loc6"],
      name: "Food Fair",
      address: "101 Maple St",
      city: "Chicago",
      eventDate: "2024-12-01T12:00",
      totalAvailableQuantity: 45,
      imageUrl: "https://example.com/image4.jpg",
    },
  ];

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      <div className="px-4 py-6">
        <div className="flex flex-row items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-blue-400">Manage Events</h2>
          <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
            <i className="fa-solid fa-plus"></i> Add a new event
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventsData.map((event) => (
            <AdminEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
