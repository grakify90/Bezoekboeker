import React from "react";

export const Person = (props) => {
  const callback = (number) => {
    console.log(number);
    props.callback(number);
  };

  return (
    <div
      onClick={callback.bind(null, props.number)}
      className="personSlideContainer"
    >
      {props.image}
    </div>
  );
};
