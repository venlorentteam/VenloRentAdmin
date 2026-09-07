import { useState, useEffect, useMemo } from "react";

import "./Payments.css";

import AdminLayout from "../components/layout/AdminLayout";

import DataTable from "../components/common/DataTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import StatusBadge from "../components/common/StatusBadge";
import Drawer from "../components/common/Drawer";
import Loader from "../components/layout/Loader";

import { getPayments } from "../services/paymentService";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await getPayments(token, { limit: 100 });
        setPayments(res.data.items || []);
      } catch (err) {
        setFetchError(err.message || "Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = activeFilter === "All" ? true : payment.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [payments, searchTerm, activeFilter]);

  const columns = [
    { key: "id", label: "Reference" },
    { key: "orderId", label: "Subscription" }, // relabeled — this is no longer an Order reference
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount" },
    { key: "gateway", label: "Gateway" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "date", label: "Date" },
  ];

  return (
    <AdminLayout>
      <div className="payments-page">
        <div className="payments-stats-grid">
          <div className="payments-stat-card">
            <div className="payments-stat-label">Total Payments</div>
            <div className="payments-stat-value">{payments.length}</div>
          </div>
          <div className="payments-stat-card">
            <div className="payments-stat-label">Successful</div>
            <div className="payments-stat-value">{payments.filter((p) => p.status === "Successful").length}</div>
          </div>
          <div className="payments-stat-card">
            <div className="payments-stat-label">Pending</div>
            <div className="payments-stat-value">{payments.filter((p) => p.status === "Pending").length}</div>
          </div>
          <div className="payments-stat-card">
            <div className="payments-stat-label">Failed</div>
            <div className="payments-stat-value">{payments.filter((p) => p.status === "Failed").length}</div>
          </div>
          <div className="payments-stat-card">
            <div className="payments-stat-label">Refunded</div>
            <div className="payments-stat-value">{payments.filter((p) => p.status === "Refunded").length}</div>
          </div>
        </div>

        <div className="payments-toolbar">
          <SearchBar
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterBar
            filters={["All", "Successful", "Pending", "Failed", "Refunded"]}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {fetchError && <div className="error-message">{fetchError}</div>}
        {loading && <Loader />}

        <DataTable
          columns={columns}
          data={filteredPayments}
          renderActions={(row) => (
            <button className="payment-view-btn" onClick={() => setSelectedPayment(row)}>
              View
            </button>
          )}
        />

        <Drawer isOpen={!!selectedPayment} onClose={() => setSelectedPayment(null)} title="Payment Details">
          {selectedPayment && (
            <div className="payment-detail-grid">
              <div className="payment-detail-item"><strong>Reference</strong><span>{selectedPayment.id}</span></div>
              <div className="payment-detail-item"><strong>Subscription</strong><span>{selectedPayment.orderId}</span></div>
              <div className="payment-detail-item"><strong>Customer</strong><span>{selectedPayment.customer}</span></div>
              <div className="payment-detail-item"><strong>Amount</strong><span>{selectedPayment.amount}</span></div>
              <div className="payment-detail-item"><strong>Gateway</strong><span>{selectedPayment.gateway}</span></div>
              <div className="payment-detail-item">
                <strong>Status</strong>
                <StatusBadge status={selectedPayment.status} />
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </AdminLayout>
  );
};

export default Payments;