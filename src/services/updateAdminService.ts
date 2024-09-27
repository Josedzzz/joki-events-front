interface AdminInfo {
  username: string;
  email: string;
}

interface AdminInfoResponse {
  status: string;
  message: string;
  data: AdminInfo;
}

interface updateAdminCredentials {
  username: string;
  email: string;
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
 * Promise function that gets the response for the updated admin data
 * @param credentials interface that contains the updateAdminCredentials
 * @returns the api response interface with the information about it
 */
export const updateAdmin = async (
  credentials: updateAdminCredentials,
): Promise<ApiTokenResponse> => {
  const adminId = localStorage.getItem("adminId");

  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  console.log(authToken);

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/${adminId}/update/`,
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
 * Promise function that gets the admin account information
 * @returns the api response interface with the admin information
 */
export const getAdminAccountInfo = async (): Promise<AdminInfoResponse> => {
  // Get the admin ID from local storage
  const adminId = localStorage.getItem("adminId");

  // Get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/get-admin-account-info/${adminId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    if (!response.ok) {
      // Handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // Read the response as JSON
    const successResponse: AdminInfoResponse = await response.json();

    // Check that the json contains the expected data structure
    if ("data" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during fetching admin info:", error);
    throw error;
  }
};
