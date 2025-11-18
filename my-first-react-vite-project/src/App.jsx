import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main>
    <Navbar />
    <div className="bg-blue-100 h-screen flex justify-center items-center">
      Main page
    </div>

    </main>
  );
}

export default App;
