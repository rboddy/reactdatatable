const express = require("express");
const csv = require("csvtojson");
const router = express.Router();

// @route   GET api/data
// @desc    Gets all data
// @access  Public
router.get("/", async (req, res) => {
  const sampleDataCSV = "sample.csv";
  try {
    const sampleDataJSON = await csv({
      ignoreEmpty: true
    }).fromFile(sampleDataCSV);
    return res.json(sampleDataJSON.slice(0, req.query.limit));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
