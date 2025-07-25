import React, { useState, useEffect } from "react";
import "./NewUserModal.css";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';

function NewUserModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    address: "",
    documentType: "",
    documentSubType: "",
    totalAmount: "",
    advancePayment: "",
    balance: "",
    applicationStatus: "",
    applicationDate: "",
    amountPaidDate: "",
    notes: "",
    isFullyPaid: false,
  });

  const [documentSubTypes, setDocumentSubTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set today's date as application date when modal opens
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        applicationDate: today,
        amountPaidDate: today,
      }));
    }
  }, [isOpen]);

  useEffect(() => {
    // Update document subtypes based on document type
    switch (formData.documentType) {
      case "License":
        setDocumentSubTypes(["New", "Renewal", "COA", "Duplicate"]);
        break;
      case "Insurance":
        setDocumentSubTypes(["New", "Renewal"]);
        break;
      case "RC":
        setDocumentSubTypes(["New", "Renewal", "COA", "Duplicate"]);
        break;
      default:
        setDocumentSubTypes([]);
    }
  }, [formData.documentType]);

  useEffect(() => {
    // Calculate balance
    const total = parseFloat(formData.totalAmount) || 0;
    const advance = parseFloat(formData.advancePayment) || 0;
    const balance = total - advance;
    setFormData((prev) => ({
      ...prev,
      balance: balance.toFixed(2),
      isFullyPaid: balance <= 0,
    }));
  }, [formData.totalAmount, formData.advancePayment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call for adding a new user
      const response = await axios.post(
        "http://localhost:8000/api/addCustomer",
        formData
      );
      if (response.status == 201) {
        toast.success("New user added successfully!", { position: 'top-center' });
        setFormData({
          customerName: "",
          contactNumber: "",
          address: "",
          documentType: "",
          documentSubType: "",
          totalAmount: "",
          advancePayment: "",
          balance: "",
          applicationStatus: "",
          applicationDate: "",
          amountPaidDate: "",
          notes: "",
          isFullyPaid: false,
        });
        onClose();
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message, { position: 'top-center' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Toaster position="top-center" />
        <button className="close-button" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} className="new-user-form">
          {/* Customer Information Section */}
          <div className="form-section">
            <h3 className="section-title">Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Customer Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Contact Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label>
                Address <span className="required">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                placeholder="Enter complete address"
                required
              />
            </div>
          </div>

          {/* Document Information Section */}
          <div className="form-section">
            <h3 className="section-title">Document Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Document Type <span className="required">*</span>
                </label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Document Type</option>
                  <option value="License">License</option>
                  <option value="Insurance">Insurance</option>
                  <option value="RC">RC</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  Document Sub Type <span className="required">*</span>
                </label>
                <select
                  name="documentSubType"
                  value={formData.documentSubType}
                  onChange={handleChange}
                  required
                  disabled={!formData.documentType}
                >
                  <option value="">Select Sub Type</option>
                  {documentSubTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Application Date</label>
                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  readOnly
                  className="readonly"
                />
              </div>
              <div className="form-group">
                <label>
                  Application Status <span className="required">*</span>
                </label>
                <select
                  name="applicationStatus"
                  value={formData.applicationStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="form-section">
            <h3 className="section-title">Payment Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Total Amount <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Advance Payment <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="advancePayment"
                  value={formData.advancePayment}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Balance</label>
                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  readOnly
                  className="readonly"
                />
              </div>
              <div className="form-group">
                <label>Amount Paid Date</label>
                <input
                  type="date"
                  name="amountPaidDate"
                  value={formData.amountPaidDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="form-section">
            <h3 className="section-title">Additional Information</h3>
            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Enter any additional notes or comments..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              <i
                className={`fas ${
                  isSubmitting ? "fa-spinner fa-spin" : "fa-save"
                }`}
              ></i>
              {isSubmitting ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUserModal;
