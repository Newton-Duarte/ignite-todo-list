import { ClipboardText, PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'
import { Task, Todo } from './components/Task'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import styles from './App.module.css'
import { zodResolver } from '@hookform/resolvers/zod'

const taskFormSchema = z.object({
  title: z.string().min(3, 'Mínimo de 3 caracteres'),
})

type TaskFormInputs = z.infer<typeof taskFormSchema>

export function App() {
  const [tasks, setTasks] = useState<Todo[]>([])

  const completedTasks = tasks.filter((task) => task.isCompleted)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
    },
  })

  function handleCreateTask(data: TaskFormInputs) {
    const lastTask = tasks[0]

    setTasks((state) => [
      {
        id: lastTask ? lastTask.id + 1 : 1,
        title: data.title,
        isCompleted: false,
      },
      ...state,
    ])

    reset()
  }

  function handleToggleCompleteTask(taskId: number) {
    const newTasks = tasks.map((task) => {
      return {
        ...task,
        isCompleted: task.id === taskId ? !task.isCompleted : task.isCompleted,
      }
    })

    setTasks(newTasks)
  }

  function handleDeleteTask(taskId: number) {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form
          onSubmit={handleSubmit(handleCreateTask)}
          className={styles.todoForm}
        >
          <input
            className={styles.input}
            type="text"
            placeholder="Adicione uma nova tarefa"
            {...register('title')}
          />
          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <section className={styles.todoList}>
          <div className={styles.todoListHeader}>
            <div>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>
            <div>
              <p>Concluídas</p>
              <span>
                {tasks.length
                  ? `${completedTasks.length} de ${tasks.length}`
                  : completedTasks.length}
              </span>
            </div>
          </div>

          <div>
            {tasks.length ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleCompleteTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <div className={styles.emptyList}>
                <ClipboardText size={56} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
