"use client";
import styles from "./web-table-header.module.scss";
import Image from "next/image";
import { useState } from "react";
import WedButton from "@/shared/components/wed-button/WedButton";

export function WebTableHeader() {
  const [views] = useState([{ name: "all", label: "All" }]);

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header__top"]}>
          {/*TITLE*/}
          <span className={styles["header__top--title"]}>Title Example</span>

          {/*Refresh button*/}
          <div className={styles["header__top--refresh"]}>
            <Image
              className={styles["header__top--refresh__img"]}
              src={"/components/table/refresh.svg"}
              alt={"refresh"}
              width="16"
              height="16"
            />
          </div>
        </div>

        <div className={styles["header__bottom"]}>
          {/*Left*/}
          <div className={styles["header__bottom--left"]}>
            {/*Search*/}
            <label className={styles["header__bottom--search"]}>
              <div className={styles["header__bottom--search__container"]}>
                <Image
                  src={"/components/table/header/search.svg"}
                  alt={"search"}
                  width="20"
                  height="20"
                />

                <input
                  type="text"
                  placeholder={"Search"}
                  className={styles["header__bottom--search__container--input"]}
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>
            </label>

            {/*Views*/}
            <div className={styles["header__bottom--views"]}>
              <span className={styles["header__bottom--views__label"]}>
                Views
              </span>

              {/*TODO Add chips on next map*/}
              {views.map((view) => {
                return <label key={view.name}> {view.label} </label>;
              })}
            </div>
          </div>

          {/*Right*/}
          <div className={styles["header__bottom--right"]}>
            <WedButton style={"outlined"} type={"button"}>
              <>Send Invitation</>
            </WedButton>
            <WedButton style={"outlined"} type={"button"}>
              <>Delete</>
            </WedButton>
          </div>
        </div>
      </div>
    </>
  );
}
