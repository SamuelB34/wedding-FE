import styles from "./tables.module.scss";

export default function Tables() {
  return <> 
    <div className={styles.frame}>

      <div className={styles.Title}>
          <h2>Tables</h2>
          <p>10 tables full</p>
      </div>

      <div className={styles.container}>
          <a href="#">List</a>
          <a href="#">Floor Plan</a>
      </div>

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

    <script src="menu.js"></script>
  
  </>;

}
