"use client";
import styles from "./web-table-header.module.scss";
import Image from "next/image";
import { useState } from "react";
import WedButton from "@/shared/components/wed-button/WedButton";
import { WebChip } from "@/shared/components/web-chip/WebChip";

interface Props {
  loading: boolean;
  records: number;
  sendButton?: boolean;
}

export function WebTableHeader({
  loading = true,
  records = 0,
  sendButton = false,
}: Props) {
  const [views] = useState([{ name: "all", label: "All" }]);

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header__top"]}>
          {/*TITLE*/}
          {!loading ? (
            <div className={styles["header__top--title-container"]}>
              <span className={styles["header__top--title"]}>
                Title Example
              </span>
              <span className={styles["header__top--count"]}>
                {" "}
                {records} records{" "}
              </span>
            </div>
          ) : (
            <div className={styles["header__top--title-container"]}>
              <div className={styles["header__top--title-loading"]}>
                <div className={styles["skeleton"]}></div>
              </div>
              <div className={styles["header__top--count-loading"]}>
                <div className={styles["skeleton"]}></div>
              </div>
            </div>
          )}

          {/*Refresh button*/}
          {!loading ? (
            <div className={styles["header__top--refresh"]}>
              <Image
                className={styles["header__top--refresh__img"]}
                src={"/components/table/refresh.svg"}
                alt={"refresh"}
                width="16"
                height="16"
              />
            </div>
          ) : (
            <div className={styles["header__top--refresh-loading"]}>
              <div className={styles["skeleton"]}></div>
            </div>
          )}
        </div>

        <div className={styles["header__bottom"]}>
          {/*Left*/}
          <div className={styles["header__bottom--left"]}>
            {/*Search*/}
            {!loading ? (
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
                    className={
                      styles["header__bottom--search__container--input"]
                    }
                    onChange={(value) => {
                      console.log(value);
                    }}
                  />
                </div>
              </label>
            ) : (
              <div className={styles["header__bottom--search-loading"]}>
                <div className={styles["skeleton"]}></div>
              </div>
            )}

            {/*Views*/}
            {!loading ? (
              <div className={styles["header__bottom--views"]}>
                <span className={styles["header__bottom--views__label"]}>
                  View:
                </span>

                {/*TODO Add chips on next map*/}
                {views.map((view) => {
                  return (
                    <WebChip color={"blue"} text={view.label} key={view.name} />
                  );
                })}
              </div>
            ) : (
              <div className={styles["header__bottom--views-loading"]}>
                <div className={styles["skeleton"]}></div>
              </div>
            )}
          </div>

          {/*Right*/}
          <div className={styles["header__bottom--right"]}>
            {sendButton && (
              <>
                {!loading ? (
                  <WedButton style={"outlined"} type={"button"}>
                    <span className={styles["header__bottom--right__label"]}>
                      <Image
                        src={"/components/table/header/whats-app.svg"}
                        alt={"whats"}
                        width={16}
                        height={16}
                      />
                      Send Invitation
                    </span>
                  </WedButton>
                ) : (
                  <div className={styles["header__bottom--right-send-loading"]}>
                    <div className={styles["skeleton"]}></div>
                  </div>
                )}
              </>
            )}

            {!loading ? (
              <WedButton style={"outlined"} type={"button"}>
                <span className={styles["header__bottom--right__label"]}>
                  <Image
                    src={"/components/table/header/trash.svg"}
                    alt={"whats"}
                    width={24}
                    height={24}
                  />
                  Delete
                </span>
              </WedButton>
            ) : (
              <div className={styles["header__bottom--right-delete-loading"]}>
                <div className={styles["skeleton"]}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
