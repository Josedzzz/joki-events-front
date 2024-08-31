interface signupCredentials {
  idCard: string;
  name: string;
  address: string;
  phone: string;
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
 * Promise function that gets the response of the sign up
 * @param credentials interface that contains the sign up credentials
 * @returns  the id of the client in a json
 */
export const signup = async (
  credentials: signupCredentials
): Promise<string> => {
  try {
    const response = await fetch("http://localhost:3000/api/clients/register", {
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
    const signupResponse: SuccessResponse = await response.json();

    // Check that the json contains an id
    if ("id" in signupResponse) {
      return signupResponse.id;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during sign up", error);
    throw error;
  }
};
