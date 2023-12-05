import Image from "next/image";
import "./dark-mode-switch.scss";

export function WebDarkModeSwitch() {
  return (
    <>
      <label className="switch">
        <span className="sun">
          <Image
            src={"/components/dark-mode-switch/sun.svg"}
            alt={"sun"}
            width={24}
            height={24}
            className="sun__image"
          />
        </span>
        <span className="moon">
          <Image
            src={"/components/dark-mode-switch/moon.svg"}
            alt={"sun"}
            width={24}
            height={24}
            className="moon__image"
          />
        </span>
        <input type="checkbox" className="input" />
        <span className="slider"></span>
      </label>
    </>
  );
}
