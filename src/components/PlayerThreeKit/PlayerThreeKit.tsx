import React, { useEffect, useState } from "react";
import load3kit from "../../utils/load3kit";
import s from "./PlayerThreeKit.module.scss";
declare global {
    interface Window {
        threekitPlayer: any;
        player: any;
        configurator: any;
    }
}

// photo 2d - config assetId:  6d344f40-a39c-41ef-a345-f60d5d425eb2
//   3d - config assetId:  9ee055fe-f147-494f-a430-87f3f99c1da8
//   3d - config assetId:  a021b220-cc7d-4052-9146-c8bb71ff7138 

export const THREEKIT_PARAMS = {
    threekitUrl: "https://preview.threekit.com/",
    authToken: "4fe54944-48a1-4310-8483-09e3464740f7",
    assetId: "c55e0f55-6e1d-48a0-b233-eba4612a9d9c",
    orgId: "d302a225-e475-477c-8f4e-e5834f24148e",
}


export const PlayerThreeKit = () => {

    const [loaded, setLoaded] = useState(false);
    const [initializing, setInitializing] = useState(false);
    const playerEl: any = React.createRef();
    const init3kit = () => {
        if (!playerEl.current) return false;

        if (window.threekitPlayer && !initializing) {
            setInitializing(true);


            window
                .threekitPlayer({
                    authToken: THREEKIT_PARAMS['authToken'],
                    el: playerEl.current,
                    assetId: THREEKIT_PARAMS['assetId'],
                    initialConfiguration: {},
                    showLoadingProgress: {
                        loadingImage: false,
                    },
                    showConfigurator: true,
                    display: "image",
                })
                .then(async (api: any) => {
                    window.player = api;
                    await api.when('preloaded');
                    await window.player.when('loaded');

                    // api.tools.removeTool('zoom');
                    // window.configurator = await api.getConfigurator();


                });
        }
    };

    useEffect(() => {
        load3kit(null, () => {
            setLoaded(true);
            init3kit();
        });
    });

    return (
        <div className={s.player_wrapper}>
            {loaded ? <div id="player" className={s.player} ref={playerEl} /> : ""}
        </div>
    );
} 