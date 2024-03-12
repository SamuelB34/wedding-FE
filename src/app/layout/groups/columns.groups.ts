import { ColumnTypes } from "@/app/layout/_components/table/WebTable";

export const GroupsColumns: {
  name: string;
  label: string;
  type: ColumnTypes;
}[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "guests",
    label: "Guests",
    type: "array-2",
  },
  {
    name: "created_by_name",
    label: "Created by",
    type: "text",
  },
];
