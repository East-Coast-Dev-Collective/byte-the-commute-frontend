const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const fetchRoute = async ({ from, to, mode = "drive" }) => {
  if (!from?.trim() || !to?.trim()) {
    throw new Error("Missing required parameters: from, to");
  }

  const response = await fetch(`${API_BASE_URL}/api/route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: from.trim(),
      to: to.trim(),
      mode,
    }),
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(
      data?.message || `Route request failed (${response.status})`,
    );
  }

  return {
    from: from.trim(),
    to: to.trim(),
    mode,
    distanceText: data?.distanceText ?? null,
    durationText: data?.durationText ?? null,
    polyline: data?.polyline ?? null,
    startLocation: data?.startLocation ?? null,
    endLocation: data?.endLocation ?? null,
    raw: data,
  };
};
