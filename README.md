# 24S Coupons - Affiliate Marketing Platform

A modern, SEO-optimized affiliate marketing platform for coupon and discount code distribution.

## 🚀 Features

- **SEO Optimized**: Complete meta tags, structured data, and sitemap
- **Compliance Ready**: Privacy policy, terms of service, and affiliate disclosures
- **Modern UI**: Responsive design with beautiful animations
- **Security**: Helmet.js, rate limiting, and CORS protection
- **Performance**: Compression and optimized loading
- **User Experience**: Intuitive coupon code display and copying

## 📁 Project Structure

```
affiliate-redirect/
├── app.js                 # Main application file
├── routes/
│   ├── go.js             # Affiliate redirect routes
│   └── stores.js         # Store and coupon routes
├── views/
│   ├── layout.ejs        # Main layout template
│   ├── home.ejs          # Homepage
│   ├── store.ejs         # Coupon listing page
│   ├── coupon.ejs        # Coupon code popup
│   ├── about.ejs         # About page
│   ├── privacy.ejs       # Privacy policy
│   ├── terms.ejs         # Terms of service
│   ├── contact.ejs       # Contact page
│   ├── 404.ejs           # 404 error page
│   ├── error.ejs         # Generic error page
│   ├── sitemap.ejs       # XML sitemap
│   └── partials/
│       ├── head.ejs      # Head partial
│       └── scripts.ejs   # Scripts partial
├── public/               # Static files (CSS, JS, images)
├── package.json          # Dependencies and scripts
├── .env.example          # Environment variables template
└── README.md            # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd affiliate-redirect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Domain Configuration
BASE_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Adding New Stores

1. **Update affiliate links** in `routes/go.js`:
   ```javascript
   const links = {
     "pjat": "https://www.pjatr.com/t/8-11924-88878-170958?sid=55hto_91htec3t",
     "newstore": "https://newstore.com/affiliate-link"
   };
   ```

2. **Add coupon data** in `routes/stores.js`:
   ```javascript
   const storeCoupons = {
     "pjat": [...],
     "newstore": [
       { code: "SAVE20", desc: "20% Off Everything", type: "Coupon", brand: "newstore" }
     ]
   };
   ```

## 🎯 SEO Features

- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Structured Data**: Schema.org markup for better search results
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Prevent duplicate content issues

## 🔒 Security Features

- **Helmet.js**: Security headers and CSP
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **CORS**: Cross-origin resource sharing protection
- **Input Validation**: Sanitized user inputs
- **HTTPS Ready**: Secure communication setup

## 📱 User Experience

- **Responsive Design**: Works on all devices
- **Fast Loading**: Optimized assets and compression
- **Intuitive Navigation**: Clear menu structure
- **Accessibility**: WCAG compliant design
- **Error Handling**: User-friendly error pages

## 🚀 Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Vercel
```bash
vercel --prod
```

### DigitalOcean
```bash
# Set up your droplet and deploy using PM2
pm2 start app.js --name "affiliate-redirect"
```

## 📊 Analytics Integration

Add your analytics codes to `views/partials/head.ejs`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@yourdomain.com or visit our contact page.

---

**Note**: Remember to update all placeholder URLs, email addresses, and contact information with your actual details before deploying. # silkroad
