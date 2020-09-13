import React from "react";

export const Person = (props) => {
  const callback = (number) => {
    props.callback(number);
  };

  return (
    <div
      onClick={callback.bind(null, props.number)}
      style={
        props.selected
          ? {
              backgroundColor: "#607c3c",
              border: "1px solid #607c3c",
            }
          : { backgroundColor: "#abc32f", border: "1px solid white" }
      }
    >
      {props.image}
    </div>
  );
};
