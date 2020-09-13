import React from "react";

export const Timeslot = (props) => {
  const callback = (start, end) => {
    props.callback(start, end);
  };

  return (
    <div
      onClick={callback.bind(null, props.start, props.end)}
      className="personSlideContainer"
    >
      <span>{props.start}</span>
      <span>tot</span>
      <span>{props.end}</span>
    </div>
  );
};
