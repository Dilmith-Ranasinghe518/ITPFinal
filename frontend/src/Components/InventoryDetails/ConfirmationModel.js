// ConfirmationModal.js
import React from 'react';

const ConfirmationModel = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this item?</h3>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-btn">Yes, Delete</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModel;
