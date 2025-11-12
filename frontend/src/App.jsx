
import {Routes, Route, Navigate} from 'react-router-dom'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import RefreshHandler from './components/RefreshHandler'

function App() {

  const [isAuth,setIsAuth] = useState(false)

  const PrivateRouting = ({element})=>{
    return isAuth ? element : <Navigate to={"/login"}></Navigate>
  }

  return (
    <>
    <RefreshHandler setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}> </Route>
        <Route path='/signup' element={ <Signup/> }></Route>
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/home' element={ <PrivateRouting element={ <Home /> }/>}></Route>
      </Routes>
       <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
}

export default App
