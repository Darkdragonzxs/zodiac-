(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const enableTripleGold = () => {
        const reactComp = getReactComponent();
        if (!reactComp) return;
        if (reactComp.state.gold === 0) {
            reactComp.setState({ gold: 100, gold2: 100 });
        }
        reactComp._choosePrize ||= reactComp.choosePrize;
        reactComp.choosePrize = function (i) {
            reactComp.state.choices[i] = {
                type: "multiply",
                val: 3,
                text: "Triple Gold!",
                blook: "Unicorn"
            };
            reactComp._choosePrize(i);
        };
    };

    enableTripleGold();
})();
