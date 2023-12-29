"use client";
import { ColumnTypes, WebTable } from "@/app/layout/_components/table/WebTable";
import { WebModal } from "@/shared/components/web-modal/WebModal";
import { FormEvent, useEffect, useState } from "react";
import {
  form_inputs,
  form_values,
  input_requirements,
  input_validations,
} from "@/app/layout/guests/form-values";
import styles from "./guests.module.scss";
import WebButton from "@/shared/components/wed-button/WebButton";
import WebInput from "@/shared/components/web-input/WebInput";
import { onlyLetters } from "@/shared/functions/format";
import { validations } from "@/shared/functions/validations";
import { createGuest, getGuests } from "@/shared/services/guestsService";

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

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    ...form_values,
  });
  const [validate, setValidate] = useState<any>({ ...input_validations });

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formValues);
    const res = await createGuest(formValues);
    if (res) {
      setShowModal(false);
    }
  };

  const getAllGuests = async () => {
    const x = await getGuests();
    console.log(x);
  };

  useEffect(() => {
    getAllGuests();
  }, []);

  return (
    <>
      {showModal && (
        <WebModal title={"Create Guest"} close={() => setShowModal(!showModal)}>
          <form
            className={styles["form"]}
            onSubmit={(event) => {
              submitForm(event);
            }}
          >
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
                    <WebInput
                      name={input.name}
                      value={formValues[input.name]}
                      error={validate[input.name].error}
                      error_msg={validate[input.name].msg}
                      onChange={(value: string) => {
                        const text =
                          input.type === "text"
                            ? onlyLetters(value).slice(0, 50)
                            : value;
                        setFormValues({ ...formValues, [input.name]: text });
                        setValidate({
                          ...validate,
                          [input.name]: {
                            ...validations(
                              { name: input.name, label: input.label },
                              text,
                              input_requirements,
                            ),
                            completed: !!text,
                          },
                        });
                      }}
                    />
                  </div>
                );
              }
            })}

            <WebButton type={"submit"} style={"basic"}>
              <> Create </>
            </WebButton>
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
