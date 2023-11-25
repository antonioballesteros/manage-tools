"use client";

/*
component adapted from 
https://codesandbox.io/p/sandbox/react-triple-toggle-forked-lpk2i5?file=%2Fsrc%2Ftriple.js
*/
import { useState } from "react";

import { Align, Row } from "@/lib/grid";

// This should be a module, but I don't want to spend time translating it
import "./triple-toggle-switch.css";

const labels = {
  left: {
    title: "Left",
    value: Align.LEFT,
  },
  right: {
    title: "Right",
    value: Align.RIGHT,
  },
  center: {
    title: "Center",
    value: Align.CENTER,
  },
};

export default function TripleToggleSwitch({
  row,
  onChange,
}: {
  row: Row;
  onChange: Function;
}) {
  const { id, align } = row;

  const [switchPosition, setSwitchPosition] = useState(align);
  const [animation, setAnimation] = useState("");

  const getSwitchAnimation = (value: Align): void => {
    let animation = "";

    if (value === Align.CENTER && switchPosition === Align.LEFT) {
      animation = "left-to-center";
    } else if (value === Align.RIGHT && switchPosition === Align.CENTER) {
      animation = "center-to-right";
    } else if (value === Align.CENTER && switchPosition === Align.RIGHT) {
      animation = "right-to-center";
    } else if (value === Align.LEFT && switchPosition === Align.CENTER) {
      animation = "center-to-left";
    } else if (value === Align.RIGHT && switchPosition === Align.LEFT) {
      animation = "left-to-right";
    } else if (value === Align.LEFT && switchPosition === Align.RIGHT) {
      animation = "right-to-left";
    }
    setAnimation(animation);
    setSwitchPosition(value);
    onChange({
      ...row,
      align: value,
    });
  };

  return (
    <div className="main-container">
      <div className={`switch ${animation} ${switchPosition}-position`}></div>
      <input
        onChange={(e) => getSwitchAnimation(e.target.value as Align)}
        name={`map-switch-${id}`}
        className="left"
        id={`left-${id}`}
        type="radio"
        value={Align.LEFT}
      />
      <label
        className={`left-label ${
          switchPosition === Align.LEFT && "black-font"
        }`}
        htmlFor={`left-${id}`}
      >
        <h4>{labels.left.title}</h4>
      </label>

      <input
        onChange={(e) => getSwitchAnimation(e.target.value as Align)}
        name={`map-switch-${id}`}
        id={`center-${id}`}
        className="center"
        type="radio"
        value={Align.CENTER}
      />
      <label
        className={`center-label ${
          switchPosition === Align.CENTER && "black-font"
        }`}
        htmlFor={`center-${id}`}
      >
        <h4>{labels.center.title}</h4>
      </label>

      <input
        onChange={(e) => getSwitchAnimation(e.target.value as Align)}
        name={`map-switch-${id}`}
        id={`right-${id}`}
        className="right"
        type="radio"
        value={Align.RIGHT}
      />
      <label
        className={`right-label ${
          switchPosition === Align.RIGHT && "black-font"
        }`}
        htmlFor={`right-${id}`}
      >
        <h4>{labels.right.title}</h4>
      </label>
    </div>
  );
}
