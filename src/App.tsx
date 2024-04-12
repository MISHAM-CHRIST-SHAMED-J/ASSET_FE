import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavbarPage from "./components/navbar";
import DashboardPage from "./components/dashboard";
import AssetPage from "./pages/asset";
import AssignmentPage from "./pages/assignment.tsx";
import ScrapPage from "./pages/scrap/index.tsx";
import HistoryPage from "./pages/history/index.tsx";
import EmployeeDashboard from "./pages/employee";
import AddEmployee from "./pages/employee/addEmployee/index.tsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavbarPage />}>
          <Route path="/Dashboard" element={<DashboardPage />} />
          <Route path="/Employee" element={<EmployeeDashboard />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/Asset" element={<AssetPage />} />
          <Route path="/AssetAssignment" element={<AssignmentPage />} />
          <Route path="/Scrap" element={<ScrapPage />} />
          <Route path="/AssetHistory" element={<HistoryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
