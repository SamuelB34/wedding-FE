import React from "react";
import styles from "./web-guest.module.scss";
import WebButton from "../wed-button/WebButton";

interface Props {
  guest: {
    id: string;
    full_name: string;
    group_name: string | null;
    table_name: string | null;
  }[];
  onClickSeatGuest: (id: string) => void;
}

export function WebGuest({ guest, onClickSeatGuest }: Props) {
  return (
    <div className={styles.container}>
      {
        // Antes estaba con un signo de interrogacion, lo que da a entender que puede que haya
        // ocaciones en las que no vengan "guests", pero en este caso son requeridos, entonces
        // no es necesario agregar esa condicional
        // guest?.map((guest: {
        guest.map(
          (guest: {
            id: string;
            full_name: string;
            group_name: string | null;
            table_name: string | null;
          }) => {
            return (
              <div key={guest.id}>
                <div className={styles.left}>
                  <span className={styles.full_name}>{guest.full_name}</span>
                  <span className={styles.group_name}>
                    {guest.group_name ? guest.group_name : "No group assigned"}
                  </span>
                </div>

                <div></div>

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
          },
        )
      }
    </div>
  );
}
