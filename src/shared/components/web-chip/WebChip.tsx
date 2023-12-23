import styles from "./web-chip.module.scss";

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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export function WebChip({
  text,
  color = "blue",
  close = false,
  onClick,
}: Props) {
  return (
    <div className={`${styles["chip"]} ${styles[`chip-${color}`]}`}>
      <span className={`${styles[`chip-${color}__label`]}`}> {text} </span>
    </div>
  );
}
