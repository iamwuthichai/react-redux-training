import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState("React Training.")

  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

export default App
