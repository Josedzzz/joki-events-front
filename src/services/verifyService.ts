interface VerifyCodeCredentials {
  verificationCode: string;
}

interface Response {
  message: string;
}

export const verifyCode = async (
  credentials: VerifyCodeCredentials,
): Promise<string> => {
  const clientId = localStorage.getItem("userId");

  // Get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/clients/${clientId}/verify`,
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
      // Handle the error response
      const errorResponse: Response = await response.json();
      throw new Error(errorResponse.message);
    }

    // Read the response as a json
    const succesResponse: Response = await response.json();
    return succesResponse.message;
  } catch (error) {
    console.error("Error during verify", error);
    throw error;
  }
};
