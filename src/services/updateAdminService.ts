interface updateAdminCredentials {
  username: string;
  email: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response for the updated admin data
 * @param credentials interface that contains the updateAdminCredentials
 * @returns the api response interface with the information about it
 */
export const updateAdmin = async (
  credentials: updateAdminCredentials,
): Promise<ApiResponse> => {
  const adminId = localStorage.getItem("adminId");

  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  console.log(authToken);

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/${adminId}/update`,
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

    // checks that the json contains the message for the update
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
