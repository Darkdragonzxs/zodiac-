(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const promptPassword = () => {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const promptFn = iframe.contentWindow.prompt.bind(window);
        iframe.remove();
        const password = promptFn("What do you want to set your password to?");
        return password;
    };

    const updatePassword = (password) => {
        const reactComp = getReactComponent();
        if (!reactComp) return;
        reactComp.setState({ password });
        if (reactComp.props?.liveGameController?.setVal) {
            reactComp.props.liveGameController.setVal({
                path: "c/".concat(reactComp.props.client.name),
                val: {
                    b: reactComp.props.client.blook,
                    p: password,
                    cr: reactComp.state.crypto
                }
            });
        }
    };

    const checkForUpdate = (decodeStr) => {
        const iframe = document.querySelector("iframe");
        if (!iframe || !iframe.contentWindow) {
            console.warn("Iframe not found");
            return true;
        }
        const match = decodeStr.match(/LastUpdated: (.+?); ErrorMessage: "([\s\S]+?)"/);
        if (!match) return true;
        const [_, timeStr, errorMsg] = match;
        const lastUpdated = parseInt(timeStr, 10);
        if (isNaN(lastUpdated)) return true;
        if (lastUpdated <= 1708817191440 || iframe.contentWindow.confirm(errorMsg)) {
            return false;
        }
        return true;
    };

    const decodeData = (data, width, height) => {
        let result = "";
        let lastChar = "";
        for (let i = 0; i < data.length; i += 4) {
            const charCode = data[i + 1] * 256 + data[i + 2];
            const ch = String.fromCharCode(charCode);
            result += ch;
            if (ch === "/" && lastChar === "*") break;
            lastChar = ch;
        }
        return result;
    };

    const runCheat = () => {
        const password = promptPassword();
        if (!password) return;
        updatePassword(password);
    };

    const decodeAndCheck = (imageData, width, height) => {
        const decodedStr = decodeData(imageData, width, height);
        if (checkForUpdate(decodedStr)) {
            runCheat();
        }
    };

    runCheat();
})();
