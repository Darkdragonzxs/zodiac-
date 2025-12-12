(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const setFrenzy = () => {
        const reactComp = getReactComponent();
        if (reactComp) {
            reactComp.props.liveGameController.setVal({
                path: "c/" + reactComp.props.client.name,
                val: {
                    b: reactComp.props.client.blook,
                    w: reactComp.state.weight,
                    f: "Frenzy",
                    s: true
                }
            });
        }
    };

    const startFrenzy = () => {
        setInterval(setFrenzy, 25);
    };

    startFrenzy();
})();
