"use client";
import "./wed-button.scss";
import React from "react";
import WedLoader from "@/shared/components/wed-loader/WedLoader";

interface Props {
  type: "button" | "menu" | "reset" | "submit";
  style:
    | "basic"
    | "outlined"
    | "cta"
    | "cta-outlined"
    | "three-d"
    | "link"
    | "cta-gradient"
    | "secondary-button";
  disabled?: boolean;
  loading?: boolean;
  height?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.JSX.Element;
  styles?: React.CSSProperties;
}

function WebButton({
  type = "button",
  style = "basic",
  height = "40px",
  onClick,
  disabled = false,
  loading = false,
  children,
  styles = {},
}: Props) {
  const button_style = {
    height: height,
    width: "100%",
    ...styles,
  };

  let Button: JSX.Element = <div>Menu</div>;

  // Check button type
  if (type !== "menu") {
    Button = (
      <button
        type={type}
        className={`${style} ${loading ? `${style}__loading` : ""}`}
        style={button_style}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? <WedLoader /> : children}
      </button>
    );
  }

  return <>{Button}</>;
}

export default WebButton;
