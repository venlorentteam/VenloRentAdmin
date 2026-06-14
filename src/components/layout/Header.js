import "./Header.css";
import { useLocation } from "react-router-dom";

const Header = () => {

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

  const pageTitle =
    titles[location.pathname] || "VenloRent";

  return (
    <header className="admin-header">

      <div className="page-title">
        {pageTitle}
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
  );
};

export default Header;