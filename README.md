# JR Metals & Commodities website

Static site (no build step): `index.html`, `styles.css`, `script.js`, `rates.json`, `policies.html`.

## Run locally
Live rates load through `fetch`, which browsers block on `file://`, so serve the folder:
`python3 -m http.server 8000` then open http://localhost:8000. (Opening `index.html` directly still works; it just shows the "rate unavailable" message.)

## Live rates
Gold and Silver display in PKR per Tola, Copper in PKR per KG. The site loads `RATES.url` (default `rates.json`) on page load, then every `RATES.refreshMinutes` (default 5), and updates the cards and the "Last updated" time (shown in Pakistan time) automatically.

If a rate is missing, zero or invalid, that card shows "Current rate unavailable — Contact us for today's rate" with a WhatsApp button. No prices are hardcoded.

**Expected JSON** (`updatedAt` must be an ISO date-time, ideally with the +05:00 offset):
```json
{"gold":{"perTola":0},"silver":{"perTola":0},"copper":{"perKg":0},"updatedAt":"2026-01-01T10:30:00+05:00"}
```
- **Simplest:** edit `rates.json` with your real values and upload it. Visitors see the change within minutes.
- **Real API:** set `RATES.url` in `script.js` to your endpoint (it must allow CORS from your domain). If its JSON differs, adapt `parseRates` in `script.js` to return `{gold, silver, copper, updatedAt}`. Make sure the API returns PKR per Tola (gold/silver) and PKR per KG (copper).
- Keep API keys off the website. Use a small serverless function (Netlify/Vercel) or a scheduled job that writes `rates.json`.

## Contact details, products, messages
Top of `script.js`: `contact` (WhatsApp in international format without `+`, and email), `products`, `metals` (section text), `faqs`, `waMessages`, `productMsg`. Also update the phone/email in `index.html` (Contact section, JSON-LD) and `policies.html`. Add a product by adding an entry to `products` (status: Available, Made to Order, On Request or Contact for Availability). Replace the Google Maps link (`#map-link` in `index.html`) once you have a full address.

## Enquiry form
Until connected, "Submit Requirement" opens the visitor's email app with the details, and "Send Requirement on WhatsApp" opens WhatsApp. Images can't be sent this way. To send for real, create a form on Formspree or Getform, copy its endpoint URL and set `FORM_ENDPOINT` in `script.js`. Image upload may need a paid plan on some services.

## Deploy
- **Netlify:** drag the folder onto app.netlify.com/drop, or connect a Git repo (no build command, publish directory `.`).
- **Vercel:** run `vercel` in this folder, or import the Git repo (framework: Other).
- **cPanel:** File Manager → `public_html` → upload all files (or a zip, then extract).

## Custom domain and HTTPS
- **Netlify/Vercel:** Domain settings → add your domain → create the DNS records shown (A/CNAME) at your registrar. HTTPS is issued automatically once DNS resolves.
- **cPanel:** point the domain's nameservers to your host, then SSL/TLS Status → Run AutoSSL. Optionally force HTTPS with a redirect in `.htaccess`.

## Policies
`policies.html` holds editable templates. Have them reviewed by a qualified professional.
