import styles from "./web-toast.module.scss";
import Image from "next/image";

interface Props {
  type: "error" | "success";
  msg: string;
  close: () => void;
}

export function WebToast({ type, msg, close }: Props) {
  return (
    <>
      <div className={styles[`toast-${type}`]}>
        <div className={styles["toast-container"]}>
          {type === "success" ? (
            <Image
              src={"/components/toast/success.svg"}
              alt={"success"}
              width={32}
              height={32}
            />
          ) : (
            <Image
              src={"/components/toast/error.svg"}
              alt={"error"}
              width={32}
              height={32}
            />
          )}

          <span className={styles[`toast-${type}__label`]}>{msg}</span>

          <Image
            src={"/components/toast/x.svg"}
            alt={"error"}
            width={32}
            height={32}
            className={styles[`toast-${type}__x`]}
            onClick={close}
          />
        </div>
      </div>
    </>
  );
}
