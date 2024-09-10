const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const model = require("../models/url");
const {
  handleGenerationUrl,
  handleRedirectUrls,
  handleCounts,
} = require("../controllers/url");

router.post("/", handleGenerationUrl);

router.get("/:url", handleRedirectUrls);

router.get("/analytics/:url", handleCounts);

module.exports = router;
