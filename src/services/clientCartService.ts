export interface LocalityOrder {
  payingOrderId: string;
  numTicketsSelected: number;
  localityName: string;
  totalPaymentAmount: number;
  eventId: string;
  eventName: string;
  address: string;
  city: string;
  eventDate: string;
  eventImageUrl: string;
  eventType: string;
}

interface ApiResponseLocalities {
  status: string;
  message: string;
  data: {
    totalPages: number;
    currentPage: number;
    content: LocalityOrder[];
  };
}

interface CredentialsDeleteCartLocality {
  eventId: string;
  localityName: string;
  totalPaymentAmount: number;
  ticketsSelected: number;
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response to get all the orders of a client
 * @param page the page number to get all the
 * @returns the api response localities with the cart information of a client
 */
export const getClientShoppingCart = async (
  page: number = 0,
): Promise<ApiResponseLocalities> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(
      `http://localhost:8080/api/clients/load-shopping-cart/${userId}?page=${page}`,
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
    const successResponse: ApiResponseLocalities = await response.json();
    // checks that the json contains the correct format
    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error getting the client shopping cart: ", error);
    throw error;
  }
};

/**
 * Promise function that gets the response for the delete
 * @param credentials the credentials of the locality to be delete
 * @returns the api response with the information about the delete
 */
export const deleteLocalityOrder = async (
  credentials: CredentialsDeleteCartLocality,
): Promise<ApiResponse> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(
      `http://localhost:8080/api/clients/cancel-locality-order/${userId}`,
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

    // checks that the json contains the message for the delete client
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
