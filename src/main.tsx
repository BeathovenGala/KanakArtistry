
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { initLazyLoading } from "./utils/jQueryLazyLoad.ts";

  createRoot(document.getElementById("root")!).render(<App />);
  
  // Initialize jQuery lazy loading after React renders
  initLazyLoading();
  