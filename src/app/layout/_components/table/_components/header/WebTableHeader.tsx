"use client";
import styles from "./web-table-header.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import WebButton from "@/shared/components/wed-button/WebButton";
import { WebChip } from "@/shared/components/web-chip/WebChip";
import { numberFormat } from "@/shared/functions/format";
import { useDebounce } from "@/shared/hooks/UseDebounce";

interface Props {
  title: string;
  loading: boolean;
  records: number;
  columnsSelected: any[];
  sendButton?: boolean;
  showViews?: boolean;
  sendClick?: () => void;
  deleteClick?: () => void;
  refreshClick?: () => void;
  downloadClick?: () => void;
  createClick?: () => void;
  selectAll?: () => void;
  viewClick?: (view: string) => void;
  searchFunction?: (view: string) => void;
}

export function WebTableHeader({
  title,
  loading = true,
  records,
  sendButton = false,
  sendClick,
  deleteClick,
  refreshClick,
  downloadClick,
  createClick,
  viewClick,
  columnsSelected,
  searchFunction,
  selectAll,
  showViews = true,
}: Props) {
  const [views] = useState([
    {
      name: [
        "659a14f1f429caac82b1f61a",
        "659c4ca18854328da35719c4",
        "659c4d788854328da35719cc",
        "659c4d528854328da35719c8",
        "659c4de08854328da35719d0",
        "659c4dfc8854328da35719d4",
      ].toString(),
      label: "All",
    },
    {
      name: ["659c4d788854328da35719cc", "659c4d528854328da35719c8"].toString(),
      label: "Fam. Barragan",
    },
    {
      name: ["659c4de08854328da35719d0", "659c4dfc8854328da35719d4"].toString(),
      label: "Fam. Araiza",
    },
    { name: "659c4ca18854328da35719c4", label: "Melissa" },
    { name: "659a14f1f429caac82b1f61a", label: "Samuel" },
  ]);
  const [value, setValue] = useState<string>("");
  const [viewSelected, setViewSelected] = useState<string>("all");

  const debouncedValue = useDebounce<string>(value, 800);

  useEffect(() => {
    if (searchFunction) searchFunction(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header__top"]}>
          {/*TITLE*/}
          {!loading ? (
            <div className={styles["header__top--title-container"]}>
              <span className={styles["header__top--title"]}>{title}</span>

              <span className={styles["header__top--count"]}>
                {" "}
                {numberFormat(records)} records{" "}
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
            <div className={styles["header__top--buttons"]}>
              <div
                className={styles["header__top--refresh"]}
                onClick={refreshClick}
              >
                <Image
                  className={styles["header__top--refresh__img"]}
                  src={"/components/table/refresh.svg"}
                  alt={"refresh"}
                  width="16"
                  height="16"
                />
              </div>

              <div
                className={styles["header__top--refresh"]}
                onClick={downloadClick}
              >
                <Image
                  className={styles["header__top--refresh__download"]}
                  src={"/components/tables/download.svg"}
                  alt={"download"}
                  width="16"
                  height="16"
                />
              </div>

              <div
                className={styles["header__top--create"]}
                onClick={createClick}
              >
                <Image
                  className={styles["header__top--create__img"]}
                  src={"/components/table/header/plus.svg"}
                  alt={"refresh"}
                  width="24"
                  height="24"
                />
              </div>
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
                    placeholder={"Search by name"}
                    className={
                      styles["header__bottom--search__container--input"]
                    }
                    onChange={(text) => {
                      setValue(text.target.value);
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
              <>
                {showViews && (
                  <>
                    <div className={styles["header__bottom--views"]}>
                      <span className={styles["header__bottom--views__label"]}>
                        Created by:
                      </span>

                      {/*TODO Add chips on next map*/}
                      {views.map((view) => {
                        return (
                          <WebChip
                            color={
                              view.name === viewSelected ? "dark-blue" : "blue"
                            }
                            text={view.label}
                            key={view.name}
                            onClick={() => {
                              if (viewClick) viewClick(view.name);
                              setViewSelected(view.name);
                            }}
                          />
                        );
                      })}
                    </div>
                    <span className={styles["select-all"]} onClick={selectAll}>
                      Select All
                    </span>
                  </>
                )}
              </>
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
                  <WebButton
                    style={"outlined"}
                    type={"button"}
                    onClick={sendClick}
                    disabled={!columnsSelected.length}
                  >
                    <span className={styles["header__bottom--right__label"]}>
                      <Image
                        src={"/components/table/header/whats-app.svg"}
                        alt={"whats"}
                        width={16}
                        height={16}
                      />
                      Send Invitation
                    </span>
                  </WebButton>
                ) : (
                  <div className={styles["header__bottom--right-send-loading"]}>
                    <div className={styles["skeleton"]}></div>
                  </div>
                )}
              </>
            )}

            {!loading ? (
              <WebButton
                style={"outlined"}
                type={"button"}
                onClick={deleteClick}
                disabled={!columnsSelected.length}
              >
                <span className={styles["header__bottom--right__label"]}>
                  <Image
                    src={"/components/table/header/trash.svg"}
                    alt={"whats"}
                    width={24}
                    height={24}
                  />
                  Delete
                </span>
              </WebButton>
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
