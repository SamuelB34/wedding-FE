import { ColumnTypes } from "@/app/layout/_components/table/WebTable";

export const GuestsColumns: {
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
    type: "text",
  },
  {
    name: "created_by_name",
    label: "Created by",
    type: "text",
  },
  {
    name: "saw_invitation",
    label: "Saw invitation",
    type: "boolean",
  },
  {
    name: "answer",
    label: "Answered",
    type: "boolean",
  },
  {
    name: "assist",
    label: "Assist",
    type: "boolean",
  },
];
