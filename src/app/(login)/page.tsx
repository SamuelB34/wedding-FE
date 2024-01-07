"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import WedInput from "@/shared/components/wed-input/WedInput";
import WebButton from "@/shared/components/wed-button/WebButton";
import { login, verifyToken } from "@/shared/services/authService";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);

  const router = useRouter();

  const submit = async (event: any) => {
    setLoginLoading(true);
    event.preventDefault();
    try {
      const res = await login(loginForm);
      if (res.msg === "Success") {
        localStorage.setItem("token", res.data.jwt);
        verifyToken(res.data.jwt);
        router.push("/layout/guests");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__content"]}>
        <form className={styles["container__content--form"]} onSubmit={submit}>
          <h1>Welcome back!</h1>

          <span>Log in to your account</span>

          {/*Email input*/}
          <div className={styles["container__content--form__input"]}>
            <label>Username</label>
            <WedInput
              name={"username"}
              onChange={(value: string) => {
                setLoginForm({
                  ...loginForm,
                  username: value,
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

          <WebButton type={"submit"} style={"basic"} loading={loginLoading}>
            <>Log In</>
          </WebButton>
        </form>
      </div>
    </div>
  );
}
