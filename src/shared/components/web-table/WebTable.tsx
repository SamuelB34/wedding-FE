import styles from "./web-table.module.scss";
import Image from "next/image";
import { useState } from "react";

interface WebTableProps {
  name: string;
  total_seats: number;
  seats_taken: number;
  names: string[];
}

export function WebTable({
  name,
  total_seats,
  seats_taken,
  names,
}: WebTableProps) {
  const radius = 50; // Radio del círculo grande (mesa central)
  const centerX = 60; // Centro X del círculo grande
  const centerY = 60; // Centro Y del círculo grande
  const [showHidden, setShowHidden] = useState(false);

  const calculatePosition = (index: number, total: number) => {
    const angle = (index / total) * (2 * Math.PI) - Math.PI / 2; // Ajuste para iniciar en la parte superior
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const createAlternatedArray = (length: number): number[] => {
    const result = [];
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        result.push(i / 2 + 1); // odd index
      } else {
        result.push(length / 2 + (i + 1) / 2); // even index
      }
    }
    return result;
  };

  return (
    <>
      <div className={styles.tables}>
        <div
          className={styles.tables__content}
          onClick={() => {
            setShowHidden(!showHidden);
          }}
        >
          <div className={styles.left}>
            <div className={styles.left__top}>
              <Image
                src={"/components/tables/table.svg"}
                alt={"table"}
                width={24}
                height={24}
              />
              <span>{name}</span>
            </div>
            <span className={styles.left__bottom}>
              {seats_taken} of {total_seats} seats taken
            </span>
          </div>

          <div className={styles.right}>
            <div className={styles.right__chevron}>
              <Image
                src={"/components/tables/chevron-down.svg"}
                alt={"chevron"}
                width={24}
                height={24}
                className={styles.img}
              />
            </div>
            <div className={styles.right__dots}>
              <Image
                src={"/components/tables/action-dots.svg"}
                alt={"dots"}
                width={24}
                height={24}
                className={styles.img}
              />
            </div>
          </div>
        </div>

        {showHidden && (
          <div className={styles.hidden_content}>
            <div>
              <div className={styles["circle-container"]}>
                <div className={styles["central-circle"]}></div>
                {createAlternatedArray(total_seats).map((_, index) => {
                  const { x, y } = calculatePosition(index, total_seats);
                  return (
                    <div
                      key={index}
                      className={styles["circle"]}
                      style={{ top: `${y}px`, left: `${x}px` }}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <span className={styles.names_list_title}>Names List:</span>

              <div className={styles.hidden_content__names}>
                {createAlternatedArray(total_seats).map((num, index) => {
                  return (
                    <div key={index}>
                      <span className={styles.list}>
                        {num}.-{" "}
                        {names[num - 1] ? (
                          <span className={styles.list__bold}>
                            {names[num - 1]}
                          </span>
                        ) : (
                          <span className={styles.list__tiny}>Empty</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div
          className={styles.progress_bar}
          style={{
            width: `${(seats_taken / total_seats) * 100}%`,
          }}
        ></div>
      </div>
    </>
  );
}
