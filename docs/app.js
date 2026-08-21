const typicalPostMBs = [
  { group: "Product Detail Page", name: "Product Detail Page Dwell Time", definition: "Total time spent on the product detail page" },
  { group: "Product Detail Page", name: "Swipe Down", definition: "Whether the user swiped down after entering the product detail page" },
  { group: "Product Detail Page", name: "Recommend-Tab Clicks", definition: "Number of clicks on the \"recommend\" tab to view more items" },
  { group: "Reviews & Ask", name: "Review Tag Clicks", definition: "Count of clicks on review tags" },
  { group: "Reviews & Ask", name: "Review Views", definition: "Count of views of item reviews" },
  { group: "Reviews & Ask", name: "Ask Everyone Entry Clicks", definition: "Count of entering the \"Ask Everyone\" details page" },
  { group: "Item Detail", name: "Product Detail Image Clicks", definition: "Number of clicks on product detail images" },
  { group: "Item Detail", name: "Image Zoom-Ins", definition: "Number of times the user zoomed in on images using two fingers" },
  { group: "Others", name: "Share", definition: "Whether the user initiated a share" },
  { group: "Others", name: "Service Module Clicks", definition: "Count of viewing service guarantees" },
  { group: "Others", name: "Live Chat Clicks", definition: "Count of clicks to initiate customer support live chat" }
];

const additionalPostMBs = [
  { group: "Waterfall Page (WP)", name: "Back Button Clicks in WP", definition: "Number of clicks returning to the previous page" },
  { group: "Waterfall Page (WP)", name: "Details Expand Button Clicks", definition: "Number of clicks to see the whole details" },
  { group: "Waterfall Page (WP)", name: "Like Button Clicks", definition: "Count of likes given to the item" },
  { group: "Waterfall Page (WP)", name: "Comment Button Clicks", definition: "Number of clicks to see all comments" },
  { group: "Waterfall Page (WP)", name: "Collect Button Clicks", definition: "Number of clicks collecting the item" },
  { group: "Waterfall Page (WP)", name: "Share Button Clicks", definition: "Number of clicks sharing the item" },
  { group: "Comment", name: "Comment Impressions", definition: "Count of comments exposed" },
  { group: "Comment", name: "Comment Likes", definition: "Count of likes given to the comment" },
  { group: "Comment", name: "Comment Posted Count", definition: "Count of posting comments" },
  { group: "Comment", name: "Similar Item Searches in WP", definition: "Count of searches to find similar items in WP" },
  { group: "Comment", name: "Comment Viewing Time", definition: "Total time of viewing comments" },
  { group: "Product Detail Page", name: "Back Button Clicks", definition: "Number of clicks returning to the previous page" },
  { group: "Product Detail Page", name: "Overview-Tab Clicks", definition: "Number of clicks on the \"overview\" tab" },
  { group: "Product Detail Page", name: "Reviews-Tab Clicks", definition: "Number of clicks on the \"review\" tab to read reviews" },
  { group: "Product Detail Page", name: "Details-Tab Clicks", definition: "Number of clicks on the \"detail\" tab to get detailed information" },
  { group: "Overview", name: "Main Image Impressions", definition: "Number of product images exposed" },
  { group: "Overview", name: "Video-Pause Clicks", definition: "Number of clicks made to pause video playback" },
  { group: "Overview", name: "Full Screen Mode Clicks", definition: "Number of clicks on the main image to enter the full screen mode" },
  { group: "Overview", name: "Video Play Time", definition: "Cumulative time videos are played" },
  { group: "Reviews", name: "Review Module Stay Time", definition: "Total time spent on reviews" },
  { group: "Reviews", name: "Review Likes", definition: "Count of likes given to reviews" },
  { group: "Reviews", name: "Review Shares", definition: "Number of times reviews have been shared with other users" },
  { group: "Reviews", name: "Image Views", definition: "Count of images viewed" },
  { group: "Ask Everyone", name: "Question Views", definition: "Count of views for questions" },
  { group: "Ask Everyone", name: "Answer Views", definition: "Count of views for answers" },
  { group: "Ask Everyone", name: "Answer Likes", definition: "Count of likes given to answers" },
  { group: "Ask Everyone", name: "Question Follows", definition: "Count of questions followed by the user" },
  { group: "Others", name: "Go Search Clicks", definition: "Number of clicks to initiate a search" },
  { group: "Others", name: "Go Cart Clicks", definition: "Number of clicks to navigate to the shopping cart" },
  { group: "Others", name: "Benefit Module Clicks", definition: "Number of clicks on the module offering benefits" },
  { group: "Others", name: "Similar Item Searches", definition: "Count of searches to find similar items" }
];

const documentedPostMBs = [
  ...typicalPostMBs.map((item) => ({ ...item, kind: "Typical Post-MBs" })),
  ...additionalPostMBs.map((item) => ({ ...item, kind: "Additional Post-MBs" }))
];

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[character]);
}

function initFeatureExplorer() {
  const container = document.querySelector("#feature-groups");
  const filters = document.querySelector("#feature-filters");
  const search = document.querySelector("#feature-search");
  const empty = document.querySelector("#explorer-empty");
  const count = document.querySelector("#feature-count");
  if (!container || !filters || !search || !empty) return;

  const kinds = ["Typical Post-MBs", "Additional Post-MBs"];
  let activeKind = "All";

  filters.innerHTML = ["All", ...kinds].map((kind) =>
    `<button class="filter-button${kind === "All" ? " active" : ""}" type="button" data-kind="${escapeHtml(kind)}" aria-pressed="${kind === "All"}">${escapeHtml(kind)}</button>`
  ).join("");

  function render() {
    const query = search.value.trim().toLowerCase();
    const visible = documentedPostMBs.filter((item) => {
      const inKind = activeKind === "All" || item.kind === activeKind;
      const matches = !query || `${item.name} ${item.definition} ${item.group} ${item.kind}`.toLowerCase().includes(query);
      return inKind && matches;
    });

    container.innerHTML = kinds.map((kind, kindIndex) => {
      const kindItems = visible.filter((item) => item.kind === kind);
      if (!kindItems.length) return "";
      const visibleGroups = [...new Set(kindItems.map((item) => item.group))];
      const groupMarkup = visibleGroups.map((group, groupIndex) => {
        const items = kindItems.filter((item) => item.group === group);
        const rows = items.map((item) => `<article class="feature-item"><h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.definition)}</p></article>`).join("");
        const shouldOpen = Boolean(query) || activeKind !== "All" || (kindIndex === 0 && groupIndex === 0);
        return `<details class="feature-group"${shouldOpen ? " open" : ""}><summary>${escapeHtml(group)}<span class="feature-count">${items.length.toString().padStart(2, "0")} SIGNALS</span></summary><div class="feature-list">${rows}</div></details>`;
      }).join("");
      return `<section class="feature-kind"><div class="feature-kind-head"><h4>${escapeHtml(kind)}</h4><span>${kindItems.length.toString().padStart(2, "0")} DOCUMENTED SIGNALS</span></div>${groupMarkup}</section>`;
    }).join("");
    empty.hidden = visible.length !== 0;
    if (count) count.textContent = `Showing ${visible.length} of ${documentedPostMBs.length} documented signals.`;
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-kind]");
    if (!button) return;
    activeKind = button.dataset.kind;
    filters.querySelectorAll("button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    render();
  });
  search.addEventListener("input", render);
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isEditing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable;
    if (event.key === "/" && !isEditing) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === "Escape" && document.activeElement === search) {
      search.value = "";
      search.blur();
      render();
    }
  });
  render();
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !nav.classList.contains("open")) return;
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
      toggle.focus();
    });
  }

  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if (!sections.length) return;
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-24% 0px -68%", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -7%", threshold: .08 });
  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    observer.observe(element);
  });
}

function initCopyButtons() {
  const toast = document.querySelector("#toast");
  let toastTimer;
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.innerText);
        const previous = button.textContent;
        button.textContent = "Copied";
        if (toast) {
          toast.classList.add("show");
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
        }
        setTimeout(() => { button.textContent = previous; }, 1600);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(target);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        const copied = document.execCommand("copy");
        if (copied && toast) {
          toast.textContent = "Copied to clipboard";
          toast.classList.add("show");
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
        }
      }
    });
  });
}

function initSignalField() {
  const canvas = document.querySelector("#signal-field");
  if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;
  const palette = ["#a3a5a8", "#9ab5e8", "#f47b6c", "#b78ca4"];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let pointerX = -9999;
  let pointerY = -9999;
  let frame;
  let last = performance.now();

  function resize() {
    width = innerWidth;
    height = innerHeight;
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(95, Math.min(260, Math.round(width * height / 5600)));
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      radius: Math.random() * 1.35 + .45,
      phase: Math.random() * Math.PI * 2,
      color: palette[index % palette.length],
      alpha: Math.random() * .25 + .16
    }));
  }

  function draw(now) {
    const delta = Math.min(32, now - last);
    last = now;
    context.clearRect(0, 0, width, height);
    const time = now * .00018;
    const scrollFade = Math.max(.16, 1 - scrollY / Math.max(height * 1.4, 1));
    canvas.style.opacity = String(.62 * scrollFade);

    particles.forEach((particle, index) => {
      particle.vx += Math.sin(time + particle.phase) * .0009 * delta;
      particle.vy += Math.cos(time * .8 + particle.phase) * .0008 * delta;
      const dx = particle.x - pointerX;
      const dy = particle.y - pointerY;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared < 12500 && distanceSquared > 1) {
        const distance = Math.sqrt(distanceSquared);
        const push = (1 - distance / 112) * .012 * delta;
        particle.vx += (dx / distance) * push;
        particle.vy += (dy / distance) * push;
      }
      particle.vx *= .994;
      particle.vy *= .994;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      if (particle.x < -8) particle.x = width + 8;
      if (particle.x > width + 8) particle.x = -8;
      if (particle.y < -8) particle.y = height + 8;
      if (particle.y > height + 8) particle.y = -8;

      context.globalAlpha = particle.alpha;
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();

      if (index % 11 === 0) {
        context.globalAlpha = particle.alpha * .17;
        context.strokeStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, 11 + Math.sin(time * 4 + particle.phase) * 3, 0, Math.PI * 2);
        context.stroke();
      }
    });
    context.globalAlpha = 1;
    frame = requestAnimationFrame(draw);
  }

  addEventListener("resize", resize, { passive: true });
  addEventListener("pointermove", (event) => { pointerX = event.clientX; pointerY = event.clientY; }, { passive: true });
  addEventListener("pointerleave", () => { pointerX = -9999; pointerY = -9999; }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else { last = performance.now(); frame = requestAnimationFrame(draw); }
  });
  resize();
  frame = requestAnimationFrame(draw);
}

initFeatureExplorer();
initNavigation();
initReveal();
initCopyButtons();
initSignalField();
clearTimeout(window.__revealFallback);
