"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import WedInput from "@/shared/components/wed-input/WedInput";
import WebButton from "@/shared/components/wed-button/WebButton";
import { getUserById, login, verifyToken } from "@/shared/services/authService";
import { useRouter } from "next/navigation";
import { WebToast } from "@/shared/components/web-toast/WebToast";

export default function Home() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("token");

    if (id) {
      const verify = verifyToken(id);

      if (verify.status === "Succeed") {
        console.log("BYE");
        router.push("/layout/guests");
      } else {
        console.log("HELLO");
        localStorage.clear();
      }
    }
  }, []);

  const closeToast = () => {
    setShowToast(!showToast);
  };

  const submit = async (event: any) => {
    setLoginLoading(true);
    event.preventDefault();
    try {
      const res = await login(loginForm);
      if (res.msg === "Success") {
        await localStorage.setItem("token", res.data.jwt);
        const verify = verifyToken(res.data.jwt);
        if (verify.status === "Succeed") router.push("/layout/guests");
      }
    } catch (e: any) {
      setShowToast(true);
      setToastMsg(e?.response?.data?.error || "Server Error");
      closeAutomaticToast();
      console.log(e);
    } finally {
      setLoginLoading(false);
    }
  };

  const closeAutomaticToast = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className={styles["container"]}>
      {showToast && (
        <WebToast type={"error"} msg={toastMsg} close={closeToast} />
      )}

      <div className={styles["container__content"]}>
        <form className={styles["container__content--form"]} onSubmit={submit}>
          <h1 className={styles["container__content--form__title"]}>
            Welcome back!
          </h1>

          <span className={styles["container__content--form__label"]}>
            Log in to your account
          </span>

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
