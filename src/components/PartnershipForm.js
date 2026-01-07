import React, { useState } from 'react';
import './PartnershipForm.css';

function PartnershipForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    industry: '',
    description: '',
    partnershipType: 'strategic',
    expectedValue: '',
    timeline: ''
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.companyName && formData.contactEmail && formData.description) {
      onSubmit(formData);
      setFormData({
        companyName: '',
        contactEmail: '',
        industry: '',
        description: '',
        partnershipType: 'strategic',
        expectedValue: '',
        timeline: ''
      });
    } else {
      alert('Please fill in all required fields (Company Name, Email, Description)');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const documentFiles = files.filter(file => 
      file.type === 'application/pdf' || 
      file.type.startsWith('image/') ||
      file.type.includes('document')
    );
    
    if (documentFiles.length > 0) {
      alert(`${documentFiles.length} document(s) ready to attach. (File upload integration would be implemented here)`);
    }
  };

  return (
    <div className="upload-section">
      <h2>📋 Create New Partnership</h2>
      <p>Fill in the details to start a new ecosystem partnership</p>
      
      <form onSubmit={handleSubmit} className="partnership-form">
        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="tool-input"
            required
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label>Contact Email *</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="tool-input"
            required
            placeholder="partner@company.com"
          />
        </div>

        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="tool-input"
            placeholder="e.g., Technology, Healthcare, Finance"
          />
        </div>

        <div className="form-group">
          <label>Partnership Type</label>
          <select
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleChange}
            className="tool-input"
          >
            <option value="strategic">Strategic Partnership</option>
            <option value="technology">Technology Integration</option>
            <option value="marketing">Marketing Collaboration</option>
            <option value="distribution">Distribution Partnership</option>
            <option value="joint-venture">Joint Venture</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="tool-input"
            rows="4"
            required
            placeholder="Describe the partnership opportunity, goals, and expected outcomes..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expected Value</label>
            <input
              type="text"
              name="expectedValue"
              value={formData.expectedValue}
              onChange={handleChange}
              className="tool-input"
              placeholder="e.g., $100K, 10% growth"
            />
          </div>

          <div className="form-group">
            <label>Timeline</label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="tool-input"
              placeholder="e.g., 6 months, Q1 2024"
            />
          </div>
        </div>

        <div 
          className={`document-drop-zone ${isDragging ? 'dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>📎 Drag and drop partnership documents here (PDF, images, etc.)</p>
          <p className="info-text">Or attach documents after creating the partnership</p>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            Create Partnership
          </button>
        </div>
      </form>
    </div>
  );
}

export default PartnershipForm;

