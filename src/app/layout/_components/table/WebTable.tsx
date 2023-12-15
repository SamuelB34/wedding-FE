import styles from "./web-table.module.scss";
import Image from "next/image";
import { WebTableHeader } from "@/app/layout/_components/table/_components/header/WebTableHeader";

export function WebTable() {
  return (
    <>
      <div className={styles["table"]}>
        <div className={styles["table__content"]}>
          <WebTableHeader />
        </div>
      </div>
    </>
  );
}
