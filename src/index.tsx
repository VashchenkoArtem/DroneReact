import { createRoot } from "react-dom/client"
import { App } from "./app/App";
import { UserContextProvider } from "./context/user-context"; 

const rootDiv = document.getElementById("root") as HTMLElement
const root = createRoot(rootDiv)

root.render(
    <UserContextProvider>
        <App />
    </UserContextProvider>
);