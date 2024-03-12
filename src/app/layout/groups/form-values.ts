export const form_inputs = [
  {
    label: "*Name",
    name: "first_name",
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
  first_name: {
    min_length: 2,
    required: true,
  },
  middle_name: {
    min_length: 2,
    required: false,
  },
  last_name: {
    min_length: 2,
    required: true,
  },
  email_address: {
    is_email: true,
    required: true,
  },
  phone_number: {
    is_phone: true,
    required: true,
  },
  group: {
    min_length: 2,
    required: false,
  },
  table: {
    min_length: 2,
    required: false,
  },
};

export const form_values = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email_address: "",
  phone_number: "",
  group: "",
  table: "",
};

export const input_validations = {
  first_name: {
    error: false,
    msg: "",
    completed: false,
  },
  middle_name: {
    error: false,
    msg: "",
    completed: true,
  },
  last_name: {
    error: false,
    msg: "",
    completed: false,
  },
  email_address: {
    error: false,
    msg: "",
    completed: false,
  },
  phone_number: {
    error: false,
    msg: "",
    completed: false,
  },
  group: {
    error: false,
    msg: "",
    completed: true,
  },
  table: {
    error: false,
    msg: "",
    completed: true,
  },
};
