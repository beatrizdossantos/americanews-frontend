import SupportScreen from './components/SupportScreen.jsx'
import Navbar from './components/Navbar.jsx'
import Categories from './components/Categories.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import SuccessMessage from './components/SuccessMessage.jsx'
import { Outlet } from 'react-router-dom'
import { UsuarioProvider } from './context/UsuarioContext.jsx'
import { NoticiaProvider } from './context/NoticiaContext.jsx'
import './styles/responsive.sass'

function App() {

  return (
    <div id="americanews">
      <UsuarioProvider>
      <NoticiaProvider>
        <ErrorMessage />
        <SuccessMessage />
        <SupportScreen />
        <Navbar />
        <Categories />
        <Outlet/>
      </NoticiaProvider>
      </UsuarioProvider>
      
    </div>
  )
}

export default App
