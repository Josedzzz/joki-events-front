import { useState } from "react";
import { Event, Locality } from "./AdminEvents";

// Interface for the props of the component
interface AdminEventInfoProps {
  event: Event | null; // null when the event is new
  onBack: () => void;
}

export default function AdminEventInfo({ event, onBack }: AdminEventInfoProps) {
  const [imageUrl, setImageUrl] = useState(event?.eventImageUrl || "");
  const [localityImageUrl, setLocalityImageUrl] = useState(
    event?.localitiesImageUrl || "",
  );
  const [localities, setLocalities] = useState<Locality[]>(
    event?.localities || [],
  );
  const [eventType, setEventType] = useState(event?.eventType || "Concert");

  /**
   * handle event image file selection
   * @param e
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * handle locality image file selection
   * @param e
   */
  const handleLocalityImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocalityImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * function to handle adding a new locality
   */
  const addLocality = () => {
    setLocalities([
      ...localities,
      { name: "", price: 0, maxCapacity: 0, currentOccupancy: 0 },
    ]);
  };

  /*
   * function to handle deletting a locality
   */
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
              defaultValue={event?.totalAvailablePlaces || 0}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter available tickets"
              readOnly
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-music mr-1"></i>Event Type
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="concierto">Concert</option>
              <option value="teatro">Theater</option>
              <option value="tecnologico">tech</option>
            </select>
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
          <label className="block text-custom-white mb-2">Select Image</label>
          <input
            type="file"
            accept="image/*"
            className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleImageChange}
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
          <table className="table-auto w-full text-left bg-custom-dark border-2 border-blue-400 rounded-xl text-white overflow-hidden">
            <thead>
              <tr className="bg-custom-dark text-white">
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
                      defaultValue={loc.currentOccupancy || 0}
                      className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                      placeholder="Enter current capacity"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => deleteLocality(index)}
                      className="bg-blue-400 w-full text-slate-50 font-bold p-2 border-2 border-transparent rounded-xl hover:bg-red-400 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Locality Image input */}
        <div className="mb-4">
          <label className="block text-custom-white font-bold mb-2">
            Locality Image
          </label>
          <img
            src={localityImageUrl || "/placeholder.jpg"}
            alt="Locality"
            className="w-full h-max object-cover rounded-lg mb-4"
          />
          <label className="block text-custom-white mb-2">Select Image</label>
          <input
            type="file"
            accept="image/*"
            className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleLocalityImageChange}
          />
        </div>
      </form>
    </div>
  );
}
