import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GlobalStyle } from "./styles/global";
import { ThemeContext } from "./contexts/ThemeContext";
import { ThemeProvider } from "styled-components";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
