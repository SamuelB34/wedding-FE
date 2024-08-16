"use client";
import { WebTables } from "@/shared/components/web-tables/WebTables";
import { WebGuest } from "@/shared/components/web-guest/WebGuest";

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

  return (
    <>
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
