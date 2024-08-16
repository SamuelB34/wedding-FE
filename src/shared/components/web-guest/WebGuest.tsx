import React from "react";
import styles from "./web-guest.module.scss";
import WebButton from "../wed-button/WebButton";

interface Props {
  // Aqui fue mi error, no tenia que ser array, una disculpa jeje
  guest: {
    id: string;
    full_name: string;
    group_name: string | null;
    table_name: string | null;
  };
  onClickSeatGuest: (id: string) => void;
}

export function WebGuest({ guest, onClickSeatGuest }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.left__name}>
          {/*Habia hecho falta agregar esto de aqui*/}
          <div className={styles.initial}>
            {/*Aqui le digo que tome la primera letra del nombre*/}
            <span>{guest.full_name.charAt(0)}</span>
          </div>
          <span className={styles.full_name}>{guest.full_name}</span>
        </div>
        <span className={styles.group_name}>
          {guest.group_name ? guest.group_name : "No group assigned"}
        </span>
      </div>

      <div className={styles.right}>
        <span className={styles.table_name}>
          {guest.table_name ? guest.table_name : "No table assigned"}
        </span>
        <WebButton
          type={"submit"}
          style={"basic"}
          onClick={() => {
            if (onClickSeatGuest) onClickSeatGuest(guest.id);
          }}
        >
          <>Seat Guest</>
        </WebButton>
      </div>
    </div>
  );
}
