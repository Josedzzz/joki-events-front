import UserCartEvent from "./UserCartEvent";
import { UserEvent } from "./UserEvents";

// Todo: Change this interface and create an event interface with more information about the user
export interface UserCart {
  id: string;
  userId: string;
  events: UserEvent[];
  totalPrice: number;
}

export default function UserCart() {
  // Cart data with hardcoded values
  const cart: UserCart = {
    id: "cart123",
    userId: "user456",
    totalPrice: 150,
    events: [
      {
        id: "event1",
        name: "Rock Concert",
        city: "New York",
        address: "123 Main St",
        eventDate: "2024-10-15T20:00:00",
        totalAvailableQuantity: 100,
        imageUrl: "/event.jpg",
        localityImageUrl: "/event.jpg",
        localities: [],
      },
      {
        id: "event2",
        name: "Jazz Festival",
        city: "Chicago",
        address: "456 Maple Ave",
        eventDate: "2024-11-05T18:00:00",
        totalAvailableQuantity: 200,
        imageUrl: "/event.jpg",
        localityImageUrl: "/event.jpg",
        localities: [],
      },
      {
        id: "event3",
        name: "Rock Concert",
        city: "New York",
        address: "123 Main St",
        eventDate: "2024-10-15T20:00:00",
        totalAvailableQuantity: 100,
        imageUrl: "/event.jpg",
        localityImageUrl: "/event.jpg",
        localities: [],
      },
      {
        id: "event4",
        name: "Jazz Festival",
        city: "Chicago",
        address: "456 Maple Ave",
        eventDate: "2024-11-05T18:00:00",
        totalAvailableQuantity: 200,
        imageUrl: "/event.jpg",
        localityImageUrl: "/event.jpg",
        localities: [],
      },
    ],
  };

  return (
    <div className="bg-custom-black w-full min-h-[calc(100vh-4rem)] p-6">
      {/* Pagination buttons */}
      <div className="mb-4 flex justify-between">
        <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="w-50px text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Event cart cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cart.events.map((event) => (
          <UserCartEvent key={event.id} userEvent={event} />
        ))}
      </div>

      {/* Inputs for total price and coupon code */}
      <div className="mt-6">
        <div className="mb-4">
          <label className="block text-slate-50 font-medium">Total Price</label>
          <input
            type="text"
            value={`$${cart.totalPrice}`}
            readOnly
            className="bg-custom-gray text-slate-50 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex-1 mr-4">
          <label className="block text-slate-50 font-medium">Coupon Code</label>
          <input
            type="text"
            placeholder="Enter coupon code"
            className="bg-custom-gray text-slate-50 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
          <i className="fa-solid fa-credit-card"></i> Pay Now
        </button>
      </div>

    </div>
  );
}
