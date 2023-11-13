import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoButton from './TodoButton/TodoButton'

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<number>(0)

  useEffect(() => {
    document.title = `Vous avez cliqué ${todos} fois`
  }, [todos]);

  const validateAge = () => {
    const age = Number((document.getElementById('age-input') as HTMLInputElement).value);
    if (age < 18) {
      document.getElementById("text-age")!.innerHTML = "Vous êtes mineur";
    } else {
      document.getElementById("text-age")!.innerHTML = "Vous êtes majeur";
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <TodoButton label='Ajouter' onClick={() => setTodos(todos+1)} />
      <TodoButton label='Retirer' onClick={() => todos>0 ? setTodos(todos-1) : alert("Impossible de descendre en dessous de 0")} />
      <TodoButton label='Reset' onClick={() => setTodos(0)} />
      <p>Nombre de todos : {todos}</p>
      <input id='age-input' type="number" placeholder="Entrez votre age"/>
      <TodoButton label='Valider' onClick={validateAge} />
      <p id='text-age'>Entrez un age pour voir votre minorité/majorité</p>
    </>
  )
}

export default App
