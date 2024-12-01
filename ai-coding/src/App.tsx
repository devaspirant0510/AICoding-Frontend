import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';
import './App.css'
import {Button} from "primereact/button";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className={'text-copink text-2xl '}>dd</div>
        <div className={'text-4xl text-cogreen'}>hello</div>
        <Button>a</Button>
    </>
  )
}

export default App
