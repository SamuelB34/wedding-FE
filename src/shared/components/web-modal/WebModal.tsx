import styles from "./web-modal.module.scss";
import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  children: React.JSX.Element;
  close: () => void;
}

export function WebModal({ title, children, close }: Props) {
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["container__modal"]}>
          {/*Header*/}
          <div className={styles["container__modal--header"]}>
            <span className={styles["container__modal--header__title"]}>
              {title}
            </span>

            <Image
              src={"/components/table/header/plus.svg"}
              alt={"x"}
              width={32}
              height={32}
              className={styles["container__modal--header__x"]}
              onClick={close}
            />
          </div>

          {/*Content*/}
          <div className={styles["container__modal--content"]}>
            <div className={styles["container__modal--content__container"]}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
