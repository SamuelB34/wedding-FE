import styles from "./web-table.module.scss";
import Image from "next/image";
import { WebTableHeader } from "@/app/layout/_components/table/_components/header/WebTableHeader";
import { WebMobileColumn } from "@/app/layout/_components/table/_components/mobile-column/WebMobileColumn";
import { WebChip } from "@/shared/components/web-chip/WebChip";
import { phoneFormat } from "@/shared/functions/format";
import useColumnContent from "@/shared/hooks/UseColumnContent";

export type ColumnTypes = "text" | "email" | "phone" | "boolean";

interface Props {
  loading: boolean;
  sendButton: boolean;

  records: number;
  columns: { name: string; label: string; type: ColumnTypes }[];
  content: any[];
}

export function WebTable() {
  const columns: Props["columns"] = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "phone_number",
      label: "Phone number",
      type: "phone",
    },
    {
      name: "table",
      label: "Table",
      type: "text",
    },
    {
      name: "group",
      label: "Group",
      type: "text",
    },
    {
      name: "saw",
      label: "Saw invitation",
      type: "boolean",
    },
  ];
  const columnContent = useColumnContent();

  const content: any[] = [
    {
      id: 1,
      name: "Samuel Barragan",
      email: "samuel.barragan34@hotmail.com",
      phone_number: "6865782380",
      table: "1",
      group: "Fam. Barragan",
      saw: true,
    },
    {
      id: 2,
      name: "Melissa Araiza",
      email: "melissa@hotmail.com",
      phone_number: "6861161547",
      table: "1",
      group: "Fam. Barragan",
      saw: false,
    },
    {
      id: 3,
      name: "Messi",
      email: "messi_10@hotmail.com",
      phone_number: "6861010101",
      table: "10",
      group: "World Cup Champions",
      saw: true,
    },
  ];

  return (
    <>
      <div className={styles["table"]}>
        <div className={styles["table__content"]}>
          {/*Header*/}
          <WebTableHeader sendButton={true} records={0} loading={true} />

          {/*Tablet/Desktop Table */}
          <table className={styles["table__content--table"]}>
            {/*Table head*/}
            <thead className={styles["table__content--table__head"]}>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                {columns.map((column) => (
                  <th
                    className={styles["table__content--table__head--label"]}
                    key={column.name}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/*Body*/}
            <tbody className={styles["table__content--table__body"]}>
              {/*Map columns */}
              {content.map((item) => (
                <tr
                  key={item.id}
                  className={styles["table__content--table__body--row"]}
                >
                  <td
                    className={
                      styles["table__content--table__body--row__checkbox"]
                    }
                  >
                    <input type="checkbox" />
                  </td>
                  {columns.map((column) => (
                    <td>
                      {columnContent(column.type, item[column.name], styles)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/*Mobile Table */}
          {content.map((item) => (
            <div
              key={item.id}
              className={styles["table__content--table-mobile"]}
            >
              <WebMobileColumn columns={columns} content={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
