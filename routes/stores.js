const express = require("express");
const router = express.Router();

// Simulated coupon data
const storeCoupons = {
  "aloyoga": [
    { code: "ALO15", desc: "15% Off Sitewide", type: "Coupon", brand: "aloyoga" },
    { code: "FREESHIP", desc: "Free Shipping on All Orders", type: "Deal", brand: "aloyoga" },
    { code: "NEW20", desc: "20% Off First Order", type: "Coupon", brand: "aloyoga" }
  ]
};

// New route for coupon code display - MUST come before the general store route
router.get("/:store/coupon/:code", (req, res) => {
  const { store, code } = req.params;
  const coupons = storeCoupons[store];
  if (!coupons) return res.status(404).send("Store not found");
  
  const coupon = coupons.find(c => c.code === code);
  if (!coupon) return res.status(404).send("Coupon not found");
  
  res.render("coupon", { coupon });
});

// General store route - must come after more specific routes
router.get("/:store", (req, res) => {
  const coupons = storeCoupons[req.params.store];
  if (!coupons) return res.status(404).send("Store not found");
  res.render("store", { coupons });
});

module.exports = router; 