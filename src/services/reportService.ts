interface LocalityReport {
  localityName: string;
  ticketsSold: number;
  totalTickets: number;
  soldPercentage: number;
  localityRevenue: number;
}

export interface EventReport {
  eventId: string;
  eventName: string;
  eventCity: string;
  totalRevenue: number;
  localityStats: LocalityReport[];
}

interface ApiResponseReports {
  status: string;
  message: string;
  data: EventReport[];
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the reports
 * @param month the month of the reports
 * @param year the year of the reports
 * @returns the ApiResponseReports with the reports data
 */
export const getReports = async (
  month: string,
  year: string,
): Promise<ApiResponseReports> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/get-report-events?month=${month}&year=${year}`,
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
      console.log(errorResponse);
      throw new Error(errorResponse.message);
    }

    const successResponse: ApiResponseReports = await response.json();

    if ("data" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error obtaining the reports: ", error);
    throw error;
  }
};

export const getReportsPDF = async (
  month: string,
  year: string,
): Promise<void> => {
  // get the cookie token
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authAdminToken="))
    ?.split("=")[1];

  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/get-reports-events-pdf?month=${month}&year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    if (!response.ok) {
      // handle the error response
      const errorResponse = await response.json();
      console.log(errorResponse);
      throw new Error(
        "There are no statistics available for the selected dates to generate a PDF",
      );
    }

    // Convert response to a blob for PDF handling
    const blob = await response.blob();

    // Create a temporary URL for the blob and open/download the PDF
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Report_${year}_${month}.pdf`; // Optional: Set a download filename
    document.body.appendChild(a);
    a.click();

    // Clean up
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error obtaining the PDF report: ", error);
    throw error;
  }
};
