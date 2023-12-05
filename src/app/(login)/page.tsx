"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import WedInput from "@/shared/components/wed-input/WedInput";
import WedButton from "@/shared/components/wed-button/WedButton";

export default function Home() {
  const [loginForm, setLoginForm] = useState({
    email_address: "",
    password: "",
  });
  const submit = (event: any) => {
    event.preventDefault();
    console.log(loginForm);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__content"]}>
        <form className={styles["container__content--form"]} onSubmit={submit}>
          <h1>Welcome back!</h1>

          <span>Log in to your account</span>

          {/*Email input*/}
          <div className={styles["container__content--form__input"]}>
            <label>Email Address</label>
            <WedInput
              name={"email_address"}
              onChange={(value: string) => {
                setLoginForm({
                  ...loginForm,
                  email_address: value,
                });
              }}
            />
          </div>

          {/*Password input*/}
          <div className={styles["container__content--form__input"]}>
            <label>Password</label>
            <WedInput
              name={"email_address"}
              type={"password"}
              onChange={(value: string) => {
                setLoginForm({
                  ...loginForm,
                  password: value,
                });
              }}
            />
          </div>

          <WedButton type={"submit"} style={"basic"}>
            <>Log In</>
          </WedButton>
        </form>
      </div>
    </div>
  );
}
