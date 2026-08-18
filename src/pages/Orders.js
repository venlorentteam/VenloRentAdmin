import "./Orders.css";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import Loader from "../components/layout/Loader";

import DataTable from "../components/common/DataTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import StatusBadge from "../components/common/StatusBadge";
import Drawer from "../components/common/Drawer";

import { getAdminOrders } from "../services/orderService";

const ORDER_FILTERS = ["All", "Pending", "Accepted", "Completed", "Cancelled", "Expired"];

const normalizeText = (value = "") => value.toString().toLowerCase().trim();

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setFetchError("Missing admin token. Please log in again.");
        return;
      }

      setIsLoading(true)

      try {
        const res = await getAdminOrders(token);
        setOrders(res.data?.orders || []);
        setFetchError(null)
      } catch (error) {
        setFetchError(error.response?.data?.message || error.message || "Failed to fetch orders");
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const filteredOrders = useMemo(() => {
    const search = normalizeText(searchTerm)
    const filter = normalizeText(activeFilter)

    return orders.filter((order) => {
      const matchesSearch =
        normalizeText(order.id).includes(search) ||
        normalizeText(order.property).includes(search) ||
        normalizeText(order.customer).includes(search) ||
        normalizeText(order.agent).includes(search) ||
        normalizeText(order.status).includes(search);

      const matchesFilter = filter === "all" ? true : normalizeText(order.status) === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, searchTerm, activeFilter]);

  const totalOrders = orders.length;
  const completedOrders = orders.filter((order) => normalizeText(order.status) === "completed").length;
  const pendingOrders = orders.filter((order) => ["pending", "accepted"].includes(normalizeText(order.status))).length;
  const cancelledOrders = orders.filter((order) => ["cancelled", "rejected", "expired"].includes(normalizeText(order.status))).length;

  const columns = [
    {
      key: "id",
      label: "Order ID",
    },
    {
      key: "customer",
      label: "Customer",
    },
    {
      key: "agent",
      label: "Agent",
    },
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "status",
      label: "Status",

      render: (row) => (
        <StatusBadge
          status={row.status}
        />
      ),
    },
    {
      key: "createdAt",
      label: "Created",
    },
  ]

  return (
    <AdminLayout>
      <div className="orders-page">
        {isLoading && <Loader />}

        <div className="orders-stats-grid">
          <div className="orders-stat-card">
            <div className="orders-stat-label">
              Total Orders
            </div>
            <div className="orders-stat-value">
              {totalOrders}
            </div>
          </div>
          <div className="orders-stat-card">
            <div className="orders-stat-label">
              Completed
            </div>
            <div className="orders-stat-value">
              {completedOrders}
            </div>
          </div>
          <div className="orders-stat-card">
            <div className="orders-stat-label">
              Pending
            </div>
            <div className="orders-stat-value">
              {pendingOrders}
            </div>
          </div>
          <div className="orders-stat-card">
            <div className="orders-stat-label">
              Cancelled
            </div>
            <div className="orders-stat-value">
              {cancelledOrders}
            </div>
          </div>
        </div>

        <div className="orders-toolbar">
          <SearchBar
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterBar
            filters={ORDER_FILTERS}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {fetchError && <div className="error-message">{fetchError}</div>}

        <DataTable
          columns={columns}
          data={filteredOrders}
          renderActions={(row) => (
            <button
              className="order-view-btn"
              onClick={() => setSelectedOrder(row)}
            >
              View
            </button>
          )}
        />

        {!isLoading && filteredOrders.length === 0 && (
          <div className="empty-message">No orders found.</div>
        )}

        <Drawer
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title="Order Details"
        >
          {selectedOrder && (
            <div className="order-detail-grid">
              <div className="order-detail-item">
                <strong>Order ID</strong>
                <span>{selectedOrder.id}</span>
              </div>
              <div className="order-detail-item">
                <strong>Property</strong>
                <span>{selectedOrder.property}</span>
              </div>
              <div className="order-detail-item">
                <strong>Customer</strong>
                <span>{selectedOrder.customer}</span>
              </div>
              <div className="order-detail-item">
                <strong>Agent</strong>
                <span>{selectedOrder.agent}</span>
              </div>
              <div className="order-detail-item">
                <strong>Amount</strong>
                <span>{selectedOrder.amount}</span>
              </div>
              <div className="order-detail-item">
                <strong>Status</strong>
                <StatusBadge status={selectedOrder.status} />
              </div>
              <div className="order-detail-item">
                <strong>Payment Status</strong>
                <StatusBadge status={selectedOrder.paymentStatus} />
              </div>
              <div className="order-detail-item">
                <strong>Reservation Ends</strong>
                <span>{selectedOrder.reservationEnds}</span>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </AdminLayout>
  );
};

export default Orders;
