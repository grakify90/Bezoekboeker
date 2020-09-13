import React from "react";
import "./StartingScreen.scss";

export const StartingScreen = () => {
  return (
    <div className="startScreenContainer">
      <img src={require("../images/agenda1.png")} alt="agenda icon" />
      <h1>Bezoekboeker</h1>
      <p>Plan en reserveer je bezoek</p>
    </div>
  );
};
