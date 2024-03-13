export const form_inputs = [
  {
    label: "*Name",
    name: "name",
    type: "text",
  },
  {
    label: "*Guests",
    name: "guests",
    type: "select-2",
  },
];

export const input_requirements: {
  [key: string]: {
    required: boolean;
    min_length?: number;
    is_email?: boolean;
    is_phone?: boolean;
    exact_length?: number;
  };
} = {
  name: {
    min_length: 2,
    required: true,
  },
  guests: {
    required: false,
  },
};

export const form_values = {
  name: "",
  guests: [],
};

export const input_validations = {
  name: {
    error: false,
    msg: "",
    completed: false,
  },
  guests: {
    error: false,
    msg: "",
    completed: true,
  },
};

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];
