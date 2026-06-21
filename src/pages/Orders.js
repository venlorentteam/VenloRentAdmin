import "./Orders.css";
import { useMemo, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";

import DataTable from "../components/common/DataTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import StatusBadge from "../components/common/StatusBadge";
import Drawer from "../components/common/Drawer";

import { orders } from "../mockData";

const Orders = () => {

const [selectedOrder, setSelectedOrder] =
  useState(null);

const [searchTerm, setSearchTerm] =
  useState("");

const [activeFilter, setActiveFilter] =
  useState("All");

const filteredOrders = useMemo(() => {

  return orders.filter(order => {

    const matchesSearch =

      order.id
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||

      order.customer
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesFilter =

      activeFilter === "All"
        ? true
        : order.status === activeFilter;

    return (
      matchesSearch &&
      matchesFilter
    );

  });

}, [
  searchTerm,
  activeFilter
]);

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
];

  return (
    <AdminLayout>

      <div className="orders-page">

        <div className="orders-stats-grid">

          <div className="orders-stat-card">

            <div className="orders-stat-label">
              Total Orders
            </div>

            <div className="orders-stat-value">
              {orders.length}
            </div>

          </div>

          <div className="orders-stat-card">

            <div className="orders-stat-label">
              Completed
            </div>

            <div className="orders-stat-value">
              {
                orders.filter(
                  order =>
                    order.status ===
                    "Completed"
                ).length
              }
            </div>

          </div>

          <div className="orders-stat-card">

            <div className="orders-stat-label">
              Pending
            </div>

            <div className="orders-stat-value">
              {
                orders.filter(
                  order =>
                    order.status !==
                    "Completed"
                ).length
              }
            </div>

          </div>

          <div className="orders-stat-card">

            <div className="orders-stat-label">
              Cancelled
            </div>

            <div className="orders-stat-value">
              {
                orders.filter(
                  order =>
                    order.status ===
                    "Cancelled"
                ).length
              }
            </div>

          </div>

        </div>

        <div className="orders-toolbar">

          <SearchBar
  placeholder="Search orders..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>

          <FilterBar
  filters={[
    "All",
    "Pending",
    "Completed",
    "Cancelled"
  ]}
  activeFilter={activeFilter}
  onFilterChange={setActiveFilter}
/>
        </div>

        <DataTable
          columns={columns}
          data={filteredOrders}
          renderActions={(row) => (

            <button
              className="order-view-btn"
              onClick={() =>
                setSelectedOrder(row)
              }
            >
              View
            </button>

          )}
        />

        <Drawer
          isOpen={!!selectedOrder}
          onClose={() =>
            setSelectedOrder(null)
          }
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
                <span>
                  {selectedOrder.property}
                </span>
              </div>

              <div className="order-detail-item">
                <strong>Customer</strong>
                <span>
                  {selectedOrder.customer}
                </span>
              </div>

              <div className="order-detail-item">
                <strong>Agent</strong>
                <span>
                  {selectedOrder.agent}
                </span>
              </div>

              <div className="order-detail-item">
                <strong>Amount</strong>
                <span>
                  {selectedOrder.amount}
                </span>
              </div>

              <div className="order-detail-item">
                <strong>Status</strong>

                <StatusBadge
                  status={
                    selectedOrder.status
                  }
                />

              </div>

              <div className="order-detail-item">
                <strong>
                  Reservation Ends
                </strong>

                <span>
                  {
                    selectedOrder.reservationEnds
                  }
                </span>
              </div>

            </div>

          )}

        </Drawer>

      </div>

    </AdminLayout>
  );
};

export default Orders;