const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const register = async ({
  email,
  password,
  displayName: _displayName,
}) => {
  void email;
  void password;
  void _displayName;
  void API_BASE_URL;

  if (!email || !password) {
    throw new Error("register requires email and password.");
  }

  throw new Error(
    "register() not implemented yet. TODO: implement auth register.",
  );
};

export const login = async ({ email, password }) => {
  void email;
  void password;
  void API_BASE_URL;

  if (!email || !password) {
    throw new Error("login requires email and password.");
  }

  // TODO: Implement later
  throw new Error("login() not implemented yet. TODO: implement auth login.");
};

export const logout = async () => {
  void API_BASE_URL;

  throw new Error("logout() not implemented yet. TODO: implement auth logout.");
};

export const getCurrentUser = async () => {
  void API_BASE_URL;

  throw new Error(
    "getCurrentUser() not implemented yet. TODO: implement session fetch.",
  );
};
