"use client";
import { ColumnTypes, WebTable } from "@/app/layout/_components/table/WebTable";
import { WebModal } from "@/shared/components/web-modal/WebModal";
import { FormEvent, useEffect, useState } from "react";
import {
  colourOptions,
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
import { getGuests } from "@/shared/services/guestsService";
import { WebToast } from "@/shared/components/web-toast/WebToast";
import { useRouter } from "next/navigation";
import { GroupsColumns } from "@/app/layout/groups/columns.groups";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  getTotalCountGroups,
  updateGroup,
} from "@/shared/services/groupsService";
import LpSelect2 from "@/shared/components/web-select-2/lp-select2";
import { useDebounce } from "@/shared/hooks/UseDebounce";
import Select from "react-select/base";

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
  const [tableSortBy, setTableSortBy] = useState("created_by");
  const [tableSortDir, setTableSortDir] = useState("asc");
  const [tableView, setTableView] = useState<string | undefined>(undefined);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({
    ...form_values,
  });
  const [id, setId] = useState("");
  const [searchGuest, setSearchGuest] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [guestsList, setGuestsList] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedGuests, setSelectedGuests] = useState<
    { label: string; value: string }[]
  >([]);
  const [validate, setValidate] = useState<any>({ ...input_validations });

  const getAllGroups = async (params?: {
    p: number;
    pp: number;
    search?: string;
    sort_by?: string;
    sort_order?: string;
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
        setSelectedGuests([]);
        setFormValues({
          ...formValues,
          ["guest"]: [],
        });
        await getAllGroups({
          p: tableP,
          pp: 10,
          search: tableSearch.length ? tableSearch : undefined,
        });
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
        setSelectedGuests([]);
        setFormValues({
          ...formValues,
          ["guest"]: [],
        });
        await getAllGroups({
          p: tableP,
          pp: 10,
          search: tableSearch.length ? tableSearch : undefined,
        });
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
        await getAllGroups({
          p: tableP,
          pp: 10,
          search: tableSearch.length ? tableSearch : undefined,
        });
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

  const getGuestsList = async (search: string) => {
    try {
      let guests = await getGuests({ p: 1, pp: 20, search: search });
      const list = guests.data.map((guest: any) => {
        return {
          label: guest.full_name,
          value: guest._id,
        };
      });
      setGuestsList(list);
    } catch (e) {
      console.log(e);
    }
  };

  const getGrpById = async (id: string) => {
    try {
      const res = await getGroupById(id);
      if (res) {
        const data = res.data;
        setSelectedGuests([...data.guests]);
        setFormValues({
          name: data.name,
          guests: data.guests.map((select: any) => {
            return select.value;
          }),
        });
      }
    } catch (e) {}
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

  const debouncedValue = useDebounce<string>(searchGuest, 800);

  useEffect(() => {
    getGuestsList(debouncedValue);
  }, [debouncedValue]);

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
                      options={guestsList}
                      options_selected={selectedGuests}
                      onFocus={() => {
                        setShowSuggestions(true);
                      }}
                      onBlur={() => setShowSuggestions(false)}
                      onChange={(value) => {
                        setSearchGuest(value);
                      }}
                      onClickOption={(opt) => {
                        const selected = [...selectedGuests];
                        const index = selected.findIndex((select) => {
                          return opt === select;
                        });
                        if (index === -1) {
                          selected.push(opt);
                          setSelectedGuests([...selected]);
                          setFormValues({
                            ...formValues,
                            [input.name]: selected.map((select) => {
                              return select.value;
                            }),
                          });
                        }
                      }}
                      showSuggetions={showSuggestions}
                      onClickRecord={(record) => {
                        const selected = [...selectedGuests];
                        const index = selected.findIndex((select) => {
                          return record === select;
                        });
                        selected.splice(index, 1);
                        setSelectedGuests([...selected]);
                        setFormValues({
                          ...formValues,
                          [input.name]: selected.map((select) => {
                            return select.value;
                          }),
                        });
                      }}
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
        createClick={async () => {
          setSelectedGuests([]);
          setFormValues({
            ...formValues,
            ["guests"]: [],
          });
          setShowModal(true);
          setEditModal(false);
          await getGuestsList("");
        }}
        refreshClick={async () => {
          await getAllGroups();
        }}
        viewAction={async (id: string) => {
          await getAllGroups({
            p: 1,
            pp: 10,
          });
        }}
        editAction={async (data: any) => {
          openModal(data);
          setId(data["_id"]);
          await getGrpById(data["_id"]);
          await getGuestsList("");
        }}
        deleteAction={async (id: string) => {
          setDeleteId(id);
          setShowDeleteModal(true);
        }}
        sendClick={async (columns) => {
          try {
            // const res = await sendWhatsApp();
            // console.log(res);
          } catch (e) {
            console.log(e);
          }
        }}
        deleteClick={(columns) => {
          // console.log(columns);
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
        sortAction={async (column) => {
          await getAllGroups({
            p: 1,
            pp: 10,
            search: tableSearch.length ? tableSearch : undefined,
            sort_by: column,
            sort_order: tableSortDir,
          });
          setTableSortDir(tableSortDir === "asc" ? "desc" : "asc");
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
