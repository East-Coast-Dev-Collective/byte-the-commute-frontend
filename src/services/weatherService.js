const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const getWeather = async ({ lat, lng }) => {
  void lat;
  void lng;
  void API_BASE_URL;

  if (lat == null || lng == null) {
    throw new Error("Missing required parameters: lat, lng");
  }

  throw new Error("fetchWeather() not implemented yet.");
};
