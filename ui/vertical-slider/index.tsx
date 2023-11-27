"use client";

/*
component adapted from 
https://codepen.io/ATC-test/pen/myPNqW
*/
import styles from "./vertical-slider.module.css";

export default function VerticalSlider({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: Function;
  className?: string;
}) {
  return (
    <div className={className}>
      <input
        className={styles.inputRange}
        type="range"
        step="1"
        value={value}
        min="20"
        max="100"
        onInput={(ev: any) => onChange(ev.target.value)}
      />
    </div>
  );
}
