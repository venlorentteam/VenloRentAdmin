import api from "./api";

export const login = (credentials) => api.post("/auth/login", credentials);

export const logout = () => {
  localStorage.removeItem("adminToken");
};

export const getProfile = () => api.get("/auth/me");

export default { login, logout, getProfile };
