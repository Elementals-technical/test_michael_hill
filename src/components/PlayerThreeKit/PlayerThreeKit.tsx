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
  // authToken: "8b47f03a-fbbe-4ce8-9ce4-c38581f83b7f",
  // assetId: "2b0eaefb-51be-41d1-9d6d-289d0c6a59b5",
  // orgId: "740f5c0e-d6a5-48aa-a835-a9c7faca6c68",
  // Quadratek
  authToken: "8f130cf0-afdb-4df3-8849-57d0f825e946",
  assetId: "cf747dd9-c284-449c-8e17-c151731354fe",
  orgId: "56a89c5f-ebb1-4950-b456-552b96032eba",
};

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
          authToken: THREEKIT_PARAMS["authToken"],
          el: playerEl.current,
          assetId: THREEKIT_PARAMS["assetId"],
          // initialConfiguration: {},
          // showLoadingProgress: {
          //     loadingImage: false,
          // },
          showConfigurator: true,
        })
        .then(async (api: any) => {
          window.player = api;
          await api.when("preloaded");
          await window.player.when("loaded");

          // api.tools.removeTool('zoom');
          // window.configurator = await api.getConfigurator();

          //@ts-ignore
          const listSection = window.document.querySelectorAll("section");

          Object.values(listSection).map((item) => {
            //@ts-ignore
            if (
              //@ts-ignore
              !["asset_subcollection", "asset_shape"].includes(
                //@ts-ignore
                item.children[0].dataset.id
              )
            ) {
              item.style.display = "none";
            }
          });

         setInterval(()=>{
            let element = document.querySelector('[class*="waterMark"]');
            //@ts-ignore
            if (element) element.style.display = "none";
         },1000)
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
};
