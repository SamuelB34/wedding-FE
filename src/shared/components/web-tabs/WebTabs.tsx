import styles from "./web-tabs.module.scss"

interface Props {
  tabs: {
    id: number
    active: boolean,
    label: string,
  }[]
  onTabClick?: (id: number) => void
}

export function WebTabs({ tabs, onTabClick }: Props) {
  return (
    <div className={styles.tabs}>
      {
        tabs.map((tab: {
          id: number,
          active: boolean,
          label: string
        }) => {
          return (
          <div 
            key={tab.id} 
            className={
              tab.active ? 
                styles.container_active 
              : styles.container_inactive
            }
            onClick={() => {
              if(onTabClick) onTabClick(tab.id)
            }}
          >
            <span
              className={tab.active ? styles.tab_active : styles.tab_inactive}
            >
              {tab.label}
            </span>
          </div>
          )
        })
      }
      
    </div>
  )
}
