export interface Purchase {
  id: string;
  clientId: string;
  purchaseDate: string;
  purchasedItems: PurchasedItem[];
  totalAmount: number;
  paymentMethod: string;
}

interface PurchasedItem {
  eventId: string;
  payingOrderId: string | null;
  numTicketsSelected: number;
  localityName: string;
  totalPaymentAmount: number;
}

interface ApiResponsePurchase {
  status: string;
  message: string;
  data: {
    totalPages: number;
    currentPage: number;
    content: Purchase[];
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response to get history
 * @param page the page number
 * @returns the api response puchase with all the purchases
 */
export const getAllCoupons = async (
  page: number = 0,
): Promise<ApiResponsePurchase> => {
  // get the user id from the local storage
  const userId = localStorage.getItem("userId");

  // gets the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${userId}/purchase-history?page=${page}`,
      {
        method: "GET",
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
    const successResponse: ApiResponsePurchase = await response.json();

    // checks that the json contains the data for the coupons
    if (successResponse.data && successResponse.data.content) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the update:", error);
    throw error;
  }
};
