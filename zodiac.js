document.addEventListener("DOMContentLoaded", () => {
    const topBar = document.createElement("div");
    Object.assign(topBar.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        color: "white",
        background: "transparent",
        zIndex: "999999",
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        fontSize: "16px"
    });
    document.body.appendChild(topBar);

    const logo = document.createElement("div");
    logo.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    Object.assign(logo.style, {
        position: "fixed",
        top: "8px",
        left: "15px",
        fontSize: "20px",
        color: "white",
        zIndex: "1000000",
        cursor: "pointer"
    });
    document.body.appendChild(logo);

    const categories = [
        { name: "Gold", icon: "fa-coins" },
        { name: "Hack", icon: "fa-bug" },
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

    function loadAndRunScript(scriptName) {
        let pathPrefix = "";
        if (scriptName.startsWith("gold")) {
            pathPrefix = "/blooket/gold/";
        } else if (scriptName.startsWith("hack")) {
            pathPrefix = "/blooket/hack/";
        } else {
            pathPrefix = "/blooket/fish/";
        }
        const scriptUrl = `https://cdn.jsdelivr.net/gh/Darkdragonzxs/zodiac-@main/blooket${pathPrefix}${scriptName}.js`;
        fetch(scriptUrl)
            .then(response => response.text())
            .then(scriptText => {
                eval(scriptText);
            })
            .catch(error => console.error("Error loading script:", error));
    }

    function animateOpen(el) {
        el.style.display = "flex";
        requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";
        });
    }

    function animateClose(el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(-6px)";
        setTimeout(() => {
            el.style.display = "none";
        }, 180);
    }

    categories.forEach(cat => {
        const btn = document.createElement("div");
        btn.dataset.cat = cat.name.toLowerCase();
        btn.innerHTML = `<i class="fa ${cat.icon}" style="margin-right:6px;"></i>${cat.name}`;
        Object.assign(btn.style, {
            cursor: "pointer",
            color: "white",
            display: "flex",
            alignItems: "center",
            transition: "opacity .2s"
        });
        topBar.appendChild(btn);

        const dropdown = document.createElement("div");
        Object.assign(dropdown.style, {
            position: "absolute",
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minWidth: "150px",
            color: "white",
            background: "rgba(0,0,0,0.6)",
            borderRadius: "6px",
            zIndex: "999999",
            opacity: "0",
            transform: "translateY(-6px)",
            transition: "opacity .18s ease, transform .18s ease",
            padding: "5px 0"
        });
        document.body.appendChild(dropdown);

        menus[btn.dataset.cat].forEach(item => {
            const opt = document.createElement("div");
            opt.textContent = item.name;
            Object.assign(opt.style, {
                padding: "6px 12px",
                cursor: "pointer",
                color: "white",
                transition: "opacity .15s",
                width: "100%",
                textAlign: "center"
            });
            opt.addEventListener("mouseenter", () => opt.style.opacity = "0.6");
            opt.addEventListener("mouseleave", () => opt.style.opacity = "1");
            opt.addEventListener("click", () => loadAndRunScript(item.key));
            dropdown.appendChild(opt);
        });

        if (menus[btn.dataset.cat]) {
            btn.addEventListener("click", e => {
                e.stopPropagation();
                if (dropdown.style.display === "flex") {
                    animateClose(dropdown);
                } else {
                    dropdown.style.display = "flex";
                    dropdown.style.opacity = "0";
                    dropdown.style.transform = "translateY(-6px)";
                    const rect = btn.getBoundingClientRect();
                    const dropdownWidth = dropdown.offsetWidth;
                    dropdown.style.left = rect.left + rect.width / 2 - dropdownWidth / 2 + "px";
                    dropdown.style.top = rect.bottom + "px";
                    animateOpen(dropdown);
                }
            });
        }

        document.addEventListener("click", e => {
            if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                if (dropdown.style.display === "flex") animateClose(dropdown);
            }
        });
    });
});
