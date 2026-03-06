const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const getWeather = async ({ lat, lng }) => {
  if (lat == null || lng == null) {
    throw new Error("Missing required parameters: lat, lng");
  }

  const url = new URL(`${API_BASE_URL}/api/weather`);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lng", String(lng));

  const response = await fetch(url);
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || `Weather request failed (${response.status})`,
    );
  }

  return {
    temperature: data?.temperature ?? null,
    condition: data?.condition ?? null,
    icon: data?.icon ?? null,
    feelsLike: data?.feelsLike ?? null,
    iconUrl: data?.icon
      ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
      : null,
    raw: data,
  };
};
