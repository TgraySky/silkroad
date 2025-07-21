const express = require("express");
const router = express.Router();

const links = {
  "aloyoga": "https://www.pjatr.com/t/8-11924-88878-170958?sid=55hto_91htec3t"
};

router.get("/:brand", (req, res) => {
  const url = links[req.params.brand];
  if (!url) return res.status(404).send("Redirect link not found");
  res.redirect(url);
});

module.exports = router; 