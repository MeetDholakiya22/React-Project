
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./routes/leadRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("WorkFlow Pro Backend API is running");
});

// Lead APIs
app.use("/api/leads", leadRoutes);
// customers APIs
app.use("/api/customers", customerRoutes);

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  });
