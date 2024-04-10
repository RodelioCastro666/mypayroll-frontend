import { Outlet } from 'react-router-dom'
import { Nav } from '../../components/Nav'

export const Main = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}
