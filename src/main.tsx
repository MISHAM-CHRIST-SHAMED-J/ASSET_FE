import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-right" richColors closeButton />
    <App />
  </BrowserRouter>
);
