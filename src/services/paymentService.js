import api from "./api";

export const getPayments = (token, { page, limit, status, search } = {}) =>
  api.get(`/admin/payments`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit, status, search },
  })

//export default { getPayments }