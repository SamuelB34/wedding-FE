"use client"
import { useState } from "react";
import styles from "./tables.module.scss";
import { WebTabs } from "@/shared/components/web-tabs/WebTabs";

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
            <img src="./icons/table_icon.png"></img>
            <span>Table 1</span>
          </div>
          <p>2 of 10 seats taken</p>
        </div>
        <div></div>
        <div className={styles.icons}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-chevron-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6E7B70" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M15 11l-3 3l-3 -3" />
              <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z" />
            </svg>
          <nav className={styles.menu}>
          <ul>
            <li><a href="#">Circulo</a></li>
            <li><a href="#">Circulitos</a></li>
          </ul>
        </nav>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6E7B70" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
        </div>
      </div>

    </div>
      
  </>;

}
