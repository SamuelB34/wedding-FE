import styles from "./web-mobile-column.module.scss";
import Image from "next/image";

export function WebMobileColumn() {
  return (
    <>
      <div className={styles["mobile-column"]}>
        <div className={styles["mobile-column__content"]}>
          <div className={styles["mobile-column__content--left"]}>
            <input type="checkbox" />
            <span
              className={styles["mobile-column__content--left__column-name"]}
            >
              Name
            </span>
          </div>
        </div>

        <div className={styles["mobile-column__content--center"]}>
          <span className={styles["mobile-column__content--center__value"]}>
            Samuel Barragan
          </span>
        </div>

        <div className={styles["mobile-column__content--right"]}>
          <div className={styles["mobile-column__content--right__button"]}>
            <Image
              src={"/components/table/mobile-column/chevron.svg"}
              alt={"chevron"}
              width="10"
              height="6"
              className={
                styles["mobile-column__content--right__button--chevron"]
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
