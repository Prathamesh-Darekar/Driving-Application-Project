const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  documentType: {
    type: String,
    required: true,
    trim: true,
  },
  documentSubType: {
    type: String,
    required: true,
    trim: true,
  },
  totalAmount: {
    type: Number,
  },
  applicationDate: {
    type: String,
    required: true,
    trim: true,
  },
  applicationStatus: {
    type: String,
    required: true,
    trim: true,
  },
  advancedPayment: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  amountPaidDate: {
    type: String,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
