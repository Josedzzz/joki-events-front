import { useEffect, useState } from "react";
import { Event, Locality } from "./AdminEvents";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../services/eventService";

// Interface for the props of the component
interface AdminEventInfoProps {
  event: Event | null; // null when the event is new
  onBack: () => void;
}

export default function AdminEventInfo({ event, onBack }: AdminEventInfoProps) {
  const [name, setName] = useState(event?.name || "");
  const [city, setCity] = useState(event?.city || "");
  const [address, setAddress] = useState(event?.address || "");
  const [date, setDate] = useState(event?.eventDate || "");
  const [totalAvailablePlaces, setTotalAvailablePlaces] = useState(
    event?.totalAvailablePlaces || 0,
  );
  const [eventImageUrl, setEventImageUrl] = useState(
    event?.eventImageUrl || "",
  );
  const [localitiesImageUrl, setLocalitiesImageUrl] = useState(
    event?.localitiesImageUrl || "",
  );
  const [localities, setLocalities] = useState<Locality[]>(
    event?.localities || [],
  );
  const [eventType, setEventType] = useState(event?.eventType || "CONCERT");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * handle event image file selection
   * @param e
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEventImageUrl(reader.result as string);
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
        setLocalitiesImageUrl(reader.result as string);
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

  /**
   * function to handle the changes in any input field in the table
   * @param index the index of the locality to be change
   * @param field the field of the locality to change
   * @param value the value to update
   */
  const handleInputChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedLocalities = [...localities];
    updatedLocalities[index] = { ...updatedLocalities[index], [field]: value };
    setLocalities(updatedLocalities);
  };

  // useEffect to recalculate totalAvailablePlaces of the event when localities change
  useEffect(() => {
    const total = localities.reduce((acc, loc) => acc + loc.maxCapacity, 0);
    setTotalAvailablePlaces(total);
  }, [localities]);

  /**
   * Validates the event data before submission
   * @returns {string | null} - Returns an error message if there's a validation issue, or null if validation passes
   */
  const validateEventData = (): string | null => {
    // Validate images
    if (!eventImageUrl || !localitiesImageUrl) {
      return "Please provide the required images";
    }

    // Validate name
    if (!name || name.trim().length === 0) {
      return "Event name is required";
    }

    // Validate city
    if (!city || city.trim().length === 0) {
      return "City is required";
    }

    // Validate address
    if (!address || address.trim().length === 0) {
      return "Address is required";
    }

    // Validate date
    const formattedDate = date.split(":").slice(0, 2).join(":") + ":00";
    const eventDate = new Date(formattedDate);
    const currentDate = new Date();
    if (isNaN(eventDate.getTime()) || eventDate <= currentDate) {
      return "Please provide a valid future event date";
    }

    // Validate totalAvailablePlaces
    if (!totalAvailablePlaces || totalAvailablePlaces <= 0) {
      return "Total available places must be greater than 0";
    }

    // Validate localities
    if (!localities || localities.length === 0) {
      return "At least one locality is required";
    }

    for (const locality of localities) {
      if (!locality.name || locality.name.trim().length === 0) {
        return "Each locality must have a name";
      }
      if (locality.price <= 0) {
        return "Each locality must have a price greater than 0";
      }
      if (locality.maxCapacity <= 0) {
        return "Each locality must have a max capacity greater than 0";
      }
    }

    // Validate eventType
    if (!eventType || eventType.trim().length === 0) {
      return "Event type is required";
    }

    // If all validations pass, return null
    return null;
  };

  /**
   * handles the submission for the create event form
   */
  const handleEventCreate = async () => {
    setError("");
    setSuccess("");

    // Perform validation
    const errorMessage = validateEventData();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const modifiedLocalities = localities.map(
      ({ currentOccupancy, ...rest }) => {
        console.log("Current Occupancy:", currentOccupancy);
        return rest;
      },
    );

    const formattedDate = date.split(":").slice(0, 2).join(":") + ":00";

    try {
      const response = await createEvent({
        name,
        city,
        address,
        date: formattedDate,
        totalAvailablePlaces,
        localities: modifiedLocalities,
        eventImageUrl,
        localitiesImageUrl,
        eventType,
      });
      setSuccess(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  /**
   * Handles the submission for the update event form
   * @returns
   */
  const handleEventUpdate = async () => {
    setError("");
    setSuccess("");

    // Perform validation
    const errorMessage = validateEventData();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const modifiedLocalities = localities.map(
      ({ currentOccupancy, ...rest }) => {
        console.log("Current Occupancy:", currentOccupancy);
        return rest;
      },
    );

    const formattedDate = date.split(":").slice(0, 2).join(":") + ":00";

    try {
      if (!event?.id) {
        setError("The event does not contain an id");
        return;
      }
      const response = await updateEvent({
        id: event.id,
        name,
        city,
        address,
        date: formattedDate,
        totalAvailablePlaces,
        localities: modifiedLocalities,
        eventImageUrl,
        localitiesImageUrl,
        eventType,
      });
      setSuccess(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  /**
   * handles the submission for the delete event
   * @returns
   */
  const handleEventDelete = async () => {
    setError("");
    setSuccess("");

    try {
      if (!event?.id) {
        setError("The event does not contain an id");
        return;
      }
      const response = await deleteEvent(event.id);
      setSuccess(response.message);
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="bg-custom-dark rounded-lg shadow-lg p-6 max-w-5xl mx-auto fade-in">
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
              <i className="fa-solid fa-pen mr-1"></i> Name
            </label>
            <input
              type="text"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-tree-city mr-1"></i> City
            </label>
            <input
              type="text"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-location-dot mr-1"></i> Address
            </label>
            <input
              type="text"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-regular fa-calendar mr-1"></i>Event Date
            </label>
            <input
              type="datetime-local"
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="block text-custom-white mb-2">
              <i className="fa-solid fa-user-group mr-1"></i>Total Available
              Quantity
            </label>
            <input
              className="bg-custom-gray text-slate-50 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter available tickets"
              value={totalAvailablePlaces}
              onChange={(e) => setTotalAvailablePlaces(Number(e.target.value))}
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
              <option value="CONCERT">CONCERT</option>
              <option value="CONFERENCE">CONFERENCE</option>
              <option value="SPORTS">SPORTS</option>
              <option value="THEATER">THEATER</option>
              <option value="FESTIVAL">FESTIVAL</option>
              <option value="WORKSHOP">WORKSHOP</option>
            </select>
          </div>
        </div>

        {/* Image URL input */}
        <div className="mb-4">
          <label className="block text-custom-white font-bold mb-2">
            Event Image
          </label>
          <img
            src={eventImageUrl || "/placeholder.jpg"}
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
            <i className="fa-solid fa-list-ol mr-1"></i> Event Localities
          </label>
          <button
            type="button"
            onClick={addLocality}
            className="mb-4 text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <i className="fa-solid fa-plus mr-1"></i> Add Locality
          </button>

          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left bg-custom-dark border-2 border-blue-400 rounded-xl text-white">
              <thead>
                <tr className="bg-custom-dark text-white">
                  <th className="px-4 py-2 whitespace-nowrap">Name</th>
                  <th className="px-4 py-2 whitespace-nowrap">Price</th>
                  <th className="px-4 py-2 whitespace-nowrap">Max Capacity</th>
                  <th className="px-4 py-2 whitespace-nowrap">
                    Current Occupancy
                  </th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {localities.map((loc, index) => (
                  <tr key={index} className="border-t border-transparent">
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter name"
                        value={loc.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                        placeholder="Enter price"
                        value={loc.price}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "price",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                        placeholder="Enter max capacity"
                        value={loc.maxCapacity}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "maxCapacity",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="bg-transparent border-2 border-blue-400 w-full rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                        value={loc.currentOccupancy}
                        readOnly
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
        </div>

        {/* Locality Image input */}
        <div className="mb-4">
          <label className="block text-custom-white font-bold mb-2">
            Locality Image
          </label>
          <img
            src={localitiesImageUrl || "/placeholder.jpg"}
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

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {event ? (
            <>
              <button
                type="button"
                className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleEventUpdate}
              >
                <i className="fa-solid fa-share mr-1"></i> Update
              </button>
              <button
                type="button"
                className="text-red-500 font-bold p-2 border-4 border-red-400 rounded-xl hover:bg-red-400 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleEventDelete}
              >
                <i className="fa-solid fa-trash mr-1"></i> Delete
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleEventCreate}
            >
              <i className="fa-solid fa-plus mr-1"></i> Add Event
            </button>
          )}
        </div>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}
    </div>
  );
}
