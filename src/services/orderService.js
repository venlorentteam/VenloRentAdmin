import api from "./api";

export const getAdminOrders = (token, params = {}) => {
  const query = new URLSearchParams();

  if (params.page) {
    query.set("page", String(params.page));
  }

  if (params.limit) {
    query.set("limit", String(params.limit));
  }

  if (params.status && params.status !== "All") {
    query.set("status", String(params.status).toLowerCase());
  }

  if (params.search) {
    query.set("search", String(params.search).trim());
  }

  const suffix = query.toString() ? `?${query.toString()}` : "";

  return api.get(`/admin/orders${suffix}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default { getAdminOrders };
