import { AppRoutes } from "@/routes"
import { AuthProvider } from "@/context"

import "./App.css"

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
