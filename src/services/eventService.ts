interface CreateEventCredentials {
  name: string;
  city: string;
  address: string;
  date: string;
  totalAvailablePlaces: number;
  localities: Locality[];
  eventImageUrl: string;
  localitiesImageUrl: string;
  eventType: string;
}

interface Locality {
  name: string;
  price: number;
  maxCapacity: number;
}

interface ApiEventResponse {
  status: string;
  message: string;
  data: {
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
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response for the create event
 * @param credentials interface that contains the credentials of the event to be created
 * @returns the api response with the information about it
 */
export const createEvent = async (
  credentials: CreateEventCredentials,
): Promise<ApiResponse> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      "http://localhost:8080/api/admin/create-event",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(credentials),
      },
    );

    if (!response.ok) {
      // handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // read the response as a json
    const successResponse: ApiResponse = await response.json();

    // checks that the json contains the data
    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the update:", error);
    throw error;
  }
};
