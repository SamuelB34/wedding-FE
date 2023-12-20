import styles from "./web-table.module.scss";
import Image from "next/image";
import { WebTableHeader } from "@/app/layout/_components/table/_components/header/WebTableHeader";
import { WebMobileColumn } from "@/app/layout/_components/table/_components/mobile-column/WebMobileColumn";

export function WebTable() {
  const columns = [
    {
      name: "example_1",
      label: "Example 1",
    },
    {
      name: "example_2",
      label: "Example 2",
    },
    {
      name: "example_3",
      label: "Example 3",
    },
    {
      name: "example_4",
      label: "Example 4",
    },
    {
      name: "example_5",
      label: "Example 5",
    },
    {
      name: "example_6",
      label: "Example 6",
    },
  ];

  const content: any[] = [
    {
      id: 1,
      example_1: "Test",
      example_2: "Test",
      example_3: "Test",
      example_4: "Test",
      example_5: "Test",
      example_6: "Test",
    },
    {
      id: 2,
      example_1: "Test",
      example_2: "Test",
      example_3: "Test",
      example_4: "Test",
      example_5: "Test",
      example_6: "Test",
    },
    {
      id: 3,
      example_1: "Test",
      example_2: "Test",
      example_3: "Test",
      example_4: "Test",
      example_5: "Test",
      example_6: "Test",
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
              <WebMobileColumn />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
