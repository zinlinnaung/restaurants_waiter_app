import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OrderPage from "./pages/OrderPage";
import KitchenDashboard from "./pages/KitchenDashboard";
import KitchenLogin from "./pages/KitchenLogin";
import WaiterLogin from "./pages/WaiterLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return <OrderPage/>;
}

export default App;
