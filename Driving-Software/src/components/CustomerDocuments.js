import React from 'react';
import './CustomerDocuments.css';

function CustomerDocuments({ documents, onUpdateDocument, onViewDocument, onDeleteDocument }) {
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'License':
        return 'fa-id-card';
      case 'Insurance':
        return 'fa-shield-alt';
      case 'RC':
        return 'fa-car';
      default:
        return 'fa-file-alt';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'completed';
      case 'Pending':
        return 'pending';
      case 'Applied':
        return 'applied';
      default:
        return 'default';
    }
  };

  const getStatusMessage = (status, balance) => {
    if (status === 'Completed') {
      return 'Document processing completed';
    }
    if (parseFloat(balance) <= 0) {
      return 'Payment completed, document processing pending';
    }
    return 'Payment pending';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewDocument = (doc) => {
    console.log('CustomerDocuments handleViewDocument called with:', doc);
    console.log('onViewDocument prop:', onViewDocument);
    if (onViewDocument) {
      console.log('Calling onViewDocument function');
      onViewDocument(doc);
    } else {
      console.log('onViewDocument prop is not available, showing alert');
      // Default behavior - show document details in a simple alert
      const details = `
Document Details:
Type: ${doc.documentType} - ${doc.documentSubType}
Status: ${doc.applicationStatus}
Total Amount: ${formatCurrency(doc.totalAmount)}
Advance Payment: ${formatCurrency(doc.advancePayment)}
Balance: ${formatCurrency(doc.balance)}
Application Date: ${formatDate(doc.applicationDate)}
Payment Date: ${formatDate(doc.amountPaidDate)}
Notes: ${doc.notes || 'No notes available'}
      `;
      alert(details);
    }
  };

  const handleDeleteDocument = (doc) => {
    if (onDeleteDocument) {
      onDeleteDocument(doc);
    }
  };

  return (
    <div className="documents-container">
      <div className="documents-header">
        <div className="header-content">
          <h3>Customer Documents</h3>
          <p className="header-subtitle">Manage and track all document applications</p>
        </div>
        <div className="header-actions">
          <div className="document-count">
            <span className="count-number">{documents.length}</span>
            <span className="count-label">Documents</span>
          </div>
        </div>
      </div>

      <div className="documents-grid">
        {documents.map((doc, index) => (
          <div key={index} className="document-card">
            <div className="card-header">
              <div className="document-type-info">
                <div className="document-icon">
                  <i className={`fas ${getDocumentIcon(doc.documentType)}`}></i>
                </div>
                <div className="document-details">
                  <h4 className="document-title">{doc.documentType}</h4>
                  <p className="document-subtitle">{doc.documentSubType}</p>
                </div>
              </div>
              <div className={`status-badge ${getStatusColor(doc.applicationStatus)}`}>
                <span className="status-dot"></span>
                {doc.applicationStatus}
              </div>
            </div>
            
            <div className="card-content">
              <div className="info-section">
                <h5>Payment Details</h5>
                <div className="payment-grid">
                  <div className="payment-item">
                    <span className="payment-label">Total Amount</span>
                    <span className="payment-value">{formatCurrency(doc.totalAmount)}</span>
                  </div>
                  <div className="payment-item">
                    <span className="payment-label">Advance Paid</span>
                    <span className="payment-value paid">{formatCurrency(doc.advancePayment)}</span>
                  </div>
                  <div className="payment-item">
                    <span className="payment-label">Balance</span>
                    <span className={`payment-value ${parseFloat(doc.balance) <= 0 ? 'paid' : 'pending'}`}>
                      {formatCurrency(doc.balance)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h5>Application Details</h5>
                <div className="application-grid">
                  <div className="application-item">
                    <span className="application-label">Application Date</span>
                    <span className="application-value">{formatDate(doc.applicationDate)}</span>
                  </div>
                  <div className="application-item">
                    <span className="application-label">Payment Date</span>
                    <span className="application-value">{formatDate(doc.amountPaidDate)}</span>
                  </div>
                </div>
              </div>

              {doc.notes && (
                <div className="info-section">
                  <h5>Notes</h5>
                  <p className="notes-text">{doc.notes}</p>
                </div>
              )}

              <div className="status-message">
                <i className="fas fa-info-circle"></i>
                <span>{getStatusMessage(doc.applicationStatus, doc.balance)}</span>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="action-button primary"
                onClick={() => onUpdateDocument(doc)}
              >
                <i className="fas fa-edit"></i>
                Update Details
              </button>
              <button 
                className="action-button secondary" 
                onClick={() => handleViewDocument(doc)}
              >
                <i className="fas fa-eye"></i>
                View Details
              </button>
              <button 
                className="action-button danger"
                onClick={() => handleDeleteDocument(doc)}
              >
                <i className="fas fa-trash"></i>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <h4>No Documents Found</h4>
          <p>This customer doesn't have any documents yet.</p>
        </div>
      )}
    </div>
  );
}

export default CustomerDocuments; 