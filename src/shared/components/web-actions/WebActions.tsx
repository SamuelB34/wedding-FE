import styles from "./web-actions.module.scss"

interface Props {
  actions:{
    id: number,
    label: string, 
    name: string, 
    iconSrc: string
    active: false
    }[]
  onActionClick?: (id: number) => void
}

export function WebActions({ actions, onActionClick }: Props) {
  return (
    <div className={styles.actions}>
      {
        actions.map((action: {
          id: number
          label: string
          name: string
          iconSrc: string
          active: false
        }) => {
          return (
          <div 
           key={action.id} 
             className={
                action.active ? 
                styles.container_active 
              : styles.container_inactive
            }
            onClick={() => {
              if(onActionClick) onActionClick(action.id)
            }}
          >
            <span
              className={action.active ? styles.action_active : styles.action_inactive}
            >
              {action.label}
            </span>
          </div>
          )
        })
      }
      
    </div>
  )
}