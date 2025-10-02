const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { imageToPdf } = require("../controllers/imageToPdfController");
const verifyToken = require("../middlewares/authMiddleware");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// POST route for multiple images
router.post(
  "/image-to-pdf",
  verifyToken,
  upload.array("images"),
  imageToPdf
);

module.exports = router;
