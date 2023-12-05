"use client";
import "./wed-input.scss";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  name: string;
  id?: string;
  type?: "text" | "number" | "date" | "email" | "password";
  input_mode?:
    | "text"
    | "email"
    | "search"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  text_align?: "left" | "center";
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  error_msg?: string;
  pattern?: string;
  onChange?: (text: string) => void;
  onInputFocus?: () => void;
  onInputFocusOut?: () => void;
  selectType?: { value: string; label: string }[];
  defaultValueType?: string;
  onChangeType?: (text: string) => void;
  isCentered?: boolean;
}

export const WedInput = ({
  name,
  id,
  type = "text",
  input_mode = "text",
  text_align = "left",
  placeholder,
  value,
  disabled = false,
  error = false,
  error_msg,
  onChange,
  pattern,
  maxLength = 100,
  min,
  onInputFocus,
  max,
  onInputFocusOut,
  selectType = [],
  isCentered = false,
}: Props) => {
  // Class
  const [inputClass, setInputClass] = useState(
    isCentered ? "input__centered" : "input",
  );

  // Styles
  const styles = {
    textAlign: text_align,
  };

  useEffect(() => {
    let stylesString = "input";
    if (input_mode === "tel") stylesString += " " + "tel";
    if (selectType.length > 0) stylesString += " " + "select_type";
    if (disabled) stylesString += " " + "disabled";
    if (error) {
      stylesString += " " + "error";
    }
    setInputClass(stylesString);
  }, [error, input_mode, disabled]);

  // Functions
  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (onChange) onChange(value);
  };

  return (
    <div className={"body"}>
      <div className={"body__container"}>
        {input_mode === "tel" && (
          <div className={"body__container__tel"}>
            <span>+1</span>
          </div>
        )}
        <input
          id={id}
          type={type}
          inputMode={input_mode}
          name={name}
          readOnly={disabled}
          placeholder={placeholder}
          onChange={onInputChange}
          className={inputClass}
          style={styles}
          value={value}
          pattern={pattern}
          min={min}
          max={max}
          onBlur={onInputFocusOut}
          maxLength={maxLength}
          onFocus={onInputFocus}
        />
      </div>
      {error && <span className="input__error-msg"> {error_msg} </span>}
    </div>
  );
};

export default WedInput;
