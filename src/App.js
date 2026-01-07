import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PartnershipForm from './components/PartnershipForm';
import PartnershipDetails from './components/PartnershipDetails';
import PartnershipList from './components/PartnershipList';

function App() {
  const [partnerships, setPartnerships] = useState([]);
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // Load partnerships from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('partnerships');
    if (saved) {
      const parsed = JSON.parse(saved);
      setPartnerships(parsed);
      if (parsed.length > 0 && !selectedPartnership) {
        setSelectedPartnership(parsed[0]);
        setShowForm(false);
      }
    }
  }, []);

  // Save partnerships to localStorage whenever they change
  useEffect(() => {
    if (partnerships.length > 0) {
      localStorage.setItem('partnerships', JSON.stringify(partnerships));
    }
  }, [partnerships]);

  const handleCreatePartnership = (partnershipData) => {
    const newPartnership = {
      id: Date.now(),
      ...partnershipData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      collaborators: [],
      milestones: [],
      documents: []
    };
    const updated = [...partnerships, newPartnership];
    setPartnerships(updated);
    setSelectedPartnership(newPartnership);
    setShowForm(false);
  };

  const handleUpdatePartnership = (id, updates) => {
    const updated = partnerships.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    setPartnerships(updated);
    if (selectedPartnership && selectedPartnership.id === id) {
      setSelectedPartnership(updated.find(p => p.id === id));
    }
  };

  const handleDeletePartnership = (id) => {
    const updated = partnerships.filter(p => p.id !== id);
    setPartnerships(updated);
    if (selectedPartnership && selectedPartnership.id === id) {
      setSelectedPartnership(updated.length > 0 ? updated[0] : null);
      setShowForm(updated.length === 0);
    }
  };

  const handleAddCollaborator = (partnershipId, collaborator) => {
    const partnership = partnerships.find(p => p.id === partnershipId);
    if (partnership) {
      const updatedCollaborators = [...partnership.collaborators, {
        ...collaborator,
        id: Date.now(),
        joinedAt: new Date().toISOString()
      }];
      handleUpdatePartnership(partnershipId, { collaborators: updatedCollaborators });
    }
  };

  const handleAddMilestone = (partnershipId, milestone) => {
    const partnership = partnerships.find(p => p.id === partnershipId);
    if (partnership) {
      const updatedMilestones = [...partnership.milestones, {
        ...milestone,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
      }];
      handleUpdatePartnership(partnershipId, { milestones: updatedMilestones });
    }
  };

  const handleUpdateMilestone = (partnershipId, milestoneId, updates) => {
    const partnership = partnerships.find(p => p.id === partnershipId);
    if (partnership) {
      const updatedMilestones = partnership.milestones.map(m =>
        m.id === milestoneId ? { ...m, ...updates } : m
      );
      handleUpdatePartnership(partnershipId, { milestones: updatedMilestones });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="editor-container">
          {showForm && (
            <PartnershipForm 
              onSubmit={handleCreatePartnership}
              onCancel={() => {
                if (partnerships.length > 0) {
                  setShowForm(false);
                  setSelectedPartnership(partnerships[0]);
                }
              }}
            />
          )}

          {!showForm && (
            <>
              <div className="partnerships-layout">
                <PartnershipList
                  partnerships={partnerships}
                  selectedId={selectedPartnership?.id}
                  onSelect={(partnership) => {
                    setSelectedPartnership(partnership);
                    setShowForm(false);
                  }}
                  onDelete={handleDeletePartnership}
                  onCreateNew={() => setShowForm(true)}
                />
                
                {selectedPartnership && (
                  <PartnershipDetails
                    partnership={selectedPartnership}
                    onUpdate={handleUpdatePartnership}
                    onAddCollaborator={handleAddCollaborator}
                    onAddMilestone={handleAddMilestone}
                    onUpdateMilestone={handleUpdateMilestone}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

