import api from "./api";

export const login = (credentials) => api.post("/admin/login", credentials);

export const logout = () => localStorage.removeItem("token");

export const getProfile = (token) => api.get("/admin/me", {
  headers: { Authorization: `Bearer ${token}` }
})

const authService = { login, logout, getProfile }
export default authService;