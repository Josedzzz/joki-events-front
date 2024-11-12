import Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode"; // Cambiar la importación

interface DecodedToken extends jwt_decode.JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

/**
 * Get the token and check it's lifetime
 */
export const refreshJwtToken = async () => {
  const token = Cookies.get("authToken");

  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const decodedToken: DecodedToken = jwt_decode.jwtDecode(token);

    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    const refreshThreshold = 5 * 60 * 1000; // 5 minutos antes de la expiracion

    if (timeUntilExpiration < refreshThreshold) {
      const response = await fetch("http://localhost:8080/auth/refresh-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const newToken = data.token;
        Cookies.set("authToken", newToken, { expires: 1 });
        console.log("Token refreshed successfully");
      } else {
        console.error(
          "Error refreshing token:",
          data.message || "Unknown error",
        );
      }
    }
  } catch (error) {
    console.error("Error decoding or refreshing token:", error);
  }
};

/**
 * Get the token and check it's lifetime
 */
export const refreshJwtTokenAdmin = async () => {
  const token = Cookies.get("authAdminToken");

  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const decodedToken: DecodedToken = jwt_decode.jwtDecode(token);

    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    const refreshThreshold = 5 * 60 * 1000; // 5 minutos antes de la expiracion

    if (timeUntilExpiration < refreshThreshold) {
      const response = await fetch("http://localhost:8080/auth/refresh-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const newToken = data.token;
        Cookies.set("authAdminToken", newToken, { expires: 1 });
        console.log("Token refreshed successfully");
      } else {
        console.error(
          "Error refreshing token:",
          data.message || "Unknown error",
        );
      }
    }
  } catch (error) {
    console.error("Error decoding or refreshing token:", error);
  }
};
