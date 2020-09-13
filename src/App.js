import React, { useEffect, useState } from "react";

import { StartingScreen } from "./pages/StartingScreen";
import { Boeker } from "./pages/Boeker";
import { Confirmation } from "./pages/Confirmation";

function App() {
  const [screen, setScreen] = useState(0);

  const changeScreen = () => {
    setScreen(2);
  };

  useEffect(() => {
    setTimeout(() => setScreen(screen + 1), 100);
  }, []);

  return (
    <div>
      {screen === 0 ? (
        <StartingScreen />
      ) : screen === 1 ? (
        <Boeker callback={changeScreen} />
      ) : (
        <Confirmation />
      )}
    </div>
  );
}

export default App;
