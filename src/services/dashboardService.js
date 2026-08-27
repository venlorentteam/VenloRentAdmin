import api from "./api";

export const getDashboardOverview = (token) =>
  api.get("/admin/dashboard/overview", {
    headers: { Authorization: `Bearer ${token}` },
  });

const dashboardService = { getDashboardOverview };

export default dashboardService;
