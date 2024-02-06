import React from "react";
import logo from "./logo.svg";
import "./App.css";

import AllRoutes from "./Components/Allroutes/AllRoutes";
import Footer from "./Components/Footer";
import { Navbar } from "./Components/Navbar";

function App() {
  return (
    <div className="App bg-primary-500 text-text">
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
