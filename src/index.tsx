import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./firebase/config";


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
);

reportWebVitals();
