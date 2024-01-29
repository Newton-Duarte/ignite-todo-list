import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'

export type Todo = {
  id: number
  isCompleted: boolean
  title: string
}

interface TaskProps {
  task: Todo
  onToggleComplete(taskId: number): void
  onDelete(taskId: number): void
}

export function Task({ task, onToggleComplete, onDelete }: TaskProps) {
  return (
    <div className={styles.todo}>
      <button
        type="button"
        className={styles.checkbox}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
      </button>
      <p>{task.title}</p>
      <button
        type="button"
        className={styles.delete}
        onClick={() => onDelete(task.id)}
      >
        <Trash size={18} />
      </button>
    </div>
  )
}
