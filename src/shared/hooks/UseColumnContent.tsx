import React from "react";
import { phoneFormat } from "@/shared/functions/format";
import { WebChip } from "@/shared/components/web-chip/WebChip";
import { ColumnTypes } from "@/app/layout/_components/table/WebTable";

const useColumnContent = () => {
  const columnContent = (
    column_type: ColumnTypes,
    value: string | boolean | number,
    styles: any, // Agrega estilos como argumento si los necesitas
  ) => {
    switch (column_type) {
      case "text":
        return (
          <span className={styles["table__content--table__body--row__value"]}>
            {value}
          </span>
        );
      case "boolean":
        return (
          <span
            className={
              styles["table__content--table__body--row__value-content"]
            }
          >
            {value === true ? (
              <WebChip text={"Yes"} color={"green"} />
            ) : (
              <WebChip text={"No"} color={"red"} />
            )}
          </span>
        );
      case "email":
        return (
          <span className={styles["table__content--table__body--row__value"]}>
            <a href={`mailto:${value}`}>{value}</a>
          </span>
        );
      case "phone":
        return (
          <span className={styles["table__content--table__body--row__value"]}>
            <a href={`tel:${value}`}>{phoneFormat(value.toString())}</a>
          </span>
        );
      default:
        return null;
    }
  };

  return columnContent;
};

export default useColumnContent;
