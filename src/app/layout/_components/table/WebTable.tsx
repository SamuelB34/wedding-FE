import styles from "./web-table.module.scss";
import Image from "next/image";
import { WebTableHeader } from "@/app/layout/_components/table/_components/header/WebTableHeader";
import { WebMobileColumn } from "@/app/layout/_components/table/_components/mobile-column/WebMobileColumn";
import useColumnContent from "@/shared/hooks/UseColumnContent";
import { useState } from "react";

export type ColumnTypes = "text" | "email" | "phone" | "boolean" | "array";

interface Props {
  title: string;
  loading: boolean;
  sendButton?: boolean;

  records: number;
  columns: { name: string; label: string; type: ColumnTypes }[];
  content: any[];
  sendClick?: (columns: any[]) => void;
  deleteClick?: (columns: any[]) => void;
  refreshClick?: () => void;
  createClick?: () => void;
  viewClick?: (view: string) => void;
  searchFunction?: (view: string) => void;
  viewAction?: (id: string) => void;
  editAction?: (id: string) => void;
  deleteAction?: (id: string) => void;
}

export function WebTable({
  title,
  loading = true,
  sendButton = false,
  records,
  columns,
  content,
  sendClick,
  deleteClick,
  refreshClick,
  createClick,
  viewClick,
  searchFunction,
  viewAction,
  editAction,
  deleteAction,
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
        columns.push(item["_id"].toString());
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
            title={title}
            createClick={createClick}
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
            selectAll={selectAll}
          />

          {/*Tablet/Desktop Table */}
          <table className={styles["table__content--table"]}>
            {/*Table head*/}
            <thead className={styles["table__content--table__head"]}>
              {!loading ? (
                // No loading
                <tr>
                  <th>
                    <input type="checkbox" onChange={selectAll} />
                  </th>
                  {columns.map((column) => (
                    <th
                      className={styles["table__content--table__head--label"]}
                      key={column.name}
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className={styles["table__content--table__head--label"]}>
                    Actions
                  </th>
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
              {!loading && content.length ? (
                <>
                  {content.map((item) => (
                    <tr
                      key={item["_id"]}
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
                            selectColumn(item["_id"].toString());
                          }}
                          checked={
                            columnsSelected.some(
                              (value) => value === item["_id"].toString(),
                            ) || false
                          }
                        />
                      </td>
                      {columns.map((column) => (
                        <td key={column.name}>
                          {columnContent(
                            column.type,
                            item[column.name] || "",
                            styles,
                          )}
                        </td>
                      ))}
                      <td
                        className={styles["table__content--table__head--label"]}
                      >
                        <div
                          className={
                            styles[
                              "table__content--table__head--label__actions"
                            ]
                          }
                        >
                          <Image
                            className={
                              styles[
                                "table__content--table__head--label__actions--img"
                              ]
                            }
                            src={"/components/table/eye.svg"}
                            alt={"eye"}
                            width={24}
                            height={24}
                            onClick={() => {
                              if (viewAction) viewAction(item["_id"]);
                            }}
                          />
                          <Image
                            className={
                              styles[
                                "table__content--table__head--label__actions--img"
                              ]
                            }
                            src={"/components/table/pencil.svg"}
                            alt={"edit"}
                            width={16}
                            height={16}
                            onClick={() => {
                              if (editAction) editAction(item["_id"]);
                            }}
                          />
                          <Image
                            className={
                              styles[
                                "table__content--table__head--label__actions--img"
                              ]
                            }
                            src={"/components/table/header/trash.svg"}
                            alt={"delete"}
                            width={24}
                            height={24}
                            onClick={() => {
                              if (deleteAction) deleteAction(item["_id"]);
                            }}
                          />
                        </div>
                      </td>
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
          {!loading && content.length ? (
            <>
              {content.map((item) => (
                <div
                  key={item["_id"]}
                  className={styles["table__content--table-mobile"]}
                >
                  <WebMobileColumn
                    columns={columns}
                    content={item}
                    loading={loading}
                    selected={columnsSelected.some(
                      (value) => value === item["_id"].toString(),
                    )}
                    onChange={(value) => {
                      selectColumn(value.id.toString());
                    }}
                    viewAction={(id: string) => {
                      if (viewAction) viewAction(id);
                    }}
                    editAction={(id: string) => {
                      if (editAction) editAction(id);
                    }}
                    deleteAction={(id: string) => {
                      if (deleteAction) deleteAction(id);
                    }}
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
                    selected={false}
                    onChange={() => {}}
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
