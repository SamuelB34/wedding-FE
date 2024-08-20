import styles from "./web-actions.module.scss"

interface Props {
  actions:{
    label: string, 
    name: string, 
    iconSrc: string,
    active: boolean,
    }[]
  onActionClick?: (name: string) => void
}

export function WebActions({ actions, onActionClick }: Props) {
  return (
    <div className={styles.actions}>
      {
        actions.map((action: {
          label: string,
          name: string,
          iconSrc: string,
          active: boolean,
        }) => {
          return (
          <div 
           key={action.name} 
             className={
               action.active ? 
               styles.container_active :
               styles.container_inactive
            }
            onClick={() => {
              if(onActionClick) onActionClick(action.name)
            }}
          > 
            <div className={action.active ? styles.action_active : styles.action_inactive}>
            <div className={styles.container_display}>
              <span>{action.label}</span>
              <span>{action.iconSrc}</span>
            </div>
            
            </div>
          </div>
          )
        })
      }
      
    </div>
  )
}