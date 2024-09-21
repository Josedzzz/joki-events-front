import { UserEvent } from "./UserEvents";
import UserHistoryEvent from "./UserHistoryEvent";

export default function UserHistory() {
  const eventsData: UserEvent[] = [
    {
      id: "1",
      localities: [
        {
          id: "loc1",
          name: "VIP",
          price: 100,
          maxCapacity: 500,
          currentCapacity: 450,
        },
        {
          id: "loc2",
          name: "General",
          price: 50,
          maxCapacity: 1000,
          currentCapacity: 750,
        },
        {
          id: "loc3",
          name: "VIP",
          price: 100,
          maxCapacity: 500,
          currentCapacity: 450,
        },
        {
          id: "loc4",
          name: "General",
          price: 50,
          maxCapacity: 1000,
          currentCapacity: 750,
        },
        {
          id: "loc5",
          name: "VIP",
          price: 100,
          maxCapacity: 500,
          currentCapacity: 450,
        },
        {
          id: "loc6",
          name: "General",
          price: 50,
          maxCapacity: 1000,
          currentCapacity: 750,
        },
        {
          id: "loc7",
          name: "VIP",
          price: 100,
          maxCapacity: 500,
          currentCapacity: 450,
        },
        {
          id: "loc8",
          name: "General",
          price: 50,
          maxCapacity: 1000,
          currentCapacity: 750,
        },
      ],
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
      localities: [
        {
          id: "loc3",
          name: "Art Section",
          price: 80,
          maxCapacity: 300,
          currentCapacity: 200,
        },
      ],
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
      localities: [
        {
          id: "loc4",
          name: "Tech Hall",
          price: 120,
          maxCapacity: 400,
          currentCapacity: 300,
        },
      ],
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
      localities: [
        {
          id: "loc5",
          name: "Food Plaza",
          price: 30,
          maxCapacity: 600,
          currentCapacity: 500,
        },
        {
          id: "loc6",
          name: "VIP Food Plaza",
          price: 60,
          maxCapacity: 200,
          currentCapacity: 150,
        },
      ],
      name: "Food Fair",
      address: "101 Maple St",
      city: "Chicago",
      eventDate: "2024-12-01T12:00",
      totalAvailableQuantity: 45,
      imageUrl: "/event.jpg",
      localityImageUrl: "/event.jpg",
    },
  ];

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      <div className="mb-4 flex justify-between">
        <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/*History of the events*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {eventsData.map((event) => (
          <UserHistoryEvent key={event.id} userEvent={event} />
        ))}
      </div>
    </div>
  );
}
