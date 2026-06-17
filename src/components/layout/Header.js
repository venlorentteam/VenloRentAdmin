import "./Header.css";
import { useLocation } from "react-router-dom";
import React, { useEffect } from 'react'
import { HiOutlineMenu } from "react-icons/hi";

const Header = ({ onMenuClick, isSidebarOpen }) => {

  const location = useLocation();

  const titles = {
    "/dashboard": "Dashboard",
    "/kyc": "KYC Verification",
    "/users": "Users",
    "/listings": "Listings",
    "/orders": "Orders",
    "/requests": "Requests",
    "/moderation": "Moderation",
    "/payments": "Payments",
  };

  const pageTitle = titles[location.pathname] || "VenloRent";
  useEffect(() => {
    document.title = pageTitle + " - VenloRent Admin";
  }, [pageTitle])

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          type="button"
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          aria-expanded={isSidebarOpen}
        >
          <HiOutlineMenu className="hamburg-toggle" />
        </button>

        <span className="page-title">
          {pageTitle}
        </span>
      </div>
      <div className="header-right">

        <div className="header-pill">
          <span className="live-dot" />
          Live
        </div>

        <div className="header-pill">
          Lagos · WAT
        </div>

        <div className="header-pill">
          {new Date().toLocaleDateString()}
        </div>

      </div>

    </header>
  )
}

export default Header;
