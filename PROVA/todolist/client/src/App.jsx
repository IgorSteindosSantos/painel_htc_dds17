import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './page/Home/Home';
import User from './page/User/User';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={ <Home/>}/>
          <Route path='/register_user' exact element={ <User/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
