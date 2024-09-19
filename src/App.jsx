
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Register from './Pages/Ragester'
import { ToastContainer } from 'react-toastify'
import app from './firebase.config'

function App() {
  const shanto = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
      </Route>
    )
  )


  return (
    <>
    

    <RouterProvider router={shanto}/>
    <ToastContainer />

    </>
  )
}

export default App
