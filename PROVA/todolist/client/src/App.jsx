import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './page/Home/Home';
import User from './page/User/User';
import Tarefas from './page/Tarefas/Tarefas';
import ListTarefas from './page/ListTarefas/ListTarefas';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={ <Home/>}/>
          <Route path='/register_user' exact element={ <User/>}/>
          <Route path='/register_tarefas' exact element={ <Tarefas/>}/>
          <Route path='/listar_tarefas' exact element={ <ListTarefas/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
