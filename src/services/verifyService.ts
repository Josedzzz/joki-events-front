interface VerifyCodeCredentials {
  id: string;
  verificationCode: string;
}

interface Response {
  message: string;
}

export const verifyCode = async (
  credentials: VerifyCodeCredentials
): Promise<string> => {
  try {
    const response = await fetch("http://localhost:3000/api/clients/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

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
