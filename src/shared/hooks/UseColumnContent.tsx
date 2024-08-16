import React from "react";
import { phoneFormat } from "@/shared/functions/format";
import { WebChip } from "@/shared/components/web-chip/WebChip";
import { ColumnTypes } from "@/app/layout/_components/table/WebTable";

const useColumnContent = () => {
  const cutWords = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength - 3) + "...";
    }
  };

  const columnContent = (
    column_type: ColumnTypes,
    value: string | boolean | number | any,
    styles: any, // Agrega estilos como argumento si los necesitas
    full_name?: string,
    id?: string,
  ) => {
    switch (column_type) {
      case "array":
        return (
          <span className={styles["table__content--table__body--row__value"]}>
            {value.length ? value[0] : ""}
          </span>
        );
      case "array-2":
        return (
          <span className={styles["table__content--table__body--row__value"]}>
            {value.length
              ? cutWords(value.toString().replaceAll(",", ", "), 60)
              : ""}
          </span>
        );
      case "text":
        return (
          <span className={styles["table__content--table__body--row__value"]}>
            {value || ""}
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
            <a
              href={`https://api.whatsapp.com/send?phone=${value}&text=Hola%20${full_name}!%0A%0A¡En%20el%20link%20encontrarás%20los%20detalles%20de%20nuestra%20boda!.%20%0A%0A${process.env.NEXT_PUBLIC_SAVE_THE_DATE_URL}${id}%0A%0ADentro%20de%20este,%20podrás%20encontrar%20tu%20recepción.%20%0ACualquier%20duda%20o%20pregunta%20estamos%20al%20pendiente%20%3AD%20%0A%0ANOS%20VEMOS%20PRONTO!%0A%0AAtte.%20Samuel%20y%20Melissa`}
              target={"_blank"}
            >
              {phoneFormat(value.toString())}
            </a>
          </span>
        );
      default:
        return null;
    }
  };

  return columnContent;
};

export default useColumnContent;
