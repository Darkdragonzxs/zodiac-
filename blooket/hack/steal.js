(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const stealCrypto = () => {
        const reactComp = getReactComponent();
        if (!reactComp) return;
        const targetName = prompt("Who's crypto would you like to steal?");
        if (!targetName) return;
        reactComp.props.liveGameController.getDatabaseVal("c", (players) => {
            if (players && Object.keys(players).map(x => x.toLowerCase()).includes(targetName.toLowerCase())) {
                const entry = Object.entries(players).find(([name]) => name.toLowerCase() === targetName.toLowerCase());
                const [player, { cr }] = entry;
                reactComp.setState({
                    crypto: reactComp.state.crypto + cr,
                    crypto2: reactComp.state.crypto + cr
                });
                reactComp.props.liveGameController.setVal({
                    path: "c/" + reactComp.props.client.name,
                    val: {
                        b: reactComp.props.client.blook,
                        p: reactComp.state.password,
                        cr: reactComp.state.crypto + cr,
                        tat: `${player}:${cr}`
                    }
                });
                console.log(`Stolen ${cr} crypto from ${player}`);
            }
        });
    };

    const startLoop = () => {
        setInterval(stealCrypto, 25);
    };

    startLoop();
})();
