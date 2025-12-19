<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Zodiac UI</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0; height:200vh; background:#1e1e1e;">

<script>
(() => {
  // Remove old UI if reloaded
  document.getElementById("zodiac-topbar")?.remove();
  document.getElementById("zodiac-logo")?.remove();
  document.querySelectorAll(".zodiac-dropdown").forEach(d => d.remove());

  // Inter font
  if (!document.getElementById("zodiac-inter")) {
    const inter = document.createElement("link");
    inter.id = "zodiac-inter";
    inter.rel = "stylesheet";
    inter.href = "https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap";
    document.head.appendChild(inter);
  }

  // Font Awesome
  if (!document.getElementById("zodiac-fa")) {
    const fa = document.createElement("link");
    fa.id = "zodiac-fa";
    fa.rel = "stylesheet";
    fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    document.head.appendChild(fa);
  }

  // Top bar
  const topBar = document.createElement("div");
  topBar.id = "zodiac-topbar";
  Object.assign(topBar.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "48px",
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
    zIndex: "2147483647"
  });
  document.body.appendChild(topBar);

  // Logo
  const logo = document.createElement("div");
  logo.id = "zodiac-logo";
  logo.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  Object.assign(logo.style, {
    position: "fixed",
    top: "11px",
    left: "16px",
    fontSize: "20px",
    color: "#fff",
    zIndex: "2147483647"
  });
  document.body.appendChild(logo);

  // Data
  const categories = [
    { name: "Gold", icon: "fa-dollar" },
    { name: "Hack", icon: "fa-microchip" },
    { name: "Frenzy", icon: "fa-fish" }
  ];

  const menus = {
    gold: [
      { name: "Gold Script 1", key: "gold1" },
      { name: "Gold Script 2", key: "gold2" }
    ],
    hack: [
      { name: "Hack Script 1", key: "hack1" },
      { name: "Hack Script 2", key: "hack2" }
    ],
    frenzy: [
      { name: "Crash", key: "crash" },
      { name: "Distract", key: "distract" },
      { name: "Frenzy", key: "frenzy" },
      { name: "Lure", key: "lure" },
      { name: "Set", key: "set" }
    ]
  };

  // Script loader
  function loadAndRunScript(name) {
    const folder =
      name.startsWith("gold") ? "gold" :
      name.startsWith("hack") ? "hack" : "fish";

    fetch(`https://cdn.jsdelivr.net/gh/Darkdragonzxs/zodiac@main/blooket/${folder}/${name}.js`)
      .then(r => r.text())
      .then(code => new Function(code)())
      .catch(console.error);
  }

  function openDropdown(el) {
    el.style.display = "flex";
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }

  function closeDropdown(el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(-8px)";
    setTimeout(() => el.style.display = "none", 180);
  }

  // Build UI
  categories.forEach(cat => {
    const key = cat.name.toLowerCase();

    const btn = document.createElement("div");
    btn.innerHTML = `<i class="fa ${cat.icon}" style="margin-right:6px"></i>${cat.name}`;
    btn.style.cursor = "pointer";
    topBar.appendChild(btn);

    const dropdown = document.createElement("div");
    dropdown.className = "zodiac-dropdown";
    Object.assign(dropdown.style, {
      position: "absolute",
      display: "none",
      flexDirection: "column",
      background: "rgba(0,0,0,0.9)",
      borderRadius: "6px",
      minWidth: "160px",
      padding: "6px 0",
      color: "#fff",            // ✅ FORCE WHITE TEXT
      fontFamily: "Inter, sans-serif",
      opacity: "0",
      transform: "translateY(-8px)",
      transition: "opacity .18s ease, transform .18s ease",
      zIndex: "2147483647"
    });
    document.body.appendChild(dropdown);

    menus[key].forEach(item => {
      const opt = document.createElement("div");
      opt.textContent = item.name;
      Object.assign(opt.style, {
        padding: "8px 14px",
        cursor: "pointer",
        color: "#fff",          // ✅ FORCE WHITE TEXT
        userSelect: "text"
      });
      opt.onclick = () => loadAndRunScript(item.key);
      dropdown.appendChild(opt);
    });

    btn.onclick = e => {
      e.stopPropagation();
      dropdown.style.display = "flex";
      dropdown.style.opacity = "0";

      requestAnimationFrame(() => {
        const rect = btn.getBoundingClientRect();
        dropdown.style.left = rect.left + rect.width / 2 - dropdown.offsetWidth / 2 + "px";
        dropdown.style.top = rect.bottom + "px";
        openDropdown(dropdown);
      });
    };
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".zodiac-dropdown").forEach(closeDropdown);
  });
})();
</script>

</body>
</html>
