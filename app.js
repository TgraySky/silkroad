require('dotenv').config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));

// Compression
app.use(compression());

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add path to all routes for canonical URLs
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Routes
const goRouter = require("./routes/go");
const storesRouter = require("./routes/stores");
app.use("/go", goRouter);
app.use("/stores", storesRouter);

// Home page
app.get("/", (req, res) => {
  res.render("home", {
    title: "24S Coupons - Best Deals & Discount Codes",
    description: "Find the latest 24S coupons and discount codes. Save money on your next purchase with verified deals.",
    keywords: "24S coupons, discount codes, deals, savings, online shopping"
  });
});

// About page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us - 24S Coupons",
    description: "Learn about our mission to help you save money with the best coupons and deals."
  });
});

// Privacy policy
app.get("/privacy", (req, res) => {
  res.render("privacy", {
    title: "Privacy Policy - 24S Coupons"
  });
});

// Terms of service
app.get("/terms", (req, res) => {
  res.render("terms", {
    title: "Terms of Service - 24S Coupons"
  });
});

// Contact page
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us - 24S Coupons"
  });
});

// Sitemap
app.get("/sitemap.xml", (req, res) => {
  res.type('application/xml');
  res.render("sitemap", {
    baseUrl: process.env.BASE_URL || "https://yourdomain.com"
  });
});

// Robots.txt
app.get("/robots.txt", (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${process.env.BASE_URL || 'https://yourdomain.com'}/sitemap.xml`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found - 24S Coupons"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    title: "Error - 24S Coupons",
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started at: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 