(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const swapGoldPlayers = () => {
        const reactComp = getReactComponent();
        if (!reactComp) return;
        reactComp.props.liveGameController.getDatabaseVal("c", (players) => {
            if (players) {
                const playerEntries = Object.entries(players).map(([name, { b, g }]) => ({
                    name,
                    blook: b,
                    gold: g || 0
                })).filter(e => e.name !== reactComp.props.client.name)
                  .sort((a, b) => b.gold - a.gold);
                reactComp.setState({
                    players: playerEntries,
                    ready: true,
                    phaseTwo: true,
                    stage: "prize",
                    choiceObj: { type: "swap" }
                });
            }
        });
    };

    swapGoldPlayers();
})();
