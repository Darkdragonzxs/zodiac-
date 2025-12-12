(() => {
    const getReactComponent = () => {
        const root = document.querySelector("body > div");
        if (!root) return null;
        return Object.values(root)[1]?.children?.[0]?._owner?.stateNode || null;
    };

    const sendDistraction = () => {
        const reactComp = getReactComponent();
        if (reactComp) {
            const distractions = ["Crab", "Jellyfish", "Frog", "Pufferfish", "Octopus", "Narwhal", "Megalodon", "Blobfish", "Baby Shark"];
            const f = distractions[Math.floor(Math.random() * distractions.length)];
            reactComp.safe = true;
            reactComp.props.liveGameController.setVal({
                path: `c/${reactComp.props.client.name}`,
                val: {
                    b: reactComp.props.client.blook,
                    w: reactComp.state.weight,
                    f: f,
                    s: true
                }
            });
        }
    };

    const startSending = () => {
        setInterval(sendDistraction, 25);
    };

    startSending();
})();
