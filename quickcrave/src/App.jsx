// import { useState } from 'react'
import Home from "./screen/Home.jsx";
import{
BrowserRouter as Router,
Routes,
Route
} from "react-router-dom";
import Login from './screen/Login.jsx';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
      </Routes>
    </div>
    </Router>  
  )
}

export default App
