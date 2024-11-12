interface signupCredentials {
  idCard: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

interface SuccessResponse {
  status: string;
  message: string;
  data: string;
  token: string;
}

interface ErrorResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response of the sign up
 * @param credentials interface that contains the sign up credentials
 * @returns  the id of the client in a json
 */
export const signup = async (
  credentials: signupCredentials,
): Promise<SuccessResponse> => {
  try {
    const response = await fetch(
      "https://localhost:8080/auth/register-client",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    if (!response.ok) {
      // Handle the error response
      const errorResponse: ErrorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // Read the response as a json
    const signupResponse: SuccessResponse = await response.json();

    // Check that the json contains a token for the sign up
    if ("token" in signupResponse) {
      return signupResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during sign up", error);
    throw error;
  }
};
