import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./firebase/config";
import { getAuth } from "firebase/auth";

import { BrowserRouter } from "react-router-dom";

import { store } from './store/store'
import { Provider } from 'react-redux'



const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
);

reportWebVitals();
