const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const normalizeTransitSteps = (steps) => {
  if (!Array.isArray(steps)) return [];

  return steps.map((step, index) => {
    const details = step.transitDetails ?? step.transit ?? {};
    const lineObj = details.line ?? step.line ?? null;
    const rawMode = String(
      step.travelMode ??
        step.mode ??
        step.travel_mode ??
        step.type ??
        details.travelMode ??
        details.mode ??
        details.line?.vehicle?.type ??
        "",
    ).toLowerCase();
    const normalizedMode = rawMode.includes("walk")
      ? "walk"
      : rawMode.includes("transit") ||
          rawMode.includes("bus") ||
          rawMode.includes("rail") ||
          rawMode.includes("train") ||
          rawMode.includes("subway") ||
          rawMode.includes("tram")
        ? "transit"
        : rawMode;

    return {
      id: step.id ?? `step-${index}`,
      travelMode: normalizedMode,
      instruction:
        step.instruction ??
        step.instructions ??
        step.htmlInstructions ??
        step.html_instructions ??
        step.instructionText ??
        step.description ??
        details.instruction ??
        "",
      distanceText: step.distanceText ?? step.distance?.text ?? null,
      durationText: step.durationText ?? step.duration?.text ?? null,
      line:
        (typeof lineObj === "string"
          ? lineObj
          : lineObj?.shortName ??
            lineObj?.name ??
            lineObj?.longName ??
            lineObj?.short_name ??
            lineObj?.long_name) ?? null,
      agency:
        details.agency ??
        details.agencies?.[0]?.name ??
        lineObj?.agencies?.[0]?.name ??
        step.agency ??
        null,
      headsign: details.headsign ?? step.headsign ?? null,
      numStops: details.numStops ?? details.num_stops ?? step.numStops ?? null,
      departureTime:
        details.departureTime?.text ??
        details.departureTime ??
        step.departureTime?.text ??
        step.departureTime ??
        null,
      arrivalTime:
        details.arrivalTime?.text ??
        details.arrivalTime ??
        step.arrivalTime?.text ??
        step.arrivalTime ??
        null,
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
