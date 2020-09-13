import React from "react";

export const Timeslot = (props) => {
  const callback = (start, end) => {
    props.callback(start, end);
  };

  return (
    <div
      onClick={callback.bind(null, props.start, props.end)}
      style={
        props.selected
          ? {
              backgroundColor: "#607c3c",
              border: "1px solid #607c3c",
            }
          : { backgroundColor: "#abc32f", border: "1px solid white" }
      }
    >
      <span>{props.start}</span>
      <span>tot</span>
      <span>{props.end}</span>
    </div>
  );
};
