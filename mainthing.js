// --- MAIN BAR CREATION ---
const topBar = document.createElement("div");
Object.assign(topBar.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "40px",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
    zIndex: "9999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
});

// Category names
const categories = ["Games", "Apps", "Browser"];

// Create buttons
categories.forEach(cat => {
    const btn = document.createElement("div");
    btn.textContent = cat;
    btn.dataset.cat = cat.toLowerCase();
    Object.assign(btn.style, {
        cursor: "pointer",
        userSelect: "none",
        transition: "opacity .2s",
    });

    btn.addEventListener("mouseenter", () => btn.style.opacity = "0.7");
    btn.addEventListener("mouseleave", () => btn.style.opacity = "1");

    topBar.appendChild(btn);
});

// Append main top bar
document.body.appendChild(topBar);


// --- SUB BAR CREATION ---
const subBar = document.createElement("div");
Object.assign(subBar.style, {
    position: "fixed",
    top: "40px",
    left: "0",
    width: "100%",
    height: "40px",
    background: "rgba(20,20,20,0.65)",
    backdropFilter: "blur(6px)",
    zIndex: "9998",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    fontSize: "13px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
});
document.body.appendChild(subBar);


// --- MENU ITEMS ---
const menus = {
    games: ["Game 1", "Game 2", "Game 3"],
    apps: ["App A", "App B", "App C"],
    browser: null
};


// --- CLICK HANDLER ---
topBar.addEventListener("click", e => {
    const cat = e.target.dataset.cat;
    if (!cat) return;

    if (cat === "browser") {
        // placeholder: no action for now
        subBar.style.display = "none";
        return;
    }

    // Clear old items
    subBar.innerHTML = "";

    // Add new items
    menus[cat].forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;

        Object.assign(div.style, {
            cursor: "pointer",
            transition: "opacity .2s",
        });

        div.addEventListener("mouseenter", () => div.style.opacity = "0.7");
        div.addEventListener("mouseleave",  () => div.style.opacity = "1");

        subBar.appendChild(div);
    });

    // Show sub bar
    subBar.style.display = "flex";
});
