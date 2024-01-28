import { CheckCircle, Circle, PlusCircle, Trash } from 'phosphor-react'
import styles from './App.module.css'
import { Header } from './components/Header'

export function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles.todoForm}>
          <input
            className={styles.input}
            type="text"
            placeholder="Adicione uma nova tarefa"
          />
          <button className={styles.button} type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <section className={styles.todoList}>
          <div className={styles.todoListHeader}>
            <div>
              <p>Tarefas criadas</p>
              <span>5</span>
            </div>
            <div>
              <p>Concluídas</p>
              <span>2 de 5</span>
            </div>
          </div>

          <div>
            <div className={styles.todo}>
              <button type="button" className={styles.checkbox}>
                <Circle size={24} />
              </button>
              <p>
                Integer urna interdum massa libero auctor neque turpis turpis
                semper. Duis vel sed fames integer.
              </p>
              <button type="button" className={styles.delete}>
                <Trash size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
