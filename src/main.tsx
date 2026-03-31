import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Provider store={undefined}>
          <PersistGate>
            <MantineProvider>
              <App />
            </MantineProvider>
          </PersistGate>
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
);
