import { AppRoutes } from "@/routes"
import { AuthProvider, ModalProvider } from "@/context"

import "./App.css"

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <AppRoutes />
        </ModalProvider>
      </AuthProvider>
    </>
  )
}

export default App
