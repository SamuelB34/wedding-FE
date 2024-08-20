"use client";
import { WebTables } from "@/shared/components/web-tables/WebTables";
import { WebGuest } from "@/shared/components/web-guest/WebGuest";
import { WebActions } from "@/shared/components/web-actions/WebActions";
import Image from "next/image";


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
      iconSrc: <img src="/components/icons/pencil.svg" alt="" />,
      active: false,
    },
    {
      label: "Delete",
      name: "Delete",
      iconSrc: <img src="/components/icons/trash.svg" alt="" />,
      active: false,
    }
  ];
  return (
    <>
      {actionsList.map((action) => {
        return (
          <WebActions
            key={action.name}
            actions={actionsList}
            onActionClick={(name) => {
              console.log(name);
            }}
          />
        );
      })}

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
