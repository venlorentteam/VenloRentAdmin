import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import {
  RiDashboardLine,
  RiTeamLine,
  RiBuildingLine,
  RiShoppingBag3Line,
  RiFileListLine,
  RiShieldCheckLine,
  RiBankCardLine
} from "react-icons/ri";

import logo from "../../assets/img/venlorent-light.png";

import {
  kycApplications,
  flaggedItems
} from "../../mockData";

const Sidebar = () => {

  const navigate = useNavigate();

  const pendingKyc =
    kycApplications.filter(
      item => item.status === "pending"
    ).length;

  const moderationCount =
    flaggedItems.filter(
      item => item.status !== "resolved"
    ).length;

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-icon">
          <img src={logo} alt="VenloRent" />
        </div>

        <div className="logo-text">
          <h2>VenloRent</h2>
          <p>Admin Console</p>
        </div>

      </div>

      <div className="sidebar-nav">

        <div className="nav-section">

          <div className="nav-label">
            Overview
          </div>

          <NavLink
            to="/dashboard"
            className="nav-item"
          >
            <RiDashboardLine />
            Dashboard
          </NavLink>

        </div>

        <div className="nav-section">

          <div className="nav-label">
            Management
          </div>

          <NavLink
            to="/kyc"
            className="nav-item"
          >
            <RiBankCardLine/>
            KYC Verification

            <span
              className="nav-badge"
              style={{
                background:
                  "rgba(239,68,68,.12)",
                color: "#ef4444"
              }}
            >
              {pendingKyc}
            </span>

          </NavLink>

          <NavLink
            to="/users"
            className="nav-item"
          >
            <RiTeamLine />
            Users
          </NavLink>

          <NavLink
            to="/listings"
            className="nav-item"
          >
            <RiBuildingLine />
            Listings
          </NavLink>

          <NavLink
            to="/orders"
            className="nav-item"
          >
            <RiShoppingBag3Line />
            Orders
          </NavLink>

          <NavLink
            to="/requests"
            className="nav-item"
          >
            <RiFileListLine />
            Requests
          </NavLink>

        </div>

        <div className="nav-section">

          <div className="nav-label">
            Trust & Safety
          </div>

          <NavLink
            to="/moderation"
            className="nav-item"
          >
            <RiShieldCheckLine />
            Moderation

            <span
              className="nav-badge"
              style={{
                background:
                  "rgba(245,158,11,.12)",
                color: "#f59e0b"
              }}
            >
              {moderationCount}
            </span>

          </NavLink>

        </div>

        <div className="nav-section">

          <div className="nav-label">
            Finance
          </div>

          <NavLink
            to="/payments"
            className="nav-item"
          >
            <RiBankCardLine />
            Payments
          </NavLink>

        </div>

      </div>

      <div className="sidebar-user">

        <div>
          <strong>Chibuzor A.</strong>
          <p>Super Admin</p>
        </div>

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;
