import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import configureReduxStore from "./reduxStore/configureStore";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { StyledEngineProvider } from "@mui/material/styles";

const container = document.getElementById("root");
const root = createRoot(container);

const { store, persistor } = configureReduxStore();

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </StyledEngineProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
// root.render(
// <BrowserRouter>
// <MaterialUIControllerProvider>
// <StyledEngineProvider injectFirst>
// <Provider store={store}>
// <PersistGate loading={null} persistor={persistor}>
// <App />
// </PersistGate>
// </Provider>
// </StyledEngineProvider>
// </MaterialUIControllerProvider>
// </BrowserRouter>
// );
