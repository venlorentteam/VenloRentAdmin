import "./Listings.css";

import { useState } from "react";

import AdminLayout from "../components/layout/AdminLayout";
import StatusBadge from "../components/common/StatusBadge";

import ListingDetailsDrawer
from "../components/listings/ListingDetailsDrawer";

import { listings } from "../mockData";

const Listings = () => {

  const [selectedListing, setSelectedListing] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const openListing = (listing) => {
    setSelectedListing(listing);
    setDrawerOpen(true);
  };

  return (
    <AdminLayout>

      <div className="listings-page">

        <div className="listings-toolbar">

          <input
            className="listings-search"
            placeholder="Search listings..."
          />

        </div>

        <div className="listings-grid">

          {listings.map(listing => (

            <div
              className="listing-card"
              key={listing.id}
            >

              <img
                src={listing.image}
                alt=""
                className="listing-image"
              />

              <div className="listing-content">

                <div className="listing-title">
                  {listing.title}
                </div>

                <div className="listing-location">
                  {listing.location}
                </div>

                <div className="listing-meta">

                  <div className="listing-price">
                    ₦
                    {listing.price.toLocaleString()}
                  </div>

                  <StatusBadge
                    status={listing.status}
                  />

                </div>

                <div className="listing-agent">
                  Agent: {listing.agent}
                </div>

                <br />

                <div className="listing-actions">

                  <button
                    className="listing-btn view-btn-card"
                    onClick={() =>
                      openListing(listing)
                    }
                  >
                    View
                  </button>

                  <button
                    className="listing-btn moderate-btn"
                  >
                    Moderate
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <ListingDetailsDrawer
        listing={selectedListing}
        isOpen={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
      />

    </AdminLayout>
  );
};

export default Listings;