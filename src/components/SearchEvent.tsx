import { useState } from "react";
import { SearchEventCredentials } from "../services/clientEventService";

interface SearchEventProps {
  onSearch: (credentials: SearchEventCredentials) => void;
}

export default function SearchEvent({ onSearch }: SearchEventProps) {
  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  /**
   * Handle the search button click and send the search credentials
   */
  const handleSearch = () => {
    const credentials: SearchEventCredentials = {
      eventName: searchType === "name" ? searchValue : "",
      city: searchType === "city" ? searchValue : "",
      startDate: searchType === "startDate" ? searchValue : "",
      endDate: searchType === "endDate" ? searchValue : "",
      eventType: searchType === "eventType" ? searchValue : null,
    };
    onSearch(credentials);
  };

  /**
   * handle the clear button click and send an empty search credentials to clear all the filters
   */
  const clearSearch = () => {
    const credentials: SearchEventCredentials = {
      eventName: "",
      city: "",
      startDate: "",
      endDate: "",
      eventType: null,
    };
    onSearch(credentials);
  };

  /**
   * Render input field based on the selected search type
   */
  const renderInputField = () => {
    if (searchType === "startDate" || searchType === "endDate") {
      return (
        <input
          type="date"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full sm:w-2/4 bg-custom-gray text-slate-50 pl-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      );
    } else if (searchType === "eventType") {
      return (
        <select
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full sm:w-2/4 bg-custom-gray text-slate-50 pl-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select event type</option>
          <option value="CONCERT">Concert</option>
          <option value="CONFERENCE">Conference</option>
          <option value="SPORTS">Sports</option>
          <option value="THEATER">Theater</option>
          <option value="FESTIVAL">Festival</option>
          <option value="WORKSHOP">Workshop</option>
        </select>
      );
    } else {
      return (
        <input
          type="text"
          placeholder="Enter your search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full sm:w-2/4 bg-custom-gray text-slate-50 pl-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      );
    }
  };

  return (
    <div className="relative mb-6 flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
      {/* ComboBox for search type */}
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="w-full sm:w-3/12 bg-custom-gray text-slate-50 px-5 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="name">Search by name</option>
        <option value="city">Search by city</option>
        <option value="startDate">Search by start date</option>
        <option value="endDate">Search by end date</option>
        <option value="eventType">Search by event type</option>
      </select>

      {/* Search input field (changes based on search type) */}
      <div className="relative w-full">
        {renderInputField()}
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-50"></i>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="w-full sm:w-auto flex flex-row text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Search
      </button>

      {/* Clear button */}
      <button
        onClick={clearSearch}
        className="w-full sm:w-auto flex flex-row text-slate-50 font-bold p-2 border-4 border-blue-400 rounded-xl hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Clear
      </button>
    </div>
  );
}
