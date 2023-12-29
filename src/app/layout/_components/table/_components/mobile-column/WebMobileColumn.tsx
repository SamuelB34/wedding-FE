"use client";
import styles from "./web-mobile-column.module.scss";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { ColumnTypes } from "@/app/layout/_components/table/WebTable";
import useColumnContent from "@/shared/hooks/UseColumnContent";

interface Props {
  columns: { name: string; label: string; type: ColumnTypes }[];
  content: any;
  loading: boolean;
  selected: boolean;
  onChange: (value: { active: boolean; id: string }) => void;
  viewAction?: (id: string) => void;
  editAction?: (id: string) => void;
  deleteAction?: (id: string) => void;
}

export function WebMobileColumn({
  columns,
  content,
  loading,
  onChange,
  selected,
  viewAction,
  editAction,
  deleteAction,
}: Props) {
  const [open, setOpen] = useState(false);
  const columnContent = useColumnContent();

  const moreDetails = () => {
    if (!loading) setOpen(!open);
  };

  return (
    <>
      <div className={styles["mobile-column"]}>
        <div className={styles["mobile-column__content"]}>
          <div className={styles["mobile-column__content--left"]}>
            <input
              type="checkbox"
              disabled={loading}
              onChange={() => {
                onChange({ active: !selected, id: content["id"] });
              }}
              checked={selected}
            />

            {
              // Loading
              !loading ? (
                <span
                  className={
                    styles["mobile-column__content--left__column-name"]
                  }
                >
                  {columns.length && columns[0].label}
                </span>
              ) : (
                // No loading
                <div
                  className={
                    styles["mobile-column__content--left__column-name-loading"]
                  }
                >
                  <div className={styles["skeleton"]}></div>
                </div>
              )
            }
          </div>
        </div>

        <div
          className={styles["mobile-column__content--center"]}
          onClick={moreDetails}
        >
          {
            // No loading
            !loading ? (
              <span className={styles["mobile-column__content--center__value"]}>
                {columns.length && content[columns[0].name]}
              </span>
            ) : (
              // Loading
              <div
                className={
                  styles["mobile-column__content--center__value-loading"]
                }
              >
                <div className={styles["skeleton"]}></div>
              </div>
            )
          }
        </div>

        <div
          className={styles["mobile-column__content--right"]}
          onClick={moreDetails}
        >
          {
            // No loading
            !loading ? (
              <div className={styles["mobile-column__content--right__button"]}>
                <Image
                  src={"/components/table/mobile-column/chevron.svg"}
                  alt={"chevron"}
                  width="10"
                  height="6"
                  className={
                    open
                      ? styles[
                          "mobile-column__content--right__button--chevron-open"
                        ]
                      : styles["mobile-column__content--right__button--chevron"]
                  }
                />
              </div>
            ) : (
              <div
                className={
                  styles["mobile-column__content--right__button-loading"]
                }
              >
                <div className={styles["skeleton"]}></div>
              </div>
            )
          }
        </div>

        {open && (
          <div className={styles["mobile-column__content--values"]}>
            {columns.slice(1).map((column) => (
              <React.Fragment key={column.name}>
                <div
                  className={
                    styles["mobile-column__content--values__row--first"]
                  }
                >
                  <div
                    className={
                      styles[
                        "mobile-column__content--values__row--first__simulation"
                      ]
                    }
                  ></div>
                  <span
                    className={
                      styles["mobile-column__content--left__column-name"]
                    }
                  >
                    {column.label}
                  </span>
                </div>
                <div className={styles["mobile-column__content--center"]}>
                  <span
                    className={styles["mobile-column__content--center__value"]}
                  >
                    {columnContent(column.type, content[column.name], styles)}
                  </span>
                </div>
                <div></div>
              </React.Fragment>
            ))}
            {/*Actions*/}
            <>
              <div
                className={styles["mobile-column__content--values__row--first"]}
              >
                <div
                  className={
                    styles[
                      "mobile-column__content--values__row--first__simulation"
                    ]
                  }
                ></div>
                <span
                  className={
                    styles["mobile-column__content--left__column-name"]
                  }
                >
                  Actions
                </span>
              </div>
              <div className={styles["mobile-column__content--center"]}>
                <div
                  className={
                    styles["table__content--table__head--label__actions"]
                  }
                >
                  <Image
                    className={
                      styles["table__content--table__head--label__actions--img"]
                    }
                    src={"/components/table/eye.svg"}
                    alt={"eye"}
                    width={30}
                    height={30}
                    onClick={() => {
                      if (viewAction) viewAction(content["id"]);
                    }}
                  />
                  <Image
                    className={
                      styles["table__content--table__head--label__actions--img"]
                    }
                    src={"/components/table/pencil.svg"}
                    alt={"edit"}
                    width={18}
                    height={18}
                    onClick={() => {
                      if (editAction) editAction(content["id"]);
                    }}
                  />
                  <Image
                    className={
                      styles["table__content--table__head--label__actions--img"]
                    }
                    src={"/components/table/header/trash.svg"}
                    alt={"delete"}
                    width={30}
                    height={30}
                    onClick={() => {
                      if (deleteAction) deleteAction(content["id"]);
                    }}
                  />
                </div>
              </div>
              <div></div>
            </>
          </div>
        )}
      </div>
    </>
  );
}
