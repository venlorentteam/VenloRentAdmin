import "./ListingDetailsDrawer.css";

const ListingDetailsDrawer = ({
  listing,
  isOpen,
  onClose
}) => {

  if (!isOpen || !listing) return null;

  return (
    <div className="drawer-overlay">

      <div className="listing-drawer">

        <div className="drawer-header">

          <h2>Listing Details</h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <img
          src={listing.image}
          alt=""
          className="drawer-image"
        />

        <div className="drawer-content">

          <div className="detail-row">
            <label>Property</label>
            <p>{listing.title}</p>
          </div>

          <div className="detail-row">
            <label>Location</label>
            <p>{listing.location}</p>
          </div>

          <div className="detail-row">
            <label>Agent</label>
            <p>{listing.agent}</p>
          </div>

          <div className="detail-row">
            <label>Price</label>
            <p>
              ₦{listing.price.toLocaleString()}
            </p>
          </div>

          <div className="detail-row">
            <label>Status</label>
            <p>{listing.status}</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ListingDetailsDrawer;