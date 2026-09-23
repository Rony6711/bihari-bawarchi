/* =========================================================
   BIHARI BAWARCHI — Vanilla JS (Blogger compatible)
   Edit placeholders in BRAND SETTINGS below.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- BRAND SETTINGS ---------- */
  var BRAND = {
    BRAND_NAME: "Bihari Bawarchi",
    TAGLINE: "Taste the Tradition.",
    LOGO_URL: "assets/logo.svg",
    PRODUCT_IMAGE: "assets/product-shahi.svg",
    AMAZON_URL: "AMAZON_PRODUCT_URL",
    FLIPKART_URL: "FLIPKART_PRODUCT_URL",
    MEESHO_URL: "MEESHO_PRODUCT_URL",
    WHATSAPP_NUMBER: "91XXXXXXXXXX",
    EMAIL: "your@email.com",
    INSTAGRAM_URL: "INSTAGRAM_URL",
    FACEBOOK_URL: "FACEBOOK_URL",
    YOUTUBE_URL: "YOUTUBE_URL"
  };

  function isPlaceholder(value) {
    if (!value) return true;
    return /^(AMAZON_|FLIPKART_|MEESHO_|INSTAGRAM_|FACEBOOK_|YOUTUBE_|WHATSAPP_)/.test(value) ||
      value.indexOf("XXXX") !== -1 ||
      value === "your@email.com";
  }

  function marketplaceHref(url, name) {
    if (isPlaceholder(url)) {
      return "#where-to-buy";
    }
    return url;
  }

  /* ---------- HEADER / MOBILE MENU ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- ACTIVE NAV ---------- */
  var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a[data-page]").forEach(function (link) {
    if (link.getAttribute("data-page") === path) {
      link.classList.add("active");
    }
  });

  /* ---------- SMOOTH ANCHOR OFFSET ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ---------- APPLY MARKETPLACE / SOCIAL HREFS ---------- */
  document.querySelectorAll("[data-amazon]").forEach(function (el) {
    el.setAttribute("href", marketplaceHref(BRAND.AMAZON_URL, "Amazon"));
    el.setAttribute("target", isPlaceholder(BRAND.AMAZON_URL) ? "_self" : "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
  document.querySelectorAll("[data-flipkart]").forEach(function (el) {
    el.setAttribute("href", marketplaceHref(BRAND.FLIPKART_URL, "Flipkart"));
    el.setAttribute("target", isPlaceholder(BRAND.FLIPKART_URL) ? "_self" : "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
  document.querySelectorAll("[data-meesho]").forEach(function (el) {
    el.setAttribute("href", marketplaceHref(BRAND.MEESHO_URL, "Meesho"));
    el.setAttribute("target", isPlaceholder(BRAND.MEESHO_URL) ? "_self" : "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  document.querySelectorAll("[data-instagram]").forEach(function (el) {
    el.setAttribute("href", isPlaceholder(BRAND.INSTAGRAM_URL) ? "#" : BRAND.INSTAGRAM_URL);
  });
  document.querySelectorAll("[data-facebook]").forEach(function (el) {
    el.setAttribute("href", isPlaceholder(BRAND.FACEBOOK_URL) ? "#" : BRAND.FACEBOOK_URL);
  });
  document.querySelectorAll("[data-youtube]").forEach(function (el) {
    el.setAttribute("href", isPlaceholder(BRAND.YOUTUBE_URL) ? "#" : BRAND.YOUTUBE_URL);
  });
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    var num = BRAND.WHATSAPP_NUMBER.replace(/\D/g, "");
    el.setAttribute("href", isPlaceholder(BRAND.WHATSAPP_NUMBER)
      ? "#"
      : "https://wa.me/" + num + "?text=" + encodeURIComponent("Hello Bihari Bawarchi, I would like to know more about Shahi Treats."));
  });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + BRAND.EMAIL);
    if (el.dataset.email === "text") el.textContent = BRAND.EMAIL;
  });

  /* ---------- PRODUCT FILTER + SEARCH ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-product-card]"));
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var searchInput = document.querySelector("[data-product-search]");
  var emptyState = document.querySelector("[data-empty-state]");
  var currentFilter = "all";

  function matchesFilter(card, filter) {
    if (filter === "all") return true;
    var labels = (card.getAttribute("data-labels") || "").toLowerCase();
    return labels.indexOf(filter.toLowerCase()) !== -1;
  }

  function matchesSearch(card, query) {
    if (!query) return true;
    var hay = (
      (card.getAttribute("data-name") || "") + " " +
      (card.getAttribute("data-labels") || "") + " " +
      (card.textContent || "")
    ).toLowerCase();
    return hay.indexOf(query) !== -1;
  }

  function applyProductFilters() {
    if (!cards.length) return;
    var q = searchInput ? searchInput.value.trim().toLowerCase() : "";
    var visible = 0;
    cards.forEach(function (card) {
      var show = matchesFilter(card, currentFilter) && matchesSearch(card, q);
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });
    if (emptyState) emptyState.style.display = visible ? "none" : "block";
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentFilter = btn.getAttribute("data-filter") || "all";
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      applyProductFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyProductFilters);
  }

  /* ---------- SIMPLE BLOGGER-SAFE CONTACT FORM ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.querySelector('[name="name"]') || {}).value || "";
      var email = (form.querySelector('[name="email"]') || {}).value || "";
      var message = (form.querySelector('[name="message"]') || {}).value || "";
      var subject = encodeURIComponent("Bihari Bawarchi enquiry from " + name);
      var body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
      window.location.href = "mailto:" + BRAND.EMAIL + "?subject=" + subject + "&body=" + body;
    });
  }

  /* ---------- YEAR ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
