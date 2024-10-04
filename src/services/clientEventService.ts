interface Event {
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

interface ApiResponseEvents {
  status: string;
  message: string;
  data: {
    totalPages: number;
    currentPage: number;
    content: Event[];
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response to get all events
 * @param page the page number to get the events
 * @returns the api response events with all
 */
export const getAllClientEvents = async (
  page: number = 0,
): Promise<ApiResponseEvents> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/clients/get-paginated-events?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    if (!response.ok) {
      // handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // read the response as a json
    const successResponse: ApiResponseEvents = await response.json();
    // checks that the json contains the correct format
    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the update: ", error);
    throw error;
  }
};
