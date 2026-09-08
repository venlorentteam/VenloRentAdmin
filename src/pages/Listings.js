import "./Listings.css";
import { useState } from "react";

import AdminLayout from "../components/layout/AdminLayout";
import StatusBadge from "../components/common/StatusBadge";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import Loader from "../components/layout/Loader";
import PaginationControls from "../components/common/PaginationControls";
import ListingDetailsDrawer from "../components/listings/ListingDetailsDrawer";

import usePaginatedResource from "../hooks/usePaginatedResource";
import { getAdminListings } from "../services/adminListingService";

const LISTING_FILTERS = ["All", "Approved", "Pending", "Flagged", "Rejected"];

const Listings = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchListings = ({ page, limit }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Missing admin token. Please log in again.");
    }

    return getAdminListings(token, {
      page,
      limit,
      search: searchTerm,
      status: activeFilter,
    });
  };

  const {
    items: listings,
    pagination,
    summary,
    loading,
    error,
    goToPage,
    setLimit,
  } = usePaginatedResource({
    fetchPage: fetchListings,
    initialLimit: 12,
    deps: [searchTerm, activeFilter],
  });

  const totalListings = summary.totalListings ?? pagination.totalItems ?? listings.length;
  const approvedListings = summary.approvedListings ?? 0;
  const pendingListings = summary.pendingListings ?? 0;
  const flaggedListings = summary.flaggedListings ?? 0;

  return (
    <AdminLayout>
      <div className="listings-page">
        {loading && <Loader />}

        <div className="listings-stats-grid">
          <div className="listings-stat-card">
            <div className="listings-stat-label">Total Listings</div>
            <div className="listings-stat-value">{totalListings}</div>
          </div>

          <div className="listings-stat-card">
            <div className="listings-stat-label">Approved</div>
            <div className="listings-stat-value">{approvedListings}</div>
          </div>

          <div className="listings-stat-card">
            <div className="listings-stat-label">Pending</div>
            <div className="listings-stat-value">{pendingListings}</div>
          </div>

          <div className="listings-stat-card">
            <div className="listings-stat-label">Flagged</div>
            <div className="listings-stat-value">{flaggedListings}</div>
          </div>
        </div>

        <div className="listings-toolbar">
          <SearchBar
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FilterBar
            filters={LISTING_FILTERS}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="listings-grid">
          {listings.map((listing) => (
            <div className="listing-card" key={listing.id}>
              <img
                src={listing.image || "https://via.placeholder.com/800x500?text=No+Image"}
                alt={listing.title}
                className="listing-image"
              />

              <div className="listing-content">
                <div className="listing-title">{listing.title}</div>
                <div className="listing-location">{listing.location}</div>

                <div className="listing-meta">
                  <div className="listing-price">{listing.price}</div>
                  <StatusBadge status={listing.moderationStatus || listing.status} />
                </div>

                <div className="listing-agent">Owner: {listing.owner}</div>
                <div className="listing-type">
                  {listing.listingType} · {listing.propertyType}
                </div>

                <div className="listing-actions">
                  <button className="listing-btn view-btn-card" onClick={() => setSelectedListing(listing)}>
                    View
                  </button>

                  <button className="listing-btn moderate-btn" onClick={() => setSelectedListing(listing)}>
                    Moderate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && listings.length === 0 && <div className="empty-message">No listings found.</div>}

        <PaginationControls
          pagination={pagination}
          onPageChange={goToPage}
          onLimitChange={setLimit}
        />
      </div>

      <ListingDetailsDrawer
        listing={selectedListing}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </AdminLayout>
  );
};

export default Listings;
