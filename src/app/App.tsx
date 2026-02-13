import { AppRouter } from './app-router';
import { UserContextProvider } from "../context/user-context";
import { OrderProviderContext } from "../context/order-context"

export function App() {
  return (
    <UserContextProvider>
      <OrderProviderContext>
        <AppRouter />
      </OrderProviderContext>
    </UserContextProvider>
  )
}