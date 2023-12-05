import styles from "./layout.module.scss";
import { ReactNode } from "react";
import { WebHeader } from "@/app/layout/_components/header/WebHeader";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <WebHeader />
      <div className={styles["content"]}>{children}</div>
    </>
  );
}
