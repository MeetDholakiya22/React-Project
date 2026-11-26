
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerCode: {
      type: String,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["Individual", "Business"],
      default: "Individual",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Prospect"],
      default: "Prospect",
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },

    assignedTo: {
      type: String,
      default: "",
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically generate customer code
customerSchema.pre("validate", async function () {
  if (!this.customerCode && this.isNew) {
    this.customerCode =
      "CUS-" + Date.now().toString();
  }
});

module.exports = mongoose.model("Customer", customerSchema);
