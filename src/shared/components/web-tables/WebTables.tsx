"use client";
import styles from "./web-tables.module.scss";
import { numberFormat } from "@/shared/functions/format";
import Image from "next/image";
import { WebChip } from "@/shared/components/web-chip/WebChip";
import WebButton from "@/shared/components/wed-button/WebButton";
import { WebTable } from "@/shared/components/web-table/WebTable";

interface Props {
  loading: boolean;
  records: number;
  sendButton?: boolean;
  showViews?: boolean;
  sendClick?: () => void;
  deleteClick?: () => void;
  refreshClick?: () => void;
  downloadClick?: () => void;
  selectAll?: () => void;
  viewClick?: (view: string) => void;
  searchFunction?: (view: string) => void;
}

export function WebTables({
  loading = true,
  records,
  refreshClick,
  downloadClick,
}: Props) {
  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header__top"]}>
          {/*TITLE*/}
          {!loading ? (
            <div className={styles["header__top--title-container"]}>
              <span className={styles["header__top--title"]}>Tables</span>

              <span className={styles["header__top--count"]}>
                {" "}
                {numberFormat(records)} tables full
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
                className={styles["header__top--create"]}
                onClick={downloadClick}
              >
                <Image
                  className={styles["header__top--create__img"]}
                  src={"/components/tables/download.svg"}
                  alt={"download"}
                  width="16"
                  height="16"
                />
              </div>
            </div>
          ) : (
            <div className={styles["header__top--refresh-loading"]}>
              <div className={styles["skeleton"]}></div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tables_list}>
        <WebTable
          name={"Mesa 1"}
          seats_taken={3}
          total_seats={10}
          names={["Ana", "Luis", "Carlos"]}
        />
        <WebTable
          name={"Mesa 2"}
          seats_taken={5}
          total_seats={12}
          names={["Ana", "Luis", "Carlos", "Messi", "CR7"]}
        />
        <WebTable
          name={"Mesa 3"}
          seats_taken={1}
          total_seats={12}
          names={["Julio"]}
        />
      </div>
    </>
  );
}
