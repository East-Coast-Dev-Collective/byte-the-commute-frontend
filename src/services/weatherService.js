const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const getWeather = async ({ lat, lng }) => {
  // void lat;
  // void lng;
  // void API_BASE_URL;

  if (lat == null || lng == null) {
    throw new Error("Missing required parameters: lat, lng");
  }

  // throw new Error("fetchWeather() not implemented yet.");

  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
  });

  const response = await fetch(`${API_BASE_URL}/api/weather?${params}`);

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Weather request failed (${response.status})`,
    );
  }

  return data;
};
