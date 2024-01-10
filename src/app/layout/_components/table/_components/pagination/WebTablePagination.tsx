import styles from "./web-table-pagination.module.scss";

interface Props {
  p: number;
  pp: number;
  total_count: number;
  prevClick: (view: number) => void;
  nextClick: (view: number) => void;
}

export function WebTablePagination({
  p,
  pp,
  total_count,
  prevClick,
  nextClick,
}: Props) {
  const calcPages = () => {
    return Math.ceil(total_count / pp);
  };

  return (
    <>
      {/*General*/}
      <div className={styles["pagination"]}>
        {/*container*/}
        <div className={styles["pagination__container"]}>
          {/*left*/}
          <button
            type={"button"}
            className={styles["pagination__container--button"]}
            onClick={() => {
              if (p > 1) prevClick(p - 1);
            }}
          >
            {"<"}
          </button>

          {/*center*/}
          <span className={styles["pagination__container--text"]}>
            {p} of {calcPages()}
          </span>

          {/*right*/}
          <button
            type={"button"}
            className={styles["pagination__container--button"]}
            onClick={() => {
              if (p < calcPages()) nextClick(p + 1);
            }}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}
