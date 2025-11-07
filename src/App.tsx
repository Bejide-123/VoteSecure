import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import LoginPage from './Pages/Login'
import RegistrationPage from './Pages/Register'
import { RegisterProvider } from './Context/RegisterContext'

const App = () => {
  return (
    <RegisterProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
      </Routes>
    </RegisterProvider>
  )
}

export default App
