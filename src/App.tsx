import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavbarPage from "./components/navbar";
import DashboardPage from "./components/dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarPage />}>
          <Route path="/Dashboard" element={<DashboardPage />} />
          <Route path="/Employee" element={<DashboardPage />} />
          <Route path="/Asset" element={<DashboardPage />} />
          <Route path="/AssetAssignment" element={<DashboardPage />} />
          <Route path="/Scrap" element={<DashboardPage />} />
          <Route path="/AssetHistory" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
