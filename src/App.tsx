import React from "react";
import "./App.css";
import { PlayerThreeKit } from "./components/PlayerThreeKit/PlayerThreeKit";

function App() {
  const onSelectBellaLuxe = async () => {
    //@ts-ignore
    const conf = await player.getConfigurator();

    await conf.setFullConfiguration({
      ["Subcollection"]: {
        assetId: "8b87be1f-b7fe-4eb1-ad39-86c8715f2ef2",
      },
    });
  };
  const onSelectShape = async () => {
    //@ts-ignore
    const conf = await player.getConfigurator();

    await conf.setFullConfiguration({
      ["Shape"]: {
        assetId: "8018a540-5d08-40bc-a739-c78cd11e246f",
      },
    });
  };

  return (
    <div className="App">
      <PlayerThreeKit />

      <div className="wrap">
        <button onClick={onSelectBellaLuxe}>set ring Bella Luxe</button>
        <button onClick={onSelectShape}>set Shape Pear</button>
      </div>
    </div>
  );
}

export default App;
