"use client";
import styles from "./web-header.module.scss";
import { WebHamburger } from "@/shared/components/web-hamburger/WebHamburger";
import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/app/layout/_components/header/_helpers/routes";
import { WebDarkModeSwitch } from "@/shared/components/web-dark-mode-switch/WebDarkModeSwitch";
import { getUserById } from "@/shared/services/authService";
import { useRouter } from "next/navigation";

export function WebHeader() {
  const [user, setUser] = useState("--");
  const [menuClass, setMenuClass] = useState<"menu" | "menu-open">("menu");
  const [accountMenu, setAccountMenu] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  const logOut = () => {
    setAccountMenu(false);
    localStorage.clear();
    router.push("/");
  };

  const getUserData = async () => {
    try {
      const id = localStorage.getItem("id");
      if (id) {
        const user = await getUserById(id);
        const data = user.data;

        const name = `${data.first_name} ${
          data.middle_name && `${data.middle_name} `
        }${data.last_name}`;
        setUser(name);
      }
    } catch (e: any) {
      if (e && e.response.status === 401) {
        localStorage.clear();
        router.push("/");
      }
    }
  };

  const turnMenu = () => {
    if (menuClass === "menu") setMenuClass("menu-open");
    else setMenuClass("menu");
  };

  return (
    <div className={styles["body-container"]}>
      <div className={styles["container"]}>
        {/*TOP*/}
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
              {routes.map((route: { title: string; path: string }) => {
                return (
                  <Link
                    href={route.path}
                    key={route.title}
                    className={styles["container__content--left__nav--link"]}
                  >
                    {route.title}
                  </Link>
                );
              })}
            </nav>

            {/*Account*/}
            <div className={styles["container__content--user__content"]}>
              <div
                className={styles["container__content--user"]}
                onClick={() => {
                  setAccountMenu(!accountMenu);
                }}
              >
                <span className={styles["container__content--user__letter"]}>
                  {user.charAt(0)}
                </span>
              </div>
              <span
                className={styles["container__content--user__name"]}
                onClick={() => {
                  setAccountMenu(!accountMenu);
                }}
              >
                {user}
              </span>

              {accountMenu && (
                <div
                  className={styles["container__content--user__content__menu"]}
                  onClick={logOut}
                >
                  <div
                    className={
                      styles["container__content--user__content__menu--content"]
                    }
                  >
                    <div
                      className={
                        styles[
                          "container__content--user__content__menu--content__logout"
                        ]
                      }
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*Side menu*/}
      <div className={styles[menuClass]}>
        <div className={styles["menu-open__content"]}>
          <div className={styles["menu-open__content--container"]}>
            {/*Back*/}
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

            {/*Routes*/}
            <nav className={styles["menu-open__content--nav"]}>
              {routes.map((route: { title: string; path: string }) => {
                return (
                  <Link
                    href={route.path}
                    key={route.title}
                    className={styles["menu-open__content--nav__route"]}
                    onClick={turnMenu}
                  >
                    {route.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className={styles["menu-open__content--footer"]}>
            <div
              className={styles["menu-open__content--footer__settings"]}
              onClick={logOut}
            >
              <Image
                src={"/layout/header/logout.svg"}
                alt={"settings"}
                width={32}
                height={32}
              />

              <span
                className={styles["menu-open__content--footer__settings--text"]}
              >
                Log Out
              </span>
            </div>

            <WebDarkModeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
