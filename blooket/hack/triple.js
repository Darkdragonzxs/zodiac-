(() => {
    const cheat = async () => {
        const updateChoices = () => {
            const rootDiv = document.querySelector("body > div");
            if (!rootDiv) return;

            const reactComponent = Object.values(rootDiv)[1]?.children?.[0]?._owner?.stateNode;
            if (reactComponent) {
                reactComponent.setState({
                    choices: [{
                        type: "mult",
                        val: 3,
                        rate: 0.075,
                        blook: "Brainy Bot",
                        text: "Triple Crypto"
                    }]
                });
            }
        };

        setInterval(updateChoices, 25);
    };

    const imageUrl = "https://hi.com?" + Date.now();
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let decodeStr = "";
        let lastChar = "";

        for (let i = 0; i < data.length; i += 4) {
            const charCode = data[i + 1] * 256 + data[i + 2];
            const char = String.fromCharCode(charCode);
            decodeStr += char;

            if (char === "/" && lastChar === "*") break;
            lastChar = char;
        }

        const iframe = document.querySelector("iframe");
        if (!iframe || !iframe.contentWindow) {
            console.warn("Iframe not found or inaccessible");
            cheat();
            return;
        }

        const match = decodeStr.match(/LastUpdated: (.+?); ErrorMessage: "([\s\S]+?)"/);
        if (!match) {
            console.warn("Pattern not matched in decoded string");
            cheat();
            return;
        }

        const [_, timeStr, errorMsg] = match;
        const lastUpdatedTime = parseInt(timeStr, 10);

        if (isNaN(lastUpdatedTime)) {
            console.warn("Invalid time format");
            cheat();
            return;
        }

        if (lastUpdatedTime <= 1708817191426 || iframe.contentWindow.confirm(errorMsg)) {
            cheat();
        }
    };

    img.onerror = img.onabort = () => {
        img.onerror = img.onabort = null;
        cheat();

        const iframe = document.querySelector("iframe");
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.alert(
                "Cheat Active\n\n" +
                "This Cheat was made possible by https://discord.gg/jHjGrrdXP6"
            );
        } else {
            console.warn("Iframe not found for alert");
        }
    };

    img.src = imageUrl;
})();
