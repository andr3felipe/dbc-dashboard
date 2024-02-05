import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.tsx";
import { AddressContextProvider } from "./contexts/AddressContext.tsx";
import { ContactContextProvider } from "./contexts/ContactContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <AddressContextProvider>
      <ContactContextProvider>
        <App />
      </ContactContextProvider>
    </AddressContextProvider>
  </ThemeContextProvider>
);
