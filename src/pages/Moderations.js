import "./Moderations.css";

import AdminLayout from "../components/layout/AdminLayout";
import StatusBadge from "../components/common/StatusBadge";

import { moderationQueue }
from "../mockData";

const Moderations = () => {

  return (
    <AdminLayout>

      <div className="moderation-page">

        <div className="moderation-grid">

          {moderationQueue.map(item => (

            <div
              className="moderation-card"
              key={item.id}
            >

              <div className="moderation-type">
                {item.type}
              </div>

              <div className="moderation-title">
                {item.target}
              </div>

              <div className="moderation-meta">

                <span>
                  Reason:
                  {" "}
                  {item.reason}
                </span>

                <span>
                  Reports:
                  {" "}
                  {item.reports}
                </span>

              </div>

              <StatusBadge
                status={item.status}
              />

              <br />
              <br />

              <div className="moderation-actions">

                <button
                  className="action-btn review-btn"
                >
                  Review
                </button>

                <button
                  className="action-btn remove-btn"
                >
                  Remove
                </button>

                <button
                  className="action-btn dismiss-btn"
                >
                  Dismiss
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </AdminLayout>
  );
};

export default Moderations;