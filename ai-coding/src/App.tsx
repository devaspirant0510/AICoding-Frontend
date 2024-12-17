import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';
import './App.css'
import {Button} from "primereact/button";
import {Navigate} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Navigate to={"/home"}>
    </Navigate>
  )
}

export default App
