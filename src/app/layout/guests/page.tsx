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
  getGuestById,
  getGuests,
  getTotalCount,
  updateGuest,
} from "@/shared/services/guestsService";
import { GuestsColumns } from "@/app/layout/guests/columns.guests";
import { WebToast } from "@/shared/components/web-toast/WebToast";
import { useRouter } from "next/navigation";
import { getGroups } from "@/shared/services/groupsService";

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
  const [tableView, setTableView] = useState<string | undefined>(undefined);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    ...form_values,
  });
  const [id, setId] = useState("");
  const [validate, setValidate] = useState<any>({ ...input_validations });
  const [groupOptions, setGroupOptions] = useState<any>([]);

  const getAllGuests = async (params?: {
    p: number;
    pp: number;
    search?: string;
    filter?: string;
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
            created_by_name: value.created_by["username"],
          };
        });
        setTableContent(data);

        const res_count = await getTotalCount(params?.search, params?.filter);
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
      setDeleteId("");
      setShowDeleteModal(false);
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
    setShowModal(true);
  };

  const getGuestData = async (id: string) => {
    try {
      const res = await getGuestById(id);
      if (res) {
        const data = res.data;
        setFormValues({
          first_name: data["first_name"],
          middle_name: data["middle_name"],
          last_name: data["last_name"],
          email_address: data["email_address"],
          phone_number: data["email_address"],
          group: data.group ? data.group["value"] : "",
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getGroupsList = async () => {
    try {
      const res = await getGroups({
        p: 1,
        pp: 50,
      });
      if (res) {
        const data = res.data;
        setGroupOptions(
          data.map((datum: any) => {
            return {
              label: datum.name,
              value: datum["_id"],
            };
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllGuests();
  }, []);

  useEffect(() => {
    if (!showModal) {
      formatForm();
    }
  }, [showModal]);

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
                    <select
                      name={input.name}
                      value={formValues[input.name]}
                      onChange={(event) => {
                        const text = event.target.value;
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
                    >
                      <option value=""> Assign later </option>
                      {groupOptions.map((opt: any) => (
                        <option value={opt.value} key={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
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

            <WebButton type={"submit"} style={"basic"} loading={loading}>
              <> {editModal ? "Edit" : "Create"} </>
            </WebButton>
          </form>
        </WebModal>
      )}

      {showDeleteModal && (
        <WebModal
          title={"Delete Guest"}
          close={() => setShowDeleteModal(!showDeleteModal)}
        >
          <div className={styles["delete-modal"]}>
            <span className={styles["delete-modal__txt"]}>
              Are you sure you want to delete this guest? <br /> This action
              cannot be <b>undone</b>
            </span>

            <div className={styles["delete-modal__buttons"]}>
              <WebButton
                type={"button"}
                style={"outlined"}
                onClick={() => {
                  setDeleteId("");
                  setShowDeleteModal(false);
                }}
              >
                <>Cancel</>
              </WebButton>
              <WebButton
                type={"button"}
                style={"basic"}
                onClick={async () => {
                  await deleteSingleGuest(deleteId);
                }}
              >
                <>Delete</>
              </WebButton>
            </div>
          </div>
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
        showViews={true}
        columns={columns}
        content={tableContent}
        records={tableCount}
        createClick={async () => {
          setShowModal(true);
          setEditModal(false);
          setLoading(true);
          await getGroupsList();
          setLoading(false);
        }}
        refreshClick={async () => {
          await getAllGuests();
        }}
        viewAction={async (id: string) => {
          await getAllGuests({
            p: 1,
            pp: 10,
            filter: id,
          });
        }}
        editAction={async (data: any) => {
          setLoading(true);
          setId(data["_id"]);
          openModal(data);
          await getGroupsList();
          await getGuestData(data["_id"]);
        }}
        deleteAction={async (id: string) => {
          setDeleteId(id);
          setShowDeleteModal(true);
        }}
        sendClick={async (columns) => {
          console.log(columns);
          try {
            // const res = await sendWhatsApp();
            // console.log(res);
          } catch (e) {
            console.log(e);
          }
        }}
        deleteClick={(columns) => {
          console.log(columns);
        }}
        viewClick={async (view) => {
          await getAllGuests({
            p: 1,
            pp: 10,
            filter: view,
          });
          setTableView(view);
          setTableP(1);
        }}
        searchFunction={async (search) => {
          if (search.length) {
            await getAllGuests({
              p: 1,
              pp: 10,
              search: search,
              filter: tableView,
            });
            setTableSearch(search);
            setTableP(1);
          } else {
            await getAllGuests();
            setTableSearch("");
          }
        }}
        paginationAction={async (page: number) => {
          await getAllGuests({
            p: page,
            pp: 10,
            search: tableSearch.length ? tableSearch : undefined,
            filter: tableView,
          });
          setTableP(page);
        }}
      />
    </>
  );
}
