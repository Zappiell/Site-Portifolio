// Ano
document.getElementById("year").textContent = new Date().getFullYear();

// Hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  hamburger.classList.toggle("open", open);
  navLinks.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
}

hamburger.addEventListener("click", () =>
  setMenu(!hamburger.classList.contains("open")),
);
navLinks
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && setMenu(false),
);
window.addEventListener(
  "resize",
  () => window.innerWidth > 600 && setMenu(false),
);

// Esconder Nav Bar no mobile
const header = document.getElementById("header");
let lastY = 0,
  ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (window.innerWidth <= 600) {
        header.classList.toggle("hidden", y > lastY && y > 80);
      } else {
        header.classList.remove("hidden");
      }
      lastY = y;
      ticking = false;
    });
    ticking = true;
  },
  { passive: true },
);

// Tema Toggle
const html = document.documentElement;
const icon = document.getElementById("theme-icon");
const saved = localStorage.getItem("theme") || "dark";

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  icon.textContent = theme === "dark" ? "☀" : "☾";
  localStorage.setItem("theme", theme);
}

applyTheme(saved);

document.getElementById("theme-toggle").addEventListener("click", () => {
  applyTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// Validação de formulário
const fields = {
  name: {
    el: document.getElementById("f-name"),
    err: document.getElementById("err-name"),
  },
  email: {
    el: document.getElementById("f-email"),
    err: document.getElementById("err-email"),
  },
  msg: {
    el: document.getElementById("f-msg"),
    err: document.getElementById("err-msg"),
  },
};
const success = document.getElementById("form-success");

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validate(id) {
  const { el, err } = fields[id];
  const v = el.value.trim();
  let msg = "";

  if (id === "name" && v.length < 2) msg = "Informe seu nome.";
  if (id === "email" && !validateEmail(v)) msg = "E-mail inválido.";
  if (id === "msg" && v.length < 10) msg = "Mensagem muito curta.";

  err.textContent = msg;
  el.classList.toggle("invalid", !!msg);
  return !msg;
}

// Validação após perca de foco
Object.keys(fields).forEach((id) => {
  fields[id].el.addEventListener("blur", () => validate(id));
  fields[id].el.addEventListener("input", () => {
    if (fields[id].el.classList.contains("invalid")) validate(id);
  });
});

document.getElementById("form-submit").addEventListener("click", () => {
  const ok = Object.keys(fields).map(validate).every(Boolean);
  if (!ok) return;

  // Mensagem de envio
  Object.keys(fields).forEach((id) => {
    fields[id].el.value = "";
  });
  success.hidden = false;
  setTimeout(() => {
    success.hidden = true;
  }, 5000);
});
