const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const normalizeTransitSteps = (steps) => {
  if (!Array.isArray(steps)) return [];

  return steps.map((step, index) => {
    const details = step.transitDetails ?? step.transit ?? {};
    const lineObj = details.line ?? step.line ?? null;

    return {
      id: step.id ?? `step-${index}`,
      travelMode: (step.travelMode ?? step.mode ?? "").toLowerCase(),
      instruction:
        step.instruction ?? step.instructions ?? step.htmlInstructions ?? "",
      distanceText: step.distanceText ?? step.distance?.text ?? null,
      durationText: step.durationText ?? step.duration?.text ?? null,
      line: (typeof lineObj === "string" ? lineObj : lineObj?.name) ?? null,
      agency:
        details.agency ?? details.agencies?.[0]?.name ?? step.agency ?? null,
      headsign: details.headsign ?? step.headsign ?? null,
      numStops: details.numStops ?? step.numStops ?? null,
      departureTime: details.departureTime ?? step.departureTime ?? null,
      arrivalTime: details.arrivalTime ?? step.arrivalTime ?? null,
    };
  });
};

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
      data?.message ||
        data?.error ||
        `Route request failed (${response.status})`,
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
    transitSteps: normalizeTransitSteps(data?.transitSteps),
    raw: data,
  };
};
