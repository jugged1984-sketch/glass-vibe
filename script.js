(function () {
  "use strict";
  const config = window.GLASS_VIBE_CONFIG || {};
  const event = config.currentEvent || {};
  const bySlot = (name) => document.querySelectorAll(`[data-slot="${name}"]`);
  const makeLink = (label, url, className = "button") => {
    if (!url) return null;
    const link = document.createElement("a");
    link.href = url;
    link.className = className;
    link.textContent = label;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  };

  document.querySelectorAll('[data-event="number"]').forEach((node) => { node.textContent = event.eventNumber || ""; });
  document.querySelectorAll('[data-event="status"]').forEach((node) => { node.textContent = event.status || ""; });
  document.querySelectorAll('[data-event="title"]').forEach((node) => { node.textContent = event.eventTitle || ""; });
  document.querySelectorAll('[data-event="location"]').forEach((node) => { node.textContent = event.location || ""; });
  document.querySelectorAll("[data-mobile-label]").forEach((node) => { node.textContent = event.status || "COMING SOON"; });

  const extraFields = [
    ["date", "DATE"], ["time", "TIME"], ["venue", "VENUE"], ["price", "PRICE"],
    ["capacity", "CAPACITY"], ["remainingSeats", "REMAINING"]
  ];
  const meta = document.getElementById("event-meta");
  extraFields.forEach(([key, label]) => {
    if (!event[key]) return;
    const row = document.createElement("p");
    row.innerHTML = `<small>${label}</small><span></span>`;
    row.querySelector("span").textContent = event[key];
    meta.appendChild(row);
  });

  const instagramUrl = event.instagramUrl || config.instagramUrl;
  const reservationLink = makeLink("RESERVE YOUR GLASS →", event.reservationUrl);
  const followLink = makeLink("FOLLOW ON INSTAGRAM →", instagramUrl);
  bySlot("event-cta").forEach((slot) => slot.append((reservationLink || followLink)?.cloneNode(true) || document.createTextNode("")));
  bySlot("join-cta").forEach((slot) => slot.append((reservationLink || makeLink("FOLLOW GLASS VIBE →", instagramUrl))?.cloneNode(true) || document.createTextNode("")));
  bySlot("instagram-cta").forEach((slot) => slot.append(makeLink("FOLLOW GLASS VIBE →", instagramUrl)?.cloneNode(true) || document.createTextNode("")));
  const mobileAction = event.reservationUrl ? makeLink("RESERVE", event.reservationUrl) : makeLink("FOLLOW", instagramUrl);
  bySlot("mobile-action").forEach((slot) => slot.append(mobileAction?.cloneNode(true) || document.createTextNode("")));
  bySlot("profile-cta").forEach((slot) => slot.append(makeLink("VIEW PROFILE →", config.shoYamazakiUrl)?.cloneNode(true) || document.createTextNode("")));

  const external = document.querySelector('[data-slot="external-links"]');
  [["Tsuki-akari", config.tsukiAkariUrl], ["Sho Yamazaki Official", config.shoYamazakiUrl], ["Instagram", instagramUrl]].forEach(([label, url]) => {
    const link = makeLink(label, url, ""); if (link) external.appendChild(link);
  });
  if (!external.children.length) external.hidden = true;
  if (config.canonicalUrl) {
    const canonical = document.createElement("link"); canonical.rel = "canonical"; canonical.href = config.canonicalUrl; document.head.appendChild(canonical);
  }
  if (config.ogImage) {
    const image = document.createElement("meta"); image.property = "og:image"; image.content = config.ogImage; document.head.appendChild(image);
  }

  document.querySelectorAll(".faq-item button").forEach((button) => button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    document.getElementById(button.getAttribute("aria-controls")).hidden = open;
  }));
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const closeMenu = () => { toggle.setAttribute("aria-expanded", "false"); menu.hidden = true; document.body.style.overflow = ""; };
  toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") === "true"; toggle.setAttribute("aria-expanded", String(!open)); menu.hidden = open; document.body.style.overflow = open ? "" : "hidden"; });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const reveals = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) reveals.forEach((node) => node.classList.add("is-visible"));
  else { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .12 }); reveals.forEach((node) => observer.observe(node)); }
}());
