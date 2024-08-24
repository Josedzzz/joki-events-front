interface LoginCredentials {
  email: string;
  password: string;
}

interface SuccessResponse {
  id: string;
}

interface ErrorResponse {
  message: string;
}

/**
 * Promise function that gets the response for the login
 * @param credentials interface that contains the login credentials
 * @returns the id of the client in a json
 */
export const login = async (credentials: LoginCredentials): Promise<string> => {
  try {
    const response = await fetch("http://localhost:3000/api/clients/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // Handle the error response
      const errorResponse: ErrorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // Read the response as a json
    const loginResponse: SuccessResponse = await response.json();

    // chek that the json contains an id
    if ("id" in loginResponse) {
      return loginResponse.id;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error; 
  }
};
