interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

interface SendVerificationCodeCredentials {
  email: string;
}

interface RecoverPasswordCredentials {
  email: string;
  verificationCode: string;
  newPassword: string;
}

/**
 * Promise function that gets the response for the sended password code
 * @param email the email where the recover code arrives
 * @returns the response message
 */
export const sendRecoverPasswordCode = async (
  credentials: SendVerificationCodeCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/auth/send-recover-password-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

    // checks that the json contains the response message
    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error sending the verification code", error);
    throw error;
  }
};

/**
 * Promise function to get the response for the updated password
 * @param credentials the credentials to updated the new password
 * @returns the response interface with the message
 */
export const recoverPasswordCode = async (
  credentials: RecoverPasswordCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/auth/recover-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

    // checks that the json contains the response message
    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
