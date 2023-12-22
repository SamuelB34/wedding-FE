import styles from "./web-table.module.scss";
import Image from "next/image";
import { WebTableHeader } from "@/app/layout/_components/table/_components/header/WebTableHeader";
import { WebMobileColumn } from "@/app/layout/_components/table/_components/mobile-column/WebMobileColumn";

export function WebTable() {
  const columns = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "phone_number",
      label: "Phone number",
    },
    {
      name: "table",
      label: "Table",
    },
    {
      name: "group",
      label: "Group",
    },
    {
      name: "saw",
      label: "Saw invitation",
    },
  ];

  const content: any[] = [
    {
      id: 1,
      name: "Samuel Barragan",
      email: "samuel.barragan34@hotmail.com",
      phone_number: "686 578 2380",
      table: "1",
      group: "Fam. Barragan",
      saw: "yes",
    },
    {
      id: 2,
      name: "Melissa Araiza",
      email: "melissa@hotmail.com",
      phone_number: "686 116 1547",
      table: "1",
      group: "Fam. Barragan",
      saw: "Yes",
    },
    {
      id: 3,
      name: "Messi",
      email: "messi_10@hotmail.com",
      phone_number: "686 101 0101",
      table: "10",
      group: "World Cup Champions",
      saw: "Yes",
    },
  ];

  return (
    <>
      <div className={styles["table"]}>
        <div className={styles["table__content"]}>
          <WebTableHeader />

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
                    <td
                      className={
                        styles["table__content--table__body--row__value"]
                      }
                    >
                      {item[column.name]}
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
