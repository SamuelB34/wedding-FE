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
  getTotalCount,
  updateGuest,
} from "@/shared/services/guestsService";
import { GuestsColumns } from "@/app/layout/guests/columns.guests";
import { WebToast } from "@/shared/components/web-toast/WebToast";
import { useRouter } from "next/navigation";

export default function Guests() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"error" | "success">("error");

  const columns: { name: string; label: string; type: ColumnTypes }[] =
    GuestsColumns;

  // Table
  const [tableLoadingNoHeader, setTableLoadingNoHeader] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableCount, setTableCount] = useState(0);
  const [tableP, setTableP] = useState(1);
  const [tableContent, setTableContent] = useState<any[]>([]);
  const [tableSearch, setTableSearch] = useState<string>("");
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    ...form_values,
  });
  const [id, setId] = useState("");
  const [validate, setValidate] = useState<any>({ ...input_validations });

  const getAllGuests = async (params?: {
    p: number;
    pp: number;
    search?: string;
  }) => {
    if (params && params.search?.length) {
      setTableLoadingNoHeader(true);
      setTableLoading(true);
    } else {
      setTableLoadingNoHeader(false);
      setTableLoading(true);
    }
    try {
      const res = await getGuests(params);
      if (res.msg === "Success") {
        const data = res.data.map((value: any) => {
          return {
            ...value,
            name: `${value.first_name} ${
              value.middle_name ? `${value.middle_name} ` : ""
            }${value.last_name}`,
          };
        });
        setTableContent(data);

        const res_count = await getTotalCount(params?.search);
        setTableCount(res_count.data.total_count);
      }
    } catch (e: any) {
      const error = e.response.data.error;
      if (e && e.response.status === 401) {
        localStorage.clear();
        router.push("/");
      }
      setToastType("error");
      setToastMsg(error);
      setShowToast(true);
    } finally {
      if (params && params.search?.length) {
        setTableLoadingNoHeader(false);
        setTableLoading(false);
      } else {
        setTableLoading(false);
      }
    }
  };

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
      setEditModal(false);
      formatForm();
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const updateForm = async (event: FormEvent, id: string) => {
    event.preventDefault();
    try {
      const res = await updateGuest(id, formValues);
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
      setEditModal(false);
      formatForm();
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const formatForm = () => {
    const keys = Object.keys(formValues);

    let value = {
      ...formValues,
    };

    for (const key of keys) {
      value[key] = "";
    }
    setFormValues(value);
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

  const openModal = (data: any) => {
    const keys = Object.keys(formValues);

    let value = {
      ...formValues,
    };
    for (const key of keys) {
      value[key] = data[key];
    }

    setEditModal(true);
    setFormValues(value);
    setShowModal(true);
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
              editModal ? updateForm(event, id) : submitForm(event);
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
                      input_mode={
                        input.type === "phone"
                          ? "tel"
                          : input.type === "email"
                            ? "email"
                            : "text"
                      }
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
              <> {editModal ? "Edit" : "Create"} </>
            </WebButton>
          </form>
        </WebModal>
      )}

      {showToast && (
        <WebToast type={toastType} msg={toastMsg} close={closeToast} />
      )}

      <WebTable
        title={"Guests"}
        p={tableP}
        loading={tableLoading}
        loadingNoHeader={tableLoadingNoHeader}
        sendButton={true}
        columns={columns}
        content={tableContent}
        records={tableCount}
        createClick={() => {
          setShowModal(true);
          setEditModal(false);
        }}
        refreshClick={() => {
          console.log("Refreshing");
        }}
        viewAction={(id: string) => {
          console.log(id);
        }}
        editAction={(data: any) => {
          openModal(data);
          setId(data["_id"]);
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
        searchFunction={async (search) => {
          if (search.length) {
            await getAllGuests({
              p: 1,
              pp: 30,
              search: search,
            });
            setTableSearch(search);
          } else {
            await getAllGuests();
          }
        }}
        paginationAction={async (page: number) => {
          await getAllGuests({
            p: page,
            pp: 30,
            search: tableSearch.length ? tableSearch : undefined,
          });
          setTableP(page);
        }}
      />
    </>
  );
}
