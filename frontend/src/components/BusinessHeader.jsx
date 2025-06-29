import { Heart, Phone } from 'lucide-react';

const HostHeader = ({ business, spaces }) => (
  <div className="host-header">
    <div className="host-info">
      <div className="host-avatar">{business.company_name.charAt(0).toUpperCase()}</div>
      <div className="host-details">
        <h1>{business.company_name}</h1>
        <div className="host-meta">
          <div className="host-stat">
            <Heart size={16} />
            <span>{business.business_type}</span>
          </div>
          <div className="host-stat">
            <Phone size={16} />
            <span>{business.phone}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="host-stats">
      {business.business_type === "Space Provider" && (
        <div className="stat-item">
          <span className="stat-number">{spaces.length}</span>
          <div className="stat-label">Wellness Spaces</div>
        </div>
      )}
      <div className="stat-item">
        <span className="stat-number">127</span>
        <div className="stat-label">Total Bookings</div>
      </div>
    </div>
  </div>
);

export default HostHeader;