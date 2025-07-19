const express = require("express");
const router = express.Router();

// Simulated coupon data
const storeCoupons = {
  "pjat": [
    { code: "SUMMER30", desc: "30% Off Coupon Code 100% Using", type: "Coupon", brand: "pjat" },
    { code: "SAVE10", desc: "10% Off Coupon Code 100% Using", type: "Coupon", brand: "pjat" },
    { code: "FIRST400", desc: "15% Off Your 1st Order Over $400+", type: "Coupon", brand: "pjat" },
    { code: "FIRST200", desc: "15% Off Your 1st Order Over $200+", type: "Coupon", brand: "pjat" },
    { code: "", desc: "Free shipping on all orders", type: "Deal", brand: "pjat" }
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