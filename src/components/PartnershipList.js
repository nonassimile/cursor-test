import React from 'react';
import './PartnershipList.css';

function PartnershipList({ partnerships, selectedId, onSelect, onDelete, onCreateNew }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'completed': return '#3498db';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="partnership-list">
      <div className="list-header">
        <h2>Partnerships ({partnerships.length})</h2>
        <button className="btn btn-primary" onClick={onCreateNew}>
          + New Partnership
        </button>
      </div>

      <div className="list-items">
        {partnerships.length === 0 ? (
          <div className="empty-state">
            <p>No partnerships yet</p>
            <button className="btn btn-primary" onClick={onCreateNew}>
              Create Your First Partnership
            </button>
          </div>
        ) : (
          partnerships.map(partnership => (
            <div
              key={partnership.id}
              className={`list-item ${selectedId === partnership.id ? 'active' : ''}`}
              onClick={() => onSelect(partnership)}
            >
              <div className="item-header">
                <h3>{partnership.companyName}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(partnership.status) }}
                >
                  {partnership.status}
                </span>
              </div>
              <p className="item-type">{partnership.partnershipType}</p>
              <p className="item-description">{partnership.description.substring(0, 100)}...</p>
              <div className="item-footer">
                <span className="item-date">
                  {new Date(partnership.createdAt).toLocaleDateString()}
                </span>
                <button
                  className="btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete partnership with ${partnership.companyName}?`)) {
                      onDelete(partnership.id);
                    }
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PartnershipList;

