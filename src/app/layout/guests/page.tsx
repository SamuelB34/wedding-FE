"use client";
import { ColumnTypes, WebTable } from "@/app/layout/_components/table/WebTable";
import { WebModal } from "@/shared/components/web-modal/WebModal";
import { useState } from "react";
import { form_inputs } from "@/app/layout/guests/form-values";
import styles from "./guests.module.scss";

export default function Guests() {
  const columns: { name: string; label: string; type: ColumnTypes }[] = [
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

  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <WebModal title={"Create Guest"} close={() => setShowModal(!showModal)}>
          <form className={styles["form"]}>
            {form_inputs.map((input) => {
              if (input.type === "select") {
                return (
                  <div key={input.name} className={styles["form__input"]}>
                    <label className={styles["form__input--label"]}>
                      {input.label}
                    </label>
                    <select name={input.name}> {input.label} </select>
                  </div>
                );
              } else {
                return (
                  <div key={input.name} className={styles["form__input"]}>
                    <label className={styles["form__input--label"]}>
                      {input.label}
                    </label>
                    <input type={input.type} name={input.name} />
                  </div>
                );
              }
            })}
          </form>
        </WebModal>
      )}

      <WebTable
        title={"Guests"}
        loading={false}
        sendButton={true}
        columns={columns}
        content={content}
        records={100}
        createClick={() => {
          setShowModal(true);
        }}
        refreshClick={() => {
          console.log("Refreshing");
        }}
        viewAction={(id: string) => {
          console.log(id);
        }}
        editAction={(id: string) => {
          console.log(id);
        }}
        deleteAction={(id: string) => {
          console.log(id);
        }}
        sendClick={(columns) => {
          console.log(columns);
        }}
        deleteClick={(columns) => {
          console.log(columns);
        }}
        viewClick={(view) => {
          console.log(view);
        }}
        searchFunction={(search) => {
          console.log(search);
        }}
      />
    </>
  );
}
