import { AppRouter } from './app-router';
import { UserContextProvider } from "../context/user-context";


export function App() {
  return (
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>

  )
}