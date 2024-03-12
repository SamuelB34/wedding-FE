"use client";
import { ColumnTypes, WebTable } from "@/app/layout/_components/table/WebTable";
import { WebModal } from "@/shared/components/web-modal/WebModal";
import { FormEvent, useEffect, useState } from "react";
import {
  form_inputs,
  form_values,
  input_requirements,
  input_validations,
} from "@/app/layout/groups/form-values";
import styles from "./guests.module.scss";
import WebButton from "@/shared/components/wed-button/WebButton";
import WebInput from "@/shared/components/web-input/WebInput";
import { onlyLetters } from "@/shared/functions/format";
import { validations } from "@/shared/functions/validations";
import {
  createGuest,
  deleteGuest,
  updateGuest,
} from "@/shared/services/guestsService";
import { WebToast } from "@/shared/components/web-toast/WebToast";
import { useRouter } from "next/navigation";
import { GroupsColumns } from "@/app/layout/groups/columns.groups";
import {
  createGroup,
  deleteGroup,
  getGroups,
  getTotalCountGroups,
  updateGroup,
} from "@/shared/services/groupsService";
import LpSelect2 from "@/shared/components/web-select-2/lp-select2";

export default function Guests() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"error" | "success">("error");

  const columns: { name: string; label: string; type: ColumnTypes }[] =
    GroupsColumns;

  // Table
  const [tableLoadingNoHeader, setTableLoadingNoHeader] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableCount, setTableCount] = useState(0);
  const [tableP, setTableP] = useState(1);
  const [tableContent, setTableContent] = useState<any[]>([]);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [tableView, setTableView] = useState<string | undefined>(undefined);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    ...form_values,
  });
  const [id, setId] = useState("");
  const [validate, setValidate] = useState<any>({ ...input_validations });

  const getAllGroups = async (params?: {
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
      const res = await getGroups(params);
      if (res.msg === "Success") {
        const data = res.data;
        setTableContent(data);

        const res_count = await getTotalCountGroups(params?.search);
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
      const res = await createGroup(formValues);
      if (res) {
        setShowModal(false);
        setToastType("success");
        setToastMsg("Guest created successfully!");
        setShowToast(true);
        await getAllGroups();
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
      const res = await updateGroup(id, formValues);
      if (res) {
        setShowModal(false);
        setToastType("success");
        setToastMsg("Guest created successfully!");
        setShowToast(true);
        await getAllGroups();
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

  const deleteSingleGroup = async (id: string) => {
    try {
      const res = await deleteGroup(id);
      if (res) {
        setToastType("success");
        setToastMsg("Group deleted success");
        setShowToast(true);
        await getAllGroups();
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
    setFormValues(value);
    setShowModal(true);
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  return (
    <>
      {showModal && (
        <WebModal
          title={editModal ? "Update Group" : "Create Group"}
          close={() => setShowModal(!showModal)}
        >
          <form
            className={styles["form"]}
            onSubmit={(event) => {
              editModal ? updateForm(event, id) : submitForm(event);
            }}
          >
            {form_inputs.map((input) => {
              if (input.type === "select-2") {
                return (
                  <div key={input.name} className={styles["form__input"]}>
                    <label className={styles["form__input--label"]}>
                      {input.label}
                    </label>
                    <LpSelect2
                      name={"guests"}
                      onChange={() => {}}
                      options={[]}
                      onClickOption={() => {}}
                      showSuggetions={false}
                    />
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

      {showDeleteModal && (
        <WebModal
          title={"Delete Guest"}
          close={() => setShowDeleteModal(!showDeleteModal)}
        >
          <div className={styles["delete-modal"]}>
            <span className={styles["delete-modal__txt"]}>
              Are you sure you want to delete this group? <br /> This action
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
                  await deleteSingleGroup(deleteId);
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
        title={"Groups"}
        p={tableP}
        loading={tableLoading}
        loadingNoHeader={tableLoadingNoHeader}
        sendButton={true}
        columns={columns}
        content={tableContent}
        showViews={false}
        records={tableCount}
        createClick={() => {
          setShowModal(true);
          setEditModal(false);
        }}
        refreshClick={async () => {
          await getAllGroups();
        }}
        viewAction={async (id: string) => {
          await getAllGroups({
            p: 1,
            pp: 10,
          });
          console.log(id);
        }}
        editAction={(data: any) => {
          openModal(data);
          setId(data["_id"]);
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
          await getAllGroups({
            p: 1,
            pp: 10,
          });
          setTableView(view);
          setTableP(1);
        }}
        searchFunction={async (search) => {
          if (search.length) {
            await getAllGroups({
              p: 1,
              pp: 10,
              search: search,
            });
            setTableSearch(search);
            setTableP(1);
          } else {
            await getAllGroups();
            setTableSearch("");
          }
        }}
        paginationAction={async (page: number) => {
          await getAllGroups({
            p: page,
            pp: 10,
            search: tableSearch.length ? tableSearch : undefined,
          });
          setTableP(page);
        }}
      />
    </>
  );
}
