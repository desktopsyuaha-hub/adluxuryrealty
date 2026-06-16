/* AD LUXURY REALTY — script.js */

document.addEventListener("DOMContentLoaded", () => {

  /* Preloader */
  const preloader = document.getElementById("preloader");
  const start = Date.now();
  const MIN = 1400;

  const hide = () => {
    const wait = Math.max(0, MIN - (Date.now() - start));
    setTimeout(() => {
      preloader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
      setTimeout(() => preloader.remove(), 750);
    }, wait);
  };

  document.readyState === "complete" ? hide() : window.addEventListener("load", hide);

  /* Sticky header */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile burger */
  const burger = document.getElementById("burger");
  const nav    = document.getElementById("nav");

  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    header.classList.toggle("scrolled", open || window.scrollY > 30);
  });

  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    burger.classList.remove("open");
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  }));

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(el => obs.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("is-visible"));
  }

  /* Footer year */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Contact form — Netlify */
  const form   = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
        .then(() => { status.textContent = "Message sent — we'll be in touch shortly."; form.reset(); })
        .catch(() => { status.textContent = "Something went wrong. Please WhatsApp us on +971 56 461 9454."; });
    });
  }

});

