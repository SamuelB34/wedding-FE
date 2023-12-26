import styles from "./web-table.module.scss";
import Image from "next/image";
import { WebTableHeader } from "@/app/layout/_components/table/_components/header/WebTableHeader";
import { WebMobileColumn } from "@/app/layout/_components/table/_components/mobile-column/WebMobileColumn";
import { WebChip } from "@/shared/components/web-chip/WebChip";
import { phoneFormat } from "@/shared/functions/format";
import useColumnContent from "@/shared/hooks/UseColumnContent";
import { useEffect, useState } from "react";

export type ColumnTypes = "text" | "email" | "phone" | "boolean";

interface Props {
  loading: boolean;
  sendButton?: boolean;

  records: number;
  columns: { name: string; label: string; type: ColumnTypes }[];
  content: any[];
  sendClick?: (columns: any[]) => void;
  deleteClick?: (columns: any[]) => void;
  refreshClick?: () => void;
  viewClick?: (view: string) => void;
  searchFunction?: (view: string) => void;
}

export function WebTable({
  loading = true,
  sendButton = false,
  records,
  columns,
  content,
  sendClick,
  deleteClick,
  refreshClick,
  viewClick,
  searchFunction,
}: Props) {
  const columnContent = useColumnContent();
  const [columnSelected, setColumnSelected] = useState<boolean>(false);
  const [columnsSelected, setColumnsSelected] = useState<any[]>([]);

  const selectColumn = (column: string) => {
    const selected = columnsSelected.findIndex((value: string) => {
      return value === column;
    });
    let columns = [...columnsSelected];

    if (selected === -1) {
      columns.push(column);
    } else {
      columns.splice(selected, 1);
    }
    setColumnsSelected(columns);
  };

  const selectAll = () => {
    if (!columnSelected) {
      let columns: any[] = [];
      content.map((item) => {
        console.log();
        columns.push(item["id"].toString());
      });
      setColumnsSelected(columns);
    } else {
      setColumnsSelected([]);
    }
    setColumnSelected(!columnSelected);
  };

  return (
    <>
      <div className={styles["table"]}>
        <div className={styles["table__content"]}>
          {/*Header*/}
          <WebTableHeader
            sendButton={sendButton}
            records={records}
            loading={loading}
            columnsSelected={columnsSelected}
            deleteClick={() => {
              if (deleteClick) deleteClick(columnsSelected);
            }}
            sendClick={() => {
              if (sendClick) sendClick(columnsSelected);
            }}
            viewClick={(view) => {
              if (viewClick) viewClick(view);
            }}
            refreshClick={refreshClick}
            searchFunction={(value) => {
              if (searchFunction) searchFunction(value);
            }}
          />

          {/*Tablet/Desktop Table */}
          <table className={styles["table__content--table"]}>
            {/*Table head*/}
            <thead className={styles["table__content--table__head"]}>
              {!loading ? (
                // No loading
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={selectAll}
                      checked={columnSelected}
                    />
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
              ) : (
                // Loading
                <tr>
                  <th>
                    <input type="checkbox" disabled />
                  </th>
                  {Array.from("123456").map((value) => (
                    <th
                      className={styles["table__content--table__head--label"]}
                      key={value}
                    >
                      <div
                        className={
                          styles["table__content--table__head--label-loading"]
                        }
                      >
                        <div className={styles["skeleton"]}></div>
                      </div>
                    </th>
                  ))}
                </tr>
              )}
            </thead>

            {/*Body*/}
            <tbody className={styles["table__content--table__body"]}>
              {/*Map columns */}
              {!loading ? (
                <>
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
                        <input
                          type="checkbox"
                          onChange={() => {
                            selectColumn(item["id"].toString());
                          }}
                          checked={columnsSelected.some(
                            (value) => value === item["id"].toString(),
                          )}
                        />
                      </td>
                      {columns.map((column) => (
                        <td key={column.name}>
                          {columnContent(
                            column.type,
                            item[column.name],
                            styles,
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {Array.from("123").map((item) => (
                    <tr
                      key={item}
                      className={styles["table__content--table__body--row"]}
                    >
                      <td
                        className={
                          styles["table__content--table__body--row__checkbox"]
                        }
                      >
                        <input type="checkbox" disabled />
                      </td>
                      {Array.from("123456").map((column) => (
                        <td
                          className={
                            styles["table__content--table__body--row__content"]
                          }
                          key={column}
                        >
                          <div
                            className={
                              styles[
                                "table__content--table__head--label-loading"
                              ]
                            }
                            style={{
                              margin: "8px 6px",
                            }}
                          >
                            <div className={styles["skeleton"]}></div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>

          {/*Mobile Table */}
          {!loading ? (
            <>
              {content.map((item) => (
                <div
                  key={item.id}
                  className={styles["table__content--table-mobile"]}
                >
                  <WebMobileColumn
                    columns={columns}
                    content={item}
                    loading={loading}
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {Array.from("123456").map((item) => (
                <div
                  key={item}
                  className={styles["table__content--table-mobile"]}
                >
                  <WebMobileColumn
                    columns={columns}
                    content={item}
                    loading={loading}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
