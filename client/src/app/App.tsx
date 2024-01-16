import { AppRoutes } from '@/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, ModalProvider } from '@/context'

import './App.css'

const queryClient = new QueryClient()

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ModalProvider>
						<AppRoutes />
					</ModalProvider>
				</AuthProvider>
			</QueryClientProvider>
		</>
	)
}

export default App
