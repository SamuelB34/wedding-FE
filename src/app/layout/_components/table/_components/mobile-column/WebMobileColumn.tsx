"use client";
import styles from "./web-mobile-column.module.scss";
import Image from "next/image";
import React from "react";
import { useState } from "react";

interface Props {
  columns: { name: string; label: string }[];
  content: any;
}

export function WebMobileColumn({ columns, content }: Props) {
  const [open, setOpen] = useState(false);

  const moreDetails = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={styles["mobile-column"]}>
        <div className={styles["mobile-column__content"]}>
          <div className={styles["mobile-column__content--left"]}>
            <input type="checkbox" />
            <span
              className={styles["mobile-column__content--left__column-name"]}
            >
              {columns[0].label}
            </span>
          </div>
        </div>

        <div
          className={styles["mobile-column__content--center"]}
          onClick={moreDetails}
        >
          <span className={styles["mobile-column__content--center__value"]}>
            {content[columns[0].name]}
          </span>
        </div>

        <div
          className={styles["mobile-column__content--right"]}
          onClick={moreDetails}
        >
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
        </div>

        {open && (
          <div
            className={styles["mobile-column__content--values"]}
            onClick={moreDetails}
          >
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
                    {content[column.name]}
                  </span>
                </div>
                <div></div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
