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
import { useAuth } from "../../context/AuthProvider";
import {
  kycApplications,
  flaggedItems
} from "../../mockData";

const Sidebar = ({ isOpen, onClose }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const pendingKyc =
    kycApplications.filter(
      item => item.status === "pending"
    ).length;

  const moderationCount =
    flaggedItems.filter(
      item => item.status !== "resolved"
    ).length;

  const logoutAdmin = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside className={`sidebar ${isOpen ? "active-sidebar" : ""}`}>

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
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
          >
            <RiTeamLine />
            Users
          </NavLink>

          <NavLink
            to="/listings"
            className="nav-item"
            onClick={onClose}
          >
            <RiBuildingLine />
            Listings
          </NavLink>

          <NavLink
            to="/orders"
            className="nav-item"
            onClick={onClose}
          >
            <RiShoppingBag3Line />
            Orders
          </NavLink>

          <NavLink
            to="/requests"
            className="nav-item"
            onClick={onClose}
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
            onClick={onClose}
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
            onClick={onClose}
          >
            <RiBankCardLine />
            Payments
          </NavLink>

        </div>

      </div>

      <div className="sidebar-user">

        <div>
          <strong>{admin?.fullName || "Chibuzor A."}</strong>
          <p>{admin?.role || "Admin"}</p>
        </div>

        <button
          onClick={logoutAdmin}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;
