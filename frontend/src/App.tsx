import TodoList from './components/TodoList';
import styles from './App.module.css';

function App() {
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <TodoList />
      </div>
    </main>
  );
}

export default App;
