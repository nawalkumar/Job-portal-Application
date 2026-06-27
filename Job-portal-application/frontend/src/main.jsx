import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

// Secure cookie handshake configuration
axios.defaults.withCredentials = true;
const persistor = persistStore(store);

// updating with google Auth 2.0 provider
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="955181141972-9t4is974hqbepc92d39fa5io9kec9esf.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);