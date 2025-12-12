(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const setWeight = () => {
        const reactComp = getReactComponent();
        if (reactComp) {
            const weight = Number(prompt("How much weight would you like?"));
            if (isNaN(weight)) return;
            reactComp.setState({ weight, weight2: weight });
            reactComp.props.liveGameController.setVal({
                path: `c/${reactComp.props.client.name}`,
                val: {
                    b: reactComp.props.client.blook,
                    w: weight,
                    f: ["Crab", "Jellyfish", "Frog", "Pufferfish", "Octopus", "Narwhal", "Megalodon", "Blobfish", "Baby Shark"][Math.floor(Math.random() * 9)]
                }
            });
        }
    };

    const startLoop = () => {
        setInterval(setWeight, 25);
    };

    startLoop();
})();
