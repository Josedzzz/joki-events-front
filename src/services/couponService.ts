interface CreateCouponCredentials {
  name: string;
  discount: number;
  expirationDate: string;
  minPurchaseAmount: number;
}

interface UpdateCouponCredentials {
  discount: number;
  expirationDate: string;
  minPurchaseAmount: number;
}

interface Coupon {
  id: string;
  name: string;
  discountPercent: number;
  expirationDate: string;
  minPurchaseAmount: number;
  used: boolean;
}

interface ApiResponseCoupons {
  status: string;
  message: string;
  data: {
    totalPages: number;
    currentPage: number;
    content: Coupon[];
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response to get all the coupons
 * @param page the page number to get the events
 * @returns the api response coupons with all the information about the coupons
 */
export const getAllCoupons = async (
  page: number = 0,
): Promise<ApiResponseCoupons> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/get-paginated-coupons?page=${page}`,
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
    const successResponse: ApiResponseCoupons = await response.json();

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

/**
 * Promise function that gets the response for the create coupon
 * @param credentials interface that contains the credentials of the coupon to be created
 * @returns the api response interface with the information about it
 */
export const createCoupon = async (
  credentials: CreateCouponCredentials,
): Promise<ApiResponse> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      "http://localhost:8080/api/admin/create-coupon",
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

    // checks that the json contains the message for the create coupon
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

/**
 * Promise function that gets the response for the update coupon
 * @param credentials interface that contains the credentials of the coupon to be updated
 * @returns the api response interface with the information about it
 */
export const updateCoupon = async (
  couponId: string,
  credentials: UpdateCouponCredentials,
): Promise<ApiResponse> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/update-coupon/${couponId}`,
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

    // checks that the json contains the message for the update coupon
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

/**
 * Promise function that gets the response for the delede coupon
 * @param couponId the id of the coupon to be delede
 * @returns the api response interface with the information about it
 */
export const deleteCoupon = async (couponId: string): Promise<ApiResponse> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/delete-coupon/${couponId}`,
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

    // checks that the json contains the message for the update coupon
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
