import { useState, useEffect } from "react"

import "./Payments.css"

import AdminLayout from "../components/layout/AdminLayout"

import DataTable from "../components/common/DataTable"
import SearchBar from "../components/common/SearchBar"
import FilterBar from "../components/common/FilterBar"
import StatusBadge from "../components/common/StatusBadge"
import Drawer from "../components/common/Drawer"
import Loader from "../components/layout/Loader"
import PaginationControls from "../components/common/PaginationControls"
import usePaginatedResource from "../hooks/usePaginatedResource"

import { getPayments } from "../services/paymentService"

const PAYMENT_FILTERS = ["All", "Successful", "Pending", "Failed", "Refunded"]

const Payments = () => {
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  // Debounce search input — same pattern as Moderations.js.
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(searchInput), 400)
    return () => clearTimeout(id);
  }, [searchInput])

  const fetchPayments = ({ page, limit }) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Missing admin token.")
    return getPayments(token, {
      page,
      limit,
      search: searchTerm,
      status: activeFilter, // backend already normalizes "All" → no filter
    })
  }

  const {
    items: payments,
    pagination,
    summary,
    loading,
    error,
    goToPage,
    setLimit,
  } = usePaginatedResource({
    fetchPage: fetchPayments,
    initialLimit: 10,
    deps: [searchTerm, activeFilter],
  })

  const columns = [
    { key: "id", label: "Reference" },
    { key: "orderId", label: "Subscription" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount" },
    { key: "gateway", label: "Gateway" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "date", label: "Date" },
  ]

  return (
    <AdminLayout>
      <div className="payments-page">
        <div className="payments-stats-grid">
          <div className="payments-stat-card">
            <div className="payments-stat-label">Total Payments</div>
            <div className="payments-stat-value">{summary.totalPayments ?? 0}</div>
          </div>
          <div className="payments-stat-card">
            <div className="payments-stat-label">Successful</div>
            <div className="payments-stat-value">{summary.successfulPayments ?? 0}</div>
          </div>
          <div className="payments-stat-card">
            <div className="payments-stat-label">Pending</div>
            <div className="payments-stat-value">{summary.pendingPayments ?? 0}</div>
          </div>
          <div className="payments-stat-card">
            <div className="payments-stat-label">Failed</div>
            <div className="payments-stat-value">{summary.failedPayments ?? 0}</div>
          </div>
          <div className="payments-stat-card">
            <div className="payments-stat-label">Refunded</div>
            <div className="payments-stat-value">{summary.refundedPayments ?? 0}</div>
          </div>
        </div>

        <div className="payments-toolbar">
          <SearchBar
            placeholder="Search payments..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <FilterBar
            filters={PAYMENT_FILTERS}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading && <Loader />}

        {!loading && payments.length === 0 && (
          <div className="empty-message">No payments found.</div>
        )}

        {!loading && payments.length > 0 && (
          <>
            <DataTable
              columns={columns}
              data={payments}
              renderActions={(row) => (
                <button className="payment-view-btn" onClick={() => setSelectedPayment(row)}>
                  View
                </button>
              )}
            />

            <PaginationControls
              pagination={pagination}
              onPageChange={goToPage}
              onLimitChange={setLimit}
            />
          </>
        )}

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
  )
}

export default Payments