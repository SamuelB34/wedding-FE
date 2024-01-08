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
import {
  createGuest,
  deleteGuest,
  getGuests,
} from "@/shared/services/guestsService";
import { GuestsColumns } from "@/app/layout/guests/columns.guests";
import { WebToast } from "@/shared/components/web-toast/WebToast";

export default function Guests() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"error" | "success">("error");

  const columns: { name: string; label: string; type: ColumnTypes }[] =
    GuestsColumns;

  // Table
  const [tableLoading, setTableLoading] = useState(true);
  const [tableContent, setTableContent] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    ...form_values,
  });
  const [validate, setValidate] = useState<any>({ ...input_validations });

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await createGuest(formValues);
      if (res) {
        setShowModal(false);
        setToastType("success");
        setToastMsg("Guest created successfully!");
        setShowToast(true);
        await getAllGuests();
      }
    } catch (e: any) {
      const error = e.response.data.error;
      setToastType("error");
      setToastMsg(error);
      setShowToast(true);
    } finally {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const getAllGuests = async () => {
    setTableLoading(true);
    try {
      const res = await getGuests();
      if (res.msg === "Success") {
        setTableContent(res.data);
      }
    } catch (e: any) {
      const error = e.response.data.error;
      setToastType("error");
      setToastMsg(error);
      setShowToast(true);
    } finally {
      setTableLoading(false);
    }
  };

  const deleteSingleGuest = async (id: string) => {
    try {
      const res = await deleteGuest(id);
      if (res) {
        setToastType("success");
        setToastMsg("Guest deleted success");
        setShowToast(true);
        await getAllGuests();
      }
    } catch (e: any) {
      const error = e.response.data.error;
      setToastType("error");
      setToastMsg(error);
      setShowToast(true);
    } finally {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const closeToast = () => {
    setShowToast(!showToast);
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
                            ? onlyLetters(value || "").slice(0, 50)
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

      {showToast && (
        <WebToast type={toastType} msg={toastMsg} close={closeToast} />
      )}

      <WebTable
        title={"Guests"}
        loading={tableLoading}
        sendButton={true}
        columns={columns}
        content={tableContent}
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
        deleteAction={async (id: string) => {
          await deleteSingleGuest(id);
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
