const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const getRoute = async ({ from, to, mode: _mode = "drive" }) => {
  void from;
  void to;
  void _mode;
  void API_BASE_URL;

  if (!from || !to) {
    throw new Error("Missing required parameters: from, to");
  }
  throw new Error("fetchRoute() not implemented yet.");
};

export const autocompletePlaces = async (query) => {
  if (!query) return [];
  throw new Error("autocompletePlaces() not implemented yet.");
};
