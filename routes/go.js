const express = require("express");
const router = express.Router();

// Simulated affiliate link database
const links = {
  "pjat": "https://www.pjatr.com/t/8-11924-88878-170958?sid=55hto_91htec3t"
};

router.get("/:brand", (req, res) => {
  const brand = req.params.brand;
  const target = links[brand];

  if (target) {
    return res.redirect(target); // Redirect to the real affiliate URL
  } else {
    return res.status(404).send("Redirect link not found");
  }
});

module.exports = router; 