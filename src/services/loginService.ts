interface LoginCredentialsUser {
  email: string;
  password: string;
}

interface LoginCredentialsAdmin {
  username: string;
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
 * Promise function that gets the response for the login
 * @param credentials interface that contains the login credentials
 * @returns the id of the client in a json
 */
export const login = async (
  credentials: LoginCredentialsUser | LoginCredentialsAdmin,
  typeUser: string,
): Promise<SuccessResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/auth/login-${typeUser}`,
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
    const loginResponse: SuccessResponse = await response.json();

    // chek that the json contains a token for the login
    if ("token" in loginResponse) {
      return loginResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
