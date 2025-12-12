(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const setLure = () => {
        const reactComp = getReactComponent();
        if (reactComp) {
            const lureLevel = Math.max(Math.min(parseInt(prompt("(1 - 5)")) - 1, 4), 0);
            reactComp.setState({ lure: lureLevel });
        }
    };

    const startLoop = () => {
        setInterval(setLure, 25);
    };

    startLoop();
})();
