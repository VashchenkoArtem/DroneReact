import { AppRouter } from './app-router';
import { UserContextProvider } from "../context/user-context";
import { OrderProviderContext } from "../context/order-context"
import { CartContextProvider } from "../context/cart-context";

export function App() {
  return (
    <UserContextProvider>
        <CartContextProvider>
          <OrderProviderContext>
              <AppRouter />
          </OrderProviderContext>
        </CartContextProvider>
    </UserContextProvider>
  )
}