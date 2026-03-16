import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import axios from "axios";
import { useEffect } from "react";


import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
axios.defaults.withCredentials = true;
const persistor = persistStore(store);
// Add this logic to persist bookmarks across refreshes
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
