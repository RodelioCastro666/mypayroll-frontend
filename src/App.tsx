import { AuthProvider } from "./auth/AuthProvider"
import { Routes } from "./Routes"


export const App = () => {
  return (
     
      <AuthProvider >
        <Routes />
      </AuthProvider>
    
  )
}
