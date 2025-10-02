import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "@/app/ui";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
