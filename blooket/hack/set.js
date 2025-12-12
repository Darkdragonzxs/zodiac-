(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const promptCryptoAmount = () => {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const promptFn = iframe.contentWindow.prompt.bind(window);
        iframe.remove();
        const input = promptFn("Crypto Amount?");
        const amount = parseInt(input, 10);
        if (isNaN(amount) || amount <= 0) {
            alert("Invalid amount entered");
            return null;
        }
        return amount;
    };

    const setCrypto = (amount) => {
        const reactComp = getReactComponent();
        if (!reactComp) return;
        reactComp.setState({ crypto: amount, crypto2: amount });
        if (reactComp.props?.liveGameController?.setVal) {
            reactComp.props.liveGameController.setVal({
                path: "c/".concat(reactComp.props.client.name),
                val: {
                    b: reactComp.props.client.blook,
                    p: reactComp.state.password,
                    cr: amount
                }
            });
        }
    };

    const executeCheat = () => {
        const amount = promptCryptoAmount();
        if (amount !== null) {
            setCrypto(amount);
        }
    };

    executeCheat();
})();
