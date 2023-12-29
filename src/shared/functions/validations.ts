export const validations = (
  field: { name: string; label: string },
  value: string,
  input_requirements: {
    [key: string]: {
      required: boolean;
      min_length?: number;
      is_email?: boolean;
      is_phone?: boolean;
      exact_length?: number;
    };
  },
) => {
  const field_check = input_requirements[field.name];

  if (field_check) {
    // Required validation
    if (field_check.required && !value.length) {
      return {
        error: true,
        msg: `${field.label} is required.`,
      };
    }

    // Min length validation
    if (
      field_check.min_length &&
      value.length &&
      value.length < field_check.min_length
    ) {
      return {
        error: true,
        msg: `${field.label} must be min ${field_check.min_length} length.`,
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (field_check.is_email && !emailRegex.test(value)) {
      return {
        error: true,
        msg: `${field.label} must be valid.`,
      };
    }

    // Exact validation
    if (field_check.exact_length && value.length != field_check.exact_length) {
      return {
        error: true,
        msg: `${field.label} must contain ${field_check.exact_length} digits.`,
      };
    }

    // Phone validation
    if (field_check.is_phone) {
      const phoneAux = value
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "")
        .replaceAll("-", "");

      const errorMessage =
        phoneAux.charAt(0) === "0" || phoneAux.charAt(0) === "1"
          ? "Phone numbers cannot begin with 0 or 1."
          : phoneAux.length !== 10
            ? "You must introduce a 10 digits phone number"
            : "";

      return {
        error: errorMessage != "",
        msg: errorMessage,
      };
    }

    return {
      error: false,
      msg: ``,
    };
  } else {
    return {
      error: false,
      msg: ``,
    };
  }
};
