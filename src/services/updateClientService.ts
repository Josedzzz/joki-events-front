interface ClientInfo {
  idCard: string;
  phone: string;
  email: string;
  name: string;
  address: string;
}

interface ClientInfoResponse {
  status: string;
  message: string;
  data: ClientInfo;
}

interface UpdateClientCredentials {
  idCard: string;
  phone: string;
  email: string;
  name: string;
  address: string;
}

interface ApiTokenResponse {
  status: string;
  message: string;
  data: string;
  token: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response for the updated client data
 * @param credentials the credentials to be updated
 * @returns the api response interface with the information about it
 */
export const updateClient = async (
  credentials: UpdateClientCredentials,
): Promise<ApiTokenResponse> => {
  const userId = localStorage.getItem("userId");

  // Get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/clients/${userId}/update`,
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
    const successResponse: ApiTokenResponse = await response.json();

    // checks that the json contains the message for the update
    if ("token" in successResponse) {
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
 * Promise function that gets the client account information
 * @returns the ClientInfoResponse interface with all the information about it
 */
export const getClientAccountInfo = async (): Promise<ClientInfoResponse> => {
  // get the user id from the local storage
  const userId = localStorage.getItem("userId");

  // gets the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/clients/get-client-account-info/${userId}`,
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
    const successResponse: ClientInfoResponse = await response.json();

    // Check that the json contains the expected data structure
    if ("data" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during fetching the user info:", error);
    throw error;
  }
};

/**
 * Promise function that gets the response format for the delete client form
 * @param clientId the id of the client to be delete
 * @returns the api response interface with the information about it
 */
export const deleteClientAccount = async (): Promise<ApiResponse> => {
  const userId = localStorage.getItem("userId");

  // gets the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/clients/${userId}/delete`,
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
