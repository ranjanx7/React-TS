import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./App.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext";
import { message } from "antd";

message.config({
  top: 80,
  duration: 3,
  maxCount: 3,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
);
