interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the link to let the user do the payment on paypal
 * @returns the api response with the link and an information message
 */
export const getLinkClientPayment = async (): Promise<ApiResponse> => {
  // get the cookie token of the user
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(
      `https://joki-events-production.up.railway.app/api/payment/${userId}/create-payment`,
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

    // checks that the json contains the data (link to do the payment)
    if ("data" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the payment: ", error);
    throw error;
  }
};

/**
 * Promise function to aply a coupon on a shoppingCart
 * @returns the api response with the message
 */
export const applyCoupon = async (couponName: string): Promise<ApiResponse> => {
  // get the cookie token of the user
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(
      `https://joki-events-production.up.railway.app/api/client/${userId}/apply-coupon?couponName=${couponName}`,
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

    // checks that the json contains the message
    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the payment: ", error);
    throw error;
  }
};
