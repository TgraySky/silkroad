const express = require("express");
const router = express.Router();

const links = {
  "aloyoga": "https://www.aloyoga.com/collections/womens-sale?affid=your-affiliate-id"
};

router.get("/:brand", (req, res) => {
  const url = links[req.params.brand];
  if (!url) return res.status(404).send("Redirect link not found");
  res.redirect(url);
});

module.exports = router; 