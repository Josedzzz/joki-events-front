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

interface UpdateEventCredentials {
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
 * Promise function that gets the response to get all the events
 * @param page the page number to get the events
 * @returns the api response events with all the information about the events
 */
export const getAllEvents = async (
  page: number = 0,
): Promise<ApiResponseEvents> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `https://joki-events-production.up.railway.app/api/admin/get-paginated-events?page=${page}`,
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
    console.error("Error during the create: ", error);
    throw error;
  }
};

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
      "https://joki-events-production.up.railway.app/api/admin/create-event",
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
      console.log(errorResponse);
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

/**
 * Promise function that gets the response for the update event
 * @param credentials contains the credentials of the event to be updated
 * @returns the api response with the information about it
 */
export const updateEvent = async (
  eventId: string,
  credentials: UpdateEventCredentials,
): Promise<ApiResponse> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `https://joki-events-production.up.railway.app/api/admin/${eventId}/update-event`,
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

    // checks that the json contains the message for the update coupon
    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the delete:", error);
    throw error;
  }
};

/**
 * Promise function that gets the response for the delete event
 * @param eventId the id of the coupon to be deleted
 * @returns the api response interface with the information about it
 */
export const deleteEvent = async (eventId: string): Promise<ApiResponse> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `https://joki-events-production.up.railway.app/api/admin/${eventId}/delete-event`,
      {
        method: "POST",
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
    const successResponse: ApiResponse = await response.json();

    // checks that the json contains the message for the update coupon
    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the update:", error);
    throw error;
  }
};
