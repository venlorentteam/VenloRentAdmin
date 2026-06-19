import api from "./api";

export const login = (credentials) => api.post("/admin/login", credentials);

export const logout = () => {
  localStorage.removeItem("adminToken");
};

export const getProfile = () => api.get("/admin/profile");

export default { login, logout, getProfile };
