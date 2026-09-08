import "./Orders.css";
import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout"
import Loader from "../components/layout/Loader"

import DataTable from "../components/common/DataTable"
import SearchBar from "../components/common/SearchBar"
import FilterBar from "../components/common/FilterBar"
import StatusBadge from "../components/common/StatusBadge"
import Drawer from "../components/common/Drawer"
import PaginationControls from "../components/common/PaginationControls";

import { getAdminOrders } from "../services/orderService"
import usePaginatedResource from "../hooks/usePaginatedResource";

const ORDER_FILTERS = ["All", "Pending", "Accepted", "Completed", "Cancelled", "Expired"];
const normalizeText = (value = "") => value.toString().toLowerCase().trim();

//Main Component
const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchOrders = ({ page, limit }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Missing admin token. Please log in again.");
    }

    return getAdminOrders(token, {
      page,
      limit,
      search: searchTerm,
      status: activeFilter,
    })
  }

  const {
    items: orders,
    pagination,
    summary,
    loading: isLoading,
    error: fetchError,
    goToPage,
    setLimit,
  } = usePaginatedResource({
    fetchPage: fetchOrders,
    initialLimit: 10,
    deps: [searchTerm, activeFilter],
  });

  const totalOrders = summary.totalOrders ?? pagination.totalItems ?? orders.length;
  const completedOrders =
    summary.completedOrders ?? orders.filter((order) => normalizeText(order.status) === "completed").length;
  const pendingOrders =
    summary.pendingOrders ??
    orders.filter((order) => ["pending", "accepted"].includes(normalizeText(order.status))).length;
  const cancelledOrders =
    summary.cancelledOrders ??
    orders.filter((order) => ["cancelled", "rejected", "expired"].includes(normalizeText(order.status))).length;

  const columns = [
    {
      key: "serial",
      label: "#",
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
    }
  ]
  const tableOrders = orders.map((order, index) => ({
    ...order,
    serial: (pagination.page - 1) * pagination.limit + index + 1,
  }));

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
            placeholder="Search orders by ID..."
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
          data={tableOrders}
          renderActions={(row) => (
            <button
              className="order-view-btn"
              onClick={() => setSelectedOrder(row)}
            >
              View
            </button>
          )}
        />

        {!isLoading && orders.length === 0 && (
          <div className="empty-message">No orders found.</div>
        )}

        <PaginationControls
          pagination={pagination}
          onPageChange={goToPage}
          onLimitChange={setLimit}
        />

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
}

export default Orders;
