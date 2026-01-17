import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.sass'
import './styles/responsive.sass'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SupportScreen from './components/SupportScreen.jsx'
import Login from './sections/LoginScreen.jsx'
import Home from './sections/HomeNoticia.jsx'
import HomeAdmin from './sections/HomeAdmin.jsx'
import Notice from './sections/CadastrarNoticia.jsx'
// import Approve from './sections/NoticiaAdmin.jsx'
import NoticiaUsuario from './sections/NoticiaUsuario.jsx'
import NoticiaAdmin from './sections/NoticiaAdmin.jsx'
import { UsuarioProvider } from './context/UsuarioContext.jsx'
import SuccessMessage from './components/SuccessMessage.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import Categories from './components/Categories.jsx'
import Register from './sections/Register.jsx'
import ComentarioAdmin from './components/ComentarioAdmin.jsx'
import ComentarioUser from './components/ComentarioUser.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><UsuarioProvider><SuccessMessage /><ErrorMessage /><SupportScreen/><Login/></UsuarioProvider></>,
  },
  {
    element: <App/>,
    children:
      [
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'HomeAdmin',
          element: <HomeAdmin />
        },
        {
          path: 'notice',
          element: <Notice/>
        },
        {
          path: 'noticia/:id',
          element: <NoticiaUsuario />
        },
        {
          path: 'noticiaAdmin/:id',
          element: <NoticiaAdmin />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: "comentarioAdmin",
          element: <ComentarioAdmin />
        },
        ,
        {
          path: "comentarioUser",
          element: <ComentarioUser />
        }
      ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
