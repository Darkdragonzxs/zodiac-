(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const updateChoices = () => {
        const reactComp = getReactComponent();
        if (reactComp) {
            reactComp.setState({
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

    const runCheat = () => {
        setInterval(updateChoices, 25);
    };

    runCheat();
})();
