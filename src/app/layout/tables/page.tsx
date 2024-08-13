"use client"
import { useState } from "react";
import styles from "./tables.module.scss";
import { WebTabs } from "@/shared/components/web-tabs/WebTabs";
import { WebActions } from "@/shared/components/web-actions/WebActions";
import Image from 'next/image';

export default function Tables() {
  const [tabsList, setTabsList] = useState([
    {
      id: 0,
      label: "List",
      active: true
    },
    {
      id: 1,
      label: "Floor Plan",
      active: false
    },
  ])

  const [actionsList, setActionsList] = useState([
    {
      label: "Update",
      name: "Update",
      iconSrc: <Image src={"/components/icons/pencil.svg"} alt={"pencil"} width={16} height={16} />,
      active: false
    },
    {
      label: "Delete",
      name: "Delete",
      iconSrc: <Image src={"/components/icons/trash.svg"} alt={"trash"} width={16} height={16} />,
      active: false,
    },
  ])
  

  return <>
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
              active: false
            }
          })

          // Encuentrame la posicion en donde el id que viene de onTabClick
          // sea igual al id en la lista de tabs
          const index = list_copy.findIndex((tab) =>{
            return tab.id === id
          })

          // Cuando lo encuentres, ponle el active como true
          list_copy[index].active = true

          // Asignale la copia de los tabs, a la variable
          setTabsList([...list_copy])
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
              // Crear copia de la lista de tabs
              let list_copy = [...actionsList];

              // Recorreme la lista, y pon cada tab con el active negativo
              list_copy = list_copy.map((action) => {
                return {
                  ...action,
                  active: false
                }
              })

              // Encuentrame la posicion en donde el id que viene de onTabClick
              // sea igual al id en la lista de tabs
              const index = list_copy.findIndex((action) =>{
                return action.name === name
              })

              // Cuando lo encuentres, ponle el active como true
              list_copy[index].active = true

              // Asignale la copia de los tabs, a la variable
              setActionsList([...list_copy])
            }}
          />
          <img src="/components/icons/dots.svg" alt="" />
        </div>
      </div>
    </div>

  </>;

}
