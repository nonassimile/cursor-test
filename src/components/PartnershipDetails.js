import React, { useState } from 'react';
import './PartnershipDetails.css';

function PartnershipDetails({ 
  partnership, 
  onUpdate, 
  onAddCollaborator, 
  onAddMilestone,
  onUpdateMilestone 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCollaboratorForm, setShowCollaboratorForm] = useState(false);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [collaboratorForm, setCollaboratorForm] = useState({ name: '', email: '', role: '' });
  const [milestoneForm, setMilestoneForm] = useState({ title: '', description: '', dueDate: '' });

  const handleStatusChange = (newStatus) => {
    onUpdate(partnership.id, { status: newStatus });
  };

  const handleCollaboratorSubmit = (e) => {
    e.preventDefault();
    if (collaboratorForm.name && collaboratorForm.email) {
      onAddCollaborator(partnership.id, collaboratorForm);
      setCollaboratorForm({ name: '', email: '', role: '' });
      setShowCollaboratorForm(false);
    }
  };

  const handleMilestoneSubmit = (e) => {
    e.preventDefault();
    if (milestoneForm.title) {
      onAddMilestone(partnership.id, milestoneForm);
      setMilestoneForm({ title: '', description: '', dueDate: '' });
      setShowMilestoneForm(false);
    }
  };

  const handleMilestoneStatusChange = (milestoneId, newStatus) => {
    onUpdateMilestone(partnership.id, milestoneId, { status: newStatus });
  };

  const generateAgreement = () => {
    const agreement = `
ECOSYSTEM PARTNERSHIP AGREEMENT

Partnership ID: ${partnership.id}
Company: ${partnership.companyName}
Contact: ${partnership.contactEmail}
Industry: ${partnership.industry}
Type: ${partnership.partnershipType}
Status: ${partnership.status}

DESCRIPTION:
${partnership.description}

EXPECTED VALUE: ${partnership.expectedValue || 'TBD'}
TIMELINE: ${partnership.timeline || 'TBD'}

COLLABORATORS (${partnership.collaborators.length}):
${partnership.collaborators.map(c => `- ${c.name} (${c.email}) - ${c.role || 'Collaborator'}`).join('\n')}

MILESTONES (${partnership.milestones.length}):
${partnership.milestones.map(m => `- ${m.title}: ${m.status} (Due: ${m.dueDate || 'TBD'})`).join('\n')}

Created: ${new Date(partnership.createdAt).toLocaleString()}
    `.trim();

    const blob = new Blob([agreement], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `partnership_agreement_${partnership.companyName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="partnership-details">
      <div className="details-header">
        <div>
          <h2>{partnership.companyName}</h2>
          <p className="partnership-type">{partnership.partnershipType.replace('-', ' ')}</p>
        </div>
        <select
          value={partnership.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'collaborators' ? 'active' : ''}`}
          onClick={() => setActiveTab('collaborators')}
        >
          Collaborators ({partnership.collaborators.length})
        </button>
        <button
          className={`tab ${activeTab === 'milestones' ? 'active' : ''}`}
          onClick={() => setActiveTab('milestones')}
        >
          Milestones ({partnership.milestones.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="tool-card">
              <h3>📧 Contact Information</h3>
              <p><strong>Email:</strong> {partnership.contactEmail}</p>
              <p><strong>Industry:</strong> {partnership.industry || 'Not specified'}</p>
            </div>

            <div className="tool-card">
              <h3>📝 Description</h3>
              <p>{partnership.description}</p>
            </div>

            <div className="tool-card">
              <h3>📊 Partnership Details</h3>
              <p><strong>Expected Value:</strong> {partnership.expectedValue || 'Not specified'}</p>
              <p><strong>Timeline:</strong> {partnership.timeline || 'Not specified'}</p>
              <p><strong>Created:</strong> {new Date(partnership.createdAt).toLocaleString()}</p>
            </div>

            <div className="export-section">
              <h3>💾 Generate Agreement</h3>
              <p>Export partnership details as a text document</p>
              <button className="btn btn-success" onClick={generateAgreement}>
                📥 Download Agreement
              </button>
            </div>
          </div>
        )}

        {activeTab === 'collaborators' && (
          <div className="collaborators-section">
            <div className="section-header">
              <h3>👥 Collaborators</h3>
              <button
                className="btn btn-primary"
                onClick={() => setShowCollaboratorForm(!showCollaboratorForm)}
              >
                {showCollaboratorForm ? 'Cancel' : '+ Add Collaborator'}
              </button>
            </div>

            {showCollaboratorForm && (
              <form onSubmit={handleCollaboratorSubmit} className="tool-card">
                <h4>Add New Collaborator</h4>
                <input
                  type="text"
                  placeholder="Name *"
                  value={collaboratorForm.name}
                  onChange={(e) => setCollaboratorForm({ ...collaboratorForm, name: e.target.value })}
                  className="tool-input"
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={collaboratorForm.email}
                  onChange={(e) => setCollaboratorForm({ ...collaboratorForm, email: e.target.value })}
                  className="tool-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Role (optional)"
                  value={collaboratorForm.role}
                  onChange={(e) => setCollaboratorForm({ ...collaboratorForm, role: e.target.value })}
                  className="tool-input"
                />
                <button type="submit" className="btn btn-primary">Add Collaborator</button>
              </form>
            )}

            <div className="collaborators-list">
              {partnership.collaborators.length === 0 ? (
                <p className="info-text">No collaborators yet. Add one to get started!</p>
              ) : (
                partnership.collaborators.map(collaborator => (
                  <div key={collaborator.id} className="collaborator-card">
                    <div>
                      <h4>{collaborator.name}</h4>
                      <p>{collaborator.email}</p>
                      {collaborator.role && <p className="role">{collaborator.role}</p>}
                    </div>
                    <span className="joined-date">
                      Joined: {new Date(collaborator.joinedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="milestones-section">
            <div className="section-header">
              <h3>🎯 Milestones</h3>
              <button
                className="btn btn-primary"
                onClick={() => setShowMilestoneForm(!showMilestoneForm)}
              >
                {showMilestoneForm ? 'Cancel' : '+ Add Milestone'}
              </button>
            </div>

            {showMilestoneForm && (
              <form onSubmit={handleMilestoneSubmit} className="tool-card">
                <h4>Add New Milestone</h4>
                <input
                  type="text"
                  placeholder="Title *"
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  className="tool-input"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={milestoneForm.description}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                  className="tool-input"
                  rows="3"
                />
                <input
                  type="date"
                  value={milestoneForm.dueDate}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, dueDate: e.target.value })}
                  className="tool-input"
                />
                <button type="submit" className="btn btn-primary">Add Milestone</button>
              </form>
            )}

            <div className="milestones-list">
              {partnership.milestones.length === 0 ? (
                <p className="info-text">No milestones yet. Add one to track progress!</p>
              ) : (
                partnership.milestones.map(milestone => (
                  <div key={milestone.id} className="milestone-card">
                    <div className="milestone-header">
                      <h4>{milestone.title}</h4>
                      <select
                        value={milestone.status}
                        onChange={(e) => handleMilestoneStatusChange(milestone.id, e.target.value)}
                        className="milestone-status"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </div>
                    {milestone.description && <p>{milestone.description}</p>}
                    <div className="milestone-footer">
                      <span>Due: {milestone.dueDate || 'Not set'}</span>
                      <span>Created: {new Date(milestone.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PartnershipDetails;

