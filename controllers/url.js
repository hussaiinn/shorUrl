const express = require("express");
const shortid = require("shortid");
const model = require("../models/url");
const router = express.Router();

async function handleGenerationUrl(req, res) {
  const body = req.body;
  const shorturl = shortid();
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  await model.create({
    shortId: shorturl,
    redirectUrl: body.url,
    visitHistory: [],
  });
  res.render("home", {
    id: shorturl,
  });
}

async function handleRedirectUrls(req, res) {
  const { url } = req.params;
  //   res.json({ msg: url });
  const urlObject = await model.findOneAndUpdate(
    { shortId: url },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
      $inc: { count: 1 },
    }
  );
  res.redirect(urlObject.redirectUrl);
  //   res.json({ redirectUrl: urlObject.redirectUrl });
}

async function handleCounts(req, res) {
  const { url } = req.params;
  const urlObject = await model.findOne({ shortId: url });
  res.json({ "Total Count": urlObject.count });
}

module.exports = {
  handleGenerationUrl,
  handleRedirectUrls,
  handleCounts,
};
