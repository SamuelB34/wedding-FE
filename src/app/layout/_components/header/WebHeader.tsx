"use client";
import styles from "./web-header.module.scss";
import { WebHamburger } from "@/shared/components/web-hamburger/WebHamburger";
import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";

export function WebHeader() {
  const [user] = useState("Samuel Barragan");
  const [menuClass, setMenuClass] = useState<"menu" | "menu-open">("menu");

  const turnMenu = () => {
    if (menuClass === "menu") setMenuClass("menu-open");
    else setMenuClass("menu");
  };

  return (
    <div className={styles["body-container"]}>
      <div className={styles["container"]}>
        <div className={styles["container__content"]}>
          <div className={styles["container__content--hamburger-menu"]}>
            <WebHamburger
              checked={menuClass === "menu-open"}
              onClick={turnMenu}
            />
          </div>

          <span className={styles["container__content--title"]}>Sam-Mel</span>

          <div className={styles["container__content--left"]}>
            <nav className={styles["container__content--left__nav"]}>
              <a
                href="#"
                className={styles["container__content--left__nav--link"]}
              >
                Guests
              </a>
              <a
                href="#"
                className={styles["container__content--left__nav--link"]}
              >
                Groups
              </a>
              <a
                href="#"
                className={styles["container__content--left__nav--link"]}
              >
                Tables
              </a>
            </nav>

            <div className={styles["container__content--user__content"]}>
              <div className={styles["container__content--user"]}>
                <span className={styles["container__content--user__letter"]}>
                  {user.charAt(0)}
                </span>
              </div>
              <span className={styles["container__content--user__name"]}>
                {user}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles[menuClass]}>
        <div className={styles["menu-open__content"]}>
          <div
            className={styles["menu-open__content--back"]}
            onClick={turnMenu}
          >
            <Image
              src={"/layout/header/back.svg"}
              alt={"back"}
              width={16}
              height={16}
            />
            <span className={styles["menu-open__content--back__text"]}>
              Back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
