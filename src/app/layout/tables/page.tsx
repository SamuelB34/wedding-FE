"use client";
import { WebTables } from "@/shared/components/web-tables/WebTables";
import { WebGuest } from "@/shared/components/web-guest/WebGuest";
import { WebActions } from "@/shared/components/web-actions/WebActions";
import Image from "next/image";
import { useEffect } from "react";
import { getGroups } from "@/shared/services/tablesService";

export default function Tables() {
  const guestLis = [
    {
      id: "abcd1234",
      full_name: "John Doe",
      group_name: "Doe Family",
      table_name: null,
    },
    {
      id: "abcd1235",
      full_name: "John Doe",
      group_name: "Doe Family",
      table_name: null,
    },
    {
      id: "abcd1236",
      full_name: "John Doe",
      group_name: "Doe Family",
      table_name: null,
    },
  ];

  const actionsList = [
    {
      label: "Update",
      name: "Update",
      iconSrc: "/components/icons/pencil.svg",
      active: false,
    },
    {
      label: "Delete",
      name: "Delete",
      iconSrc: "/components/icons/trash.svg",
      active: false,
    },
  ];

  const getAllTables = async () => {
    const res = await getGroups();
    console.log(res);
  };

  useEffect(() => {
    getAllTables();
  }, []);

  return (
    <>
      <WebActions
        actions={actionsList}
        onActionClick={(name) => {
          console.log(name);
        }}
      />

      <WebTables records={10} loading={false} />

      {guestLis.map((guest) => {
        return (
          <WebGuest
            key={guest.id}
            guest={guest}
            onClickSeatGuest={(id) => {
              console.log(id);
            }}
          />
        );
      })}
    </>
  );
}
