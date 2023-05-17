import { AppRoutes } from "./routes/AppRoutes"
import { AuthProvider } from "./context"

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
