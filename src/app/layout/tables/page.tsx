"use client";
import { useState } from "react";
import styles from "./tables.module.scss";
import { WebTabs } from "@/shared/components/web-tabs/WebTabs";
import { WebActions } from "@/shared/components/web-actions/WebActions";
import { WebGuest } from "@/shared/components/web-guest/WebGuest";
import Image from "next/image";
import { log } from "util";

export default function Tables() {
  const [tabsList, setTabsList] = useState([
    {
      id: 0,
      label: "List",
      active: true,
    },
    {
      id: 1,
      label: "Floor Plan",
      active: false,
    },
  ]);

  // Aqui lo que se requiere es el src solamente, por lo que no es necesario inyectar
  // todo el componente <Image />, nada mas el string
  const [actionsList, setActionsList] = useState([
    {
      label: "Update",
      name: "Update",
      iconSrc: "/components/icons/pencil.svg",
      active: false,
    },
    {
      label: "Delete",
      name: "Delete",
      iconSrc: "/components/icons/trash.svg",
      active: false,
    },
  ]);

  const [guestsList, setGuestsList] = useState([
    {
      id: "1",
      full_name: "John Doe",
      group_name: null,
      table_name: null,
    },
  ]);

  return (
    <>
      <div className={styles.frame}>
        <div className={styles.Title}>
          <h2>Tables</h2>
          <p>10 tables full</p>
        </div>

        <WebTabs
          tabs={tabsList}
          onTabClick={(id) => {
            // Crear copia de la lista de tabs
            let list_copy = [...tabsList];

            // Recorreme la lista, y pon cada tab con el active negativo
            list_copy = list_copy.map((tab) => {
              return {
                ...tab,
                active: false,
              };
            });

            // Encuentrame la posicion en donde el id que viene de onTabClick
            // sea igual al id en la lista de tabs
            const index = list_copy.findIndex((tab) => {
              return tab.id === id;
            });

            // Cuando lo encuentres, ponle el active como true
            list_copy[index].active = true;

            // Asignale la copia de los tabs, a la variable
            setTabsList([...list_copy]);
          }}
        />

        <div className={styles.tableContainer}>
          <div className={styles.tableContainerText}>
            <div>
              <span>Table 1</span>
            </div>
            <p>2 of 10 seats taken</p>
          </div>
          <div></div>
          <div className={styles.icons}>
            <img src="/components/icons/chevron.svg" alt="" />
            <WebActions
              actions={actionsList}
              onActionClick={(name) => {
                // Crear copia de la lista de actions
                let list_copy = [...actionsList];

                // Encuentrame la posicion en donde el id que viene de onTabClick
                // sea igual al id en la lista de tabs
                const index = list_copy.findIndex((action) => {
                  return action.name === name;
                });

                // Cuando lo encuentres, ponle el active como true
                list_copy[index].active = true;

                // Asignale la copia de los tabs, a la variable
                setActionsList([...list_copy]);
              }}
            />
            <img src="/components/icons/dots.svg" alt="" />

            <WebGuest
              guest={guestsList}
              onClickSeatGuest={(id) => console.log(id)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
