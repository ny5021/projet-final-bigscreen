import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/index.css";
import "./assets/css/reset.css";
import "./assets/css/app.css";
import "./assets/modules/bootstrap.js";

// AdminKit (required)
import "./assets/modules/bootstrap";
import "./assets/modules/theme";
import "./assets/modules/feather";

// Forms
import "./assets/modules/flatpickr";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
