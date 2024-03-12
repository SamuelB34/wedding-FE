"use client";
import stylesSelect2 from "./lp-select2.module.scss";
import { ChangeEvent, useEffect, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  id?: string;
  type?: "text" | "number" | "date" | "email";
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
  onBlur?: () => void;
  onFocus?: () => void;
  options: Option[];
  onClickOption: (Option: Option) => void;
  showSuggetions: boolean;
}

export const LpSelect2 = ({
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
  onBlur,
  onFocus,
  pattern,
  maxLength = 100,
  min,
  max,
  options,
  onClickOption,
  showSuggetions,
}: Props) => {
  // Class
  const [inputClass, setInputClass] = useState("input");
  const [errorMsg, setErrorMsg] = useState(<></>);

  // Styles
  const styles = {
    textAlign: text_align,
  };

  useEffect(() => {
    if (error) {
      setInputClass(stylesSelect2["input"] + " " + stylesSelect2["error"]);
      setErrorMsg(
        <span className={stylesSelect2["input__error-msg"]}>
          {" "}
          {error_msg}{" "}
        </span>,
      );
    } else {
      setInputClass(stylesSelect2["input"]);
      setErrorMsg(<></>);
    }
  }, [error, error_msg]);

  // Functions
  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (onChange) onChange(value);
  };

  return (
    <div className={stylesSelect2["body"]}>
      <input
        id={id}
        type={type}
        inputMode={input_mode}
        name={name}
        readOnly={disabled}
        placeholder={placeholder}
        onChange={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={inputClass}
        style={styles}
        value={value}
        pattern={pattern}
        min={min}
        max={max}
        maxLength={maxLength}
      />
      {errorMsg}
      {showSuggetions && (
        <ul className={stylesSelect2["options"]}>
          {options.length ? (
            options.map((option: any) => {
              return (
                <li
                  key={option.value}
                  className={stylesSelect2["options__option"]}
                  onMouseDown={() => {
                    onClickOption(option);
                  }}
                >
                  {option.label}
                </li>
              );
            })
          ) : (
            <li className={stylesSelect2["options__no-option"]}>
              No options found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default LpSelect2;
