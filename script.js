/* ========== EDIT THESE ========== */
const contact = { whatsapp: "923152092225", email: "razaj2412@gmail.com" };

// Live rates: the site reads JSON from RATES.url and refreshes it automatically.
// Default is rates.json in this folder; point url at your own rates API when you have one.
// Expected JSON: {"gold":{"perTola":0},"silver":{"perTola":0},"copper":{"perKg":0},"updatedAt":"2026-01-01T10:30:00+05:00"}
// Missing or non-positive values are never shown as prices.
const RATES = { url: "rates.json", refreshMinutes: 5, currency: "PKR",
  units: { gold: "per Tola", silver: "per Tola", copper: "per KG" } };
// If your provider returns a different JSON shape, adapt this function to return {gold, silver, copper, updatedAt}.
const parseRates = j => ({ gold: j?.gold?.perTola, silver: j?.silver?.perTola, copper: j?.copper?.perKg, updatedAt: j?.updatedAt });

// Set to a Formspree/Getform/Netlify endpoint to send the form for real (see README).
// While empty, the form opens the visitor's email app with the details filled in.
const FORM_ENDPOINT = "";

// status: Available | Made to Order | On Request | Contact for Availability
const products = [
  { metal: "gold", name: "Gold Jewellery", status: "Made to Order", rate: true, desc: "Necklaces, bangles, rings, bracelets, chains, earrings and pendants, arranged to your requirements." },
  { metal: "gold", name: "Gold Bars", status: "Contact for Availability", rate: true, desc: "Gold bars in the weight you need. Confirm availability with our team." },
  { metal: "gold", name: "Gold Coins", status: "Contact for Availability", rate: true, desc: "Gold coins on request." },
  { metal: "gold", name: "Custom Gold Orders", status: "Made to Order", desc: "Share the item, design, approximate weight and quantity." },
  { metal: "gold", name: "Other Gold Products", status: "On Request", desc: "Not listed? Tell us what you need." },
  { metal: "silver", name: "Silver Bars", status: "Contact for Availability", rate: true, desc: "Silver bars in the quantity you require." },
  { metal: "silver", name: "Silver Biscuits / Ingots", status: "Contact for Availability", rate: true, desc: "Silver biscuits/ingots arranged by weight and quantity." },
  { metal: "silver", name: "Silver Coins", status: "On Request", rate: true, desc: "Silver coins on request." },
  { metal: "silver", name: "Silver Jewellery", status: "Made to Order", rate: true, desc: "Chains, rings, bracelets and decorative items arranged to your requirements." },
  { metal: "silver", name: "Custom Silver Orders", status: "Made to Order", desc: "Share the form, weight, quantity or specifications." },
  { metal: "silver", name: "Other Silver Products", status: "On Request", desc: "Not listed? Tell us what you need." },
  { metal: "copper", name: "Copper Bars", status: "Contact for Availability", rate: true, desc: "Copper bars in the size and quantity you need." },
  { metal: "copper", name: "Copper Sheets", status: "On Request", rate: true, desc: "Sheets by size and thickness." },
  { metal: "copper", name: "Copper Rods", status: "On Request", rate: true, desc: "Rods by diameter, length and quantity." },
  { metal: "copper", name: "Copper Wire", status: "On Request", rate: true, desc: "Wire by gauge and quantity." },
  { metal: "copper", name: "Copper Ingots", status: "Contact for Availability", rate: true, desc: "Copper ingots by weight." },
  { metal: "copper", name: "Custom Copper Orders", status: "Made to Order", desc: "Share the form, size, quantity or specifications." },
  { metal: "copper", name: "Other Copper Products", status: "On Request", desc: "Copper scrap, where applicable, and other requirements." }
];

const metals = {
  gold: { title: "Gold — Buy or Order Custom-Made", btn: "Request Gold Item",
    desc: "From Gold jewellery to bars and other Gold products, JR Metals & Commodities can arrange Gold items according to customer requirements. Tell us what you need, including the type, design, quantity, weight or specification, and contact us for availability and pricing.",
    items: ["Gold Necklace","Gold Bangles","Gold Rings","Gold Bracelets","Gold Chains","Gold Earrings","Gold Pendants","Gold Bars","Gold Coins","Other Gold items","Custom Gold orders"],
    h: "Need Something Custom?", p: "Share your required Gold item, design, approximate weight, quantity or specifications with us and we will assist with arranging the requested product. Made/arranged according to customer requirements.",
    msg: "Hello JR Metals & Commodities, I am interested in a Gold item/custom order. I would like to discuss my required product, design, quantity and specifications. Please share the latest price and details." },
  silver: { title: "Silver — Bars, Biscuits & Custom Requirements", btn: "Request Silver Item",
    desc: "JR Metals & Commodities can arrange Silver in different forms and quantities according to customer requirements. Whether you require Silver bars, biscuits/ingots, other Silver products or a custom requirement, contact us with your specifications.",
    items: ["Silver Bars","Silver Biscuits / Ingots","Silver Coins","Silver Jewellery","Silver Chains","Silver Rings","Silver Bracelets","Silver Decorative Items","Other Silver products","Custom Silver orders"],
    h: "Tell Us What You Need", p: "Share the required Silver form, weight, quantity or specifications and our team will assist you with availability and pricing.",
    msg: "Hello JR Metals & Commodities, I am interested in a Silver product/custom order. Please share the available options, latest price and order details." },
  copper: { title: "Copper — Different Forms & Custom Requirements", btn: "Request Copper Item",
    desc: "We can arrange Copper products according to customer requirements, including different forms, quantities, sizes and specifications. Contact us with your requirement and we will assist with availability and pricing.",
    items: ["Copper Bars","Copper Sheets","Copper Rods","Copper Wire","Copper Ingots","Copper Scrap, where applicable","Custom Copper products","Other Copper requirements"],
    h: "Tell Us What You Need", p: "Share the required Copper form, size, quantity or specifications and our team will assist with availability and pricing.",
    msg: "Hello JR Metals & Commodities, I am interested in a Copper product/custom order. Please share the available options, latest price and order details." }
};

const waMessages = {
  general: "Hello JR Metals & Commodities, I would like to enquire about your products and rates.",
  custom: "Hello JR Metals & Commodities, I have a custom metal requirement. Please contact me to discuss the product, quantity, specifications and price."
};

const faqs = [
  ["Can I order Gold online?", "Yes. Customers can contact us online for Gold products, jewellery/custom requirements, bars and other Gold items."],
  ["Can you arrange custom Gold jewellery?", "Yes. Tell us the required jewellery item, design, approximate weight, quantity or other specifications and contact us for availability and pricing."],
  ["Can I order Silver bars or biscuits?", "Yes. Silver bars, biscuits/ingots and other Silver requirements can be requested through our online enquiry/WhatsApp system."],
  ["Can I request a specific Copper product?", "Yes. Tell us the required Copper form, size, quantity or specifications and we will assist with availability and pricing."],
  ["Do you make custom products?", "We can arrange products according to customer requirements. Custom requirements should be discussed with us before placing the final order."],
  ["Are all products always in stock?", "Availability can vary. Contact us to confirm the current availability of your required product."],
  ["Can I request something that is not listed?", "Yes. If you cannot find the exact product you need, contact us and send your requirements."],
  ["Can prices change?", "Yes. Metal prices can change. Always confirm the final applicable price before placing an order."]
];
/* ========== END EDIT ========== */

const $ = (s, r = document) => r.querySelector(s);
const cap = s => s[0].toUpperCase() + s.slice(1);
const wa = text => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
const productMsg = (m, name) => `Hello JR Metals & Commodities, I want to order/request a ${cap(m)} product. My requirement is: ${name}. Quantity/weight: I will share the details in this chat. Please share availability and latest price.`;
const NA = "Current rate unavailable — Contact us for today's rate";
let liveRates = {}, currentTab = "all";
const rateVal = m => { const v = Number(liveRates[m]); return v > 0 ? `${RATES.currency} ${v.toLocaleString("en-PK")} ${RATES.units[m]}` : null; };

function renderRates() {
  $("#rates-grid").innerHTML = ["gold", "silver", "copper"].map(m => {
    const t = rateVal(m);
    return `<div class="card ${m}"><h3>${m.toUpperCase()}</h3>` + (t ? `<p class="price">${t}</p>`
      : `<p class="price na">${NA}</p><div class="btns"><a class="btn btn-${m}" target="_blank" rel="noopener" href="${wa(`Hello JR Metals & Commodities, please share today's ${cap(m)} rate (${RATES.units[m]}).`)}">Ask for Today's Rate</a></div>`) + `</div>`;
  }).join("");
  const d = new Date(liveRates.updatedAt);
  $("#rates-updated").textContent = liveRates.updatedAt && !isNaN(d)
    ? "Last updated: " + d.toLocaleString("en-GB", { timeZone: "Asia/Karachi", dateStyle: "medium", timeStyle: "short" }) + " (PKT)"
    : "Last updated: not available";
  renderProducts(currentTab);
}

async function loadRates() {
  if (RATES.url && location.protocol !== "file:") {
    try {
      const r = await fetch(RATES.url, { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      liveRates = parseRates(await r.json()) || {};
    } catch (e) { /* keep last known rates; cards show the contact message if none */ }
  }
  renderRates();
}

function renderProducts(filter) {
  currentTab = filter;
  $("#tabs").innerHTML = tabs.map(t => `<button role="tab" data-t="${t}" aria-selected="${t === filter}">${cap(t)}</button>`).join("");
  $("#product-grid").innerHTML = products.filter(p => filter === "all" || p.metal === filter).map(p => {
    const custom = /Custom/.test(p.name), t = rateVal(p.metal);
    return `<article class="card ${p.metal}"><span class="status">${p.status}</span><h3>${p.name}</h3><p>${p.desc}</p>
    ${p.rate ? (t ? `<p class="price">${t}</p>` : `<p class="note">Contact us for today's rate</p>`) : ""}
    <div class="btns"><a class="btn btn-${p.metal}" target="_blank" rel="noopener" href="${wa(productMsg(p.metal, p.name))}">Order Now</a>
    <a class="btn btn-silver" target="_blank" rel="noopener" href="${wa(custom ? waMessages.custom : productMsg(p.metal, "Custom " + p.name))}">Request Custom</a></div></article>`;
  }).join("");
}
const tabs = ["all", "gold", "silver", "copper"];
$("#tabs").addEventListener("click", e => { const t = e.target.dataset.t; if (t) renderProducts(t); });
loadRates();
setInterval(loadRates, RATES.refreshMinutes * 60000);

// Metal sections
$("#metal-sections").innerHTML = Object.entries(metals).map(([k, m]) =>
  `<section class="section msection ${k}" id="${k}"><h2>${m.title}</h2><p>${m.desc}</p>
  <ul class="chips">${m.items.map(i => `<li>${i}</li>`).join("")}</ul>
  <h3>${m.h}</h3><p class="note">${m.p}</p>
  <a class="btn btn-${k}" target="_blank" rel="noopener" href="${wa(m.msg)}">${m.btn}</a></section>`).join("");

// FAQ
$("#faq-list").innerHTML = faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");

// WhatsApp links (header, hero, contact, floating)
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = wa(waMessages[a.dataset.wa]); a.target = "_blank"; a.rel = "noopener";
});

// Mobile menu
const menuBtn = $(".menu-btn"), nav = $("#nav");
menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", nav.classList.toggle("open")));
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });

// Enquiry form
const form = $("#enquiry-form"), formStatus = $("#form-status");
const summary = () => {
  const d = Object.fromEntries(new FormData(form));
  return `Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nMetal: ${d.metal}\nProduct: ${d.product}\nQuantity: ${d.quantity}\nWeight: ${d.weight}\nSpecification: ${d.spec}\nDelivery location: ${d.location}\nNotes: ${d.notes}`;
};
$("#form-wa").addEventListener("click", () => {
  if (!form.reportValidity()) return;
  window.open(wa("Hello JR Metals & Commodities, I have a requirement:\n" + summary()), "_blank", "noopener");
});
form.addEventListener("submit", async e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  if (!FORM_ENDPOINT) {
    location.href = `mailto:${contact.email}?subject=${encodeURIComponent("Custom order requirement")}&body=${encodeURIComponent(summary())}`;
    formStatus.textContent = "No form service is connected yet, so your email app was opened with your details. Attach any reference image there, or use WhatsApp.";
    return;
  }
  try {
    const r = await fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error();
    form.reset(); formStatus.textContent = "Thank you. Your requirement has been sent. We will contact you shortly.";
  } catch { formStatus.textContent = "Could not send. Please use WhatsApp or email instead."; }
});

$("#year").textContent = new Date().getFullYear();
