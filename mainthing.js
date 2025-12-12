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
        { name: "Fish", icon: "fa-fish" }
    ];

    const scriptLibrary = {
        gold1: () => alert("Gold Script 1 Running!"),
        gold2: () => alert("Gold Script 2 Running!"),
        hack1: () => alert("Hack Script 1 Running!"),
        hack2: () => alert("Hack Script 2 Running!"),
        fish1: () => alert("Fish Script 1 Running!"),
        fish2: () => alert("Fish Script 2 Running!")
    };

    const menus = {
        gold: [
            { name: "Gold Script 1", key: "gold1" },
            { name: "Gold Script 2", key: "gold2" }
        ],
        hack: [
            { name: "Hack Script 1", key: "hack1" },
            { name: "Hack Script 2", key: "hack2" }
        ],
        fish: [
            { name: "Fish Script 1", key: "fish1" },
            { name: "Fish Script 2", key: "fish2" }
        ]
    };

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
        btn.addEventListener("mouseenter", () => btn.style.opacity = "0.6");
        btn.addEventListener("mouseleave", () => btn.style.opacity = "1");
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
            opt.addEventListener("click", () => scriptLibrary[item.key]());
            dropdown.appendChild(opt);
        });

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

        document.addEventListener("click", e => {
            if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                if (dropdown.style.display === "flex") animateClose(dropdown);
            }
        });
    });
});
