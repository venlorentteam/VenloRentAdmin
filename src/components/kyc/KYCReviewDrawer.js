import "./KYCReviewDrawer.css";

const KYCReviewDrawer = ({
  application,
  isOpen,
  onClose,
}) => {

  if (!isOpen || !application) return null;

  return (
    <div className="drawer-overlay">

      <div className="kyc-drawer">

        <div className="drawer-header">

          <h2>KYC Review</h2>

          <button
            onClick={onClose}
            className="drawer-close"
          >
            ✕
          </button>

        </div>

        <div className="drawer-content">

          <section className="drawer-section">

            <h3>Applicant</h3>

            <div className="info-grid">

              <div>
                <label>Name</label>
                <p>{application.applicantName}</p>
              </div>

              <div>
                <label>Location</label>
                <p>{application.location}</p>
              </div>

              <div>
                <label>Submitted</label>
                <p>{application.submittedAt}</p>
              </div>

              <div>
                <label>Didit Status</label>
                <p>{application.status}</p>
              </div>

            </div>

          </section>

          <section className="drawer-section">

            <h3>Didit Verification Checks</h3>

            <div className="check-list">

              <div className="check-item">
                <span>Liveness Check</span>
                <span>{application.livenessCheck}</span>
              </div>

              <div className="check-item">
                <span>ID Verification</span>
                <span>{application.idVerification}</span>
              </div>

              <div className="check-item">
                <span>Proof of Address</span>
                <span>{application.proofOfAddress}</span>
              </div>

            </div>

          </section>

          <section className="drawer-section">

            <h3>Documents</h3>

            <div className="document-grid">

              <div className="document-card">
                Government ID
              </div>

              <div className="document-card">
                Address Document
              </div>

            </div>

          </section>

        </div>

        <div className="drawer-footer">

          <button className="reject-btn">
            Reject
          </button>

          <button className="approve-btn">
            Approve Agent
          </button>

        </div>

      </div>

    </div>
  );
};

export default KYCReviewDrawer;