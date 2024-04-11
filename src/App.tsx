import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Main } from './layouts/Main'
import { Dashboard } from './pages/Dashboard'
import { Employees } from './pages/Employees'
import { RequireAuth } from './components/RequireAuth'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} >

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

      </Route>
      <Route element={<RequireAuth />} > 
        <Route path='/' element={<Home />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='Employees' element={<Employees />} />
        </Route>
      </Route>
      
      
      
    </Routes>
  )
}
