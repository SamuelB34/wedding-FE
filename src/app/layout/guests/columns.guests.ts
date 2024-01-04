import { ColumnTypes } from "@/app/layout/_components/table/WebTable";

export const GuestsColumns: {
  name: string;
  label: string;
  type: ColumnTypes;
}[] = [
  {
    name: "first_name",
    label: "First Name",
    type: "text",
  },
  {
    name: "middle_name",
    label: "Middle Name",
    type: "text",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
  },
  {
    name: "email_address",
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
    type: "array",
  },
  {
    name: "group",
    label: "Group",
    type: "array",
  },
  {
    name: "saw_invitation",
    label: "Saw invitation",
    type: "boolean",
  },
  {
    name: "assist",
    label: "Assist",
    type: "boolean",
  },
];
