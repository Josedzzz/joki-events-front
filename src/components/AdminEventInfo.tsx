import { useState } from "react";
import { Event } from "./AdminEvents";

// Interface for the props of the component
interface AdminEventInfoProps {
  event: Event | null; // null when the event is new
  onBack: () => void;
}

export default function AdminEventInfo({ event, onBack }: AdminEventInfoProps) {
  // State for managing event image URL and localities
  const [imageUrl, setImageUrl] = useState(event?.imageUrl || "");
  const [localities, setLocalities] = useState(
    event?.idDistributionLocality || [],
  );
  const [localityImageUrl, setLocalityImageUrl] = useState(
    event?.localityImageUrl || "",
  );

  // Function to handle adding a new locality
  // TO DO: Implement an interface for the localities
  const addLocality = () => {
    setLocalities([
      ...localities,
      { name: "", price: 0, maxCapacity: 0, currentCapacity: 0 },
    ]);
  };

  // Function to handle deleting a locality
  const deleteLocality = (index: number) => {
    setLocalities(localities.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out mb-4"
      >
        <i className="fa-solid fa-arrow-left mr-1"></i> Back
      </button>
      <h2 className="text-xl font-bold text-custom-white mb-4">
        {event ? "Edit Event" : "Add New Event"}
      </h2>

      <form>
        {/* Two-column layout for the inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-pen mr-1"></i>Name
            </label>
            <input
              type="text"
              defaultValue={event?.name || ""}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter event name"
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              {" "}
              <i className="fa-solid fa-tree-city mr-1"></i>City
            </label>
            <input
              type="text"
              defaultValue={event?.city || ""}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter city"
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-location-dot mr-1"></i>Address
            </label>
            <input
              type="text"
              defaultValue={event?.address || ""}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter address"
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-regular fa-calendar mr-1"></i>Event Date
            </label>
            <input
              type="datetime-local"
              defaultValue={event?.eventDate || ""}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-user-group mr-1"></i>Total Available
              Quantity
            </label>
            <input
              defaultValue={event?.totalAvailableQuantity || 0}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter available tickets"
              readOnly
            />
          </div>
        </div>

        {/* Image URL input */}
        <div className="mb-4">
          <label className="block text-custom-white font-bold mb-2">
            Event Image
          </label>
          <img
            src={imageUrl || "/placeholder.jpg"}
            alt="Event"
            className="w-full h-max object-cover rounded-lg mb-4"
          />
          <label className="block text-custom-white mb-2">Image URL</label>
          <input
            type="url"
            className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Localities Table */}
        <div className="mb-4">
          <label className="block text-custom-white font-bold mb-2">
            <i className="fa-solid fa-list-ol mr-1"></i>Event Localities
          </label>
          <button
            type="button"
            onClick={addLocality}
            className="mb-4 text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <i className="fa-solid fa-plus mr-1"></i> Add Locality
          </button>
          <table className="table-auto w-full text-left bg-custom-gray text-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-400 text-custom-black">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Max Capacity</th>
                <th className="px-4 py-2">Current Capacity</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localities.map((loc, index) => (
                <tr key={index} className="border-t border-transparent">
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      defaultValue={loc.name || ""}
                      className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter name"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      defaultValue={loc.price || 0}
                      className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                      placeholder="Enter price"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      defaultValue={loc.maxCapacity || 0}
                      className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                      placeholder="Enter max capacity"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      defaultValue={loc.currentCapacity || 0}
                      className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                      placeholder="Enter current capacity"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => deleteLocality(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Locality Image URL input */}
        <div className="mb-4">
          <label className="block text-custom-white font-bold mb-2">
            Locality Image
          </label>
          <img
            src={localityImageUrl || "/placeholder.jpg"}
            alt="Locality"
            className="w-full h-max object-cover rounded-lg mb-4"
          />
          <label className="block text-custom-white mb-2">
            Locality image URL
          </label>
          <input
            type="url"
            className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
            value={localityImageUrl}
            onChange={(e) => setLocalityImageUrl(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <i className="fa-solid fa-share mr-1"></i>{" "}
            {event ? "Save Changes" : "Create"}
          </button>

          {event && (
            <button
              type="button"
              className="text-red-500 font-bold p-2 border-4 border-red-400 rounded-xl hover:bg-red-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <i className="fa-solid fa-trash mr-1"></i> Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
