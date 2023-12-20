import "./web-hamburger.scss";
import React from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  checked: boolean;
}

export function WebHamburger({ checked, onClick }: Props) {
  return (
    <>
      <input id="checkbox" type="checkbox" checked={checked} readOnly={true} />
      <label className="toggle" onClick={onClick}>
        <div id="bar1" className="bars"></div>
        <div id="bar2" className="bars"></div>
        <div id="bar3" className="bars"></div>
      </label>
    </>
  );
}
