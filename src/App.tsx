import styles from './App.module.css'
import { Header } from './components/Header'

export function App() {
  return (
    <main className={styles.main}>
      <Header />
      <h1>Hello World</h1>
    </main>
  )
}
