import styles from "./web-chip.module.scss";
import React from "react";

interface Props {
  text: string;
  color:
    | "red"
    | "yellow"
    | "green"
    | "dark-green"
    | "blue"
    | "purple"
    | "gray"
    | "outlined";
  close?: boolean;
  onClick?: any;
}
export function WebChip({
  text,
  color = "blue",
  close = false,
  onClick,
}: Props) {
  return (
    <div
      className={`${styles["chip"]} ${styles[`chip-${color}`]}`}
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={(event) => {
        if (onClick) onClick(event);
      }}
    >
      <span className={`${styles[`chip-${color}__label`]}`}> {text} </span>
    </div>
  );
}
