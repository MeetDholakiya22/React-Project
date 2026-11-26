
const express = require("express");
const mongoose = require("mongoose");
const Customer = require("../models/Customer");

const router = express.Router();

// GET: Search, filter, sort and paginate customers
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      status = "",
      type = "",
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (search.trim()) {
      const regex = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        { name: regex },
        { company: regex },
        { email: regex },
        { phone: regex },
        { customerCode: regex },
      ];
    }

    if (["Active", "Inactive", "Prospect"].includes(status)) {
      filter.status = status;
    }

    if (["Individual", "Business"].includes(type)) {
      filter.type = type;
    }

    const allowedSortFields = [
      "name",
      "company",
      "createdAt",
      "customerCode",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const sortOrder = order === "asc" ? 1 : -1;

    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number(limit) || 10)
    );

    const total = await Customer.countDocuments(filter);

    const customers = await Customer.find(filter)
      .sort({ [safeSortBy]: sortOrder, _id: 1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .lean();

    res.status(200).json({
      data: customers,
      pagination: {
        total,
        page: currentPage,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Unable to fetch customers",
    });
  }
});

// GET: Get customer by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Create customer
router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json(customer);
  } catch (error) {
    res.status(error.code === 11000 ? 409 : 400).json({
      message:
        error.code === 11000
          ? "A customer with this email already exists"
          : error.message,
    });
  }
});

// PUT: Update customer
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    // Do not allow changing MongoDB identifiers
    const {
      _id,
      id,
      customerCode,
      createdAt,
      updatedAt,
      __v,
      ...updateData
    } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    res.status(error.code === 11000 ? 409 : 400).json({
      message:
        error.code === 11000
          ? "A customer with this email already exists"
          : error.message,
    });
  }
});

// DELETE: Delete customer
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    const customer = await Customer.findByIdAndDelete(
      req.params.id
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
