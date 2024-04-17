import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavbarPage from "./components/navbar";
import DashboardPage from "./components/dashboard";
import AssetPage from "./pages/asset";
import ScrapPage from "./pages/scrap/index.tsx";
import HistoryPage from "./pages/history/index.tsx";
import EmployeeDashboard from "./pages/employee";
import AddEmployee from "./pages/employee/addEmployee/index.tsx";
import AddAsset from "./pages/asset/addasset/index.tsx";
import AssetCategory from "./pages/assetcategory/index.tsx";
import IssuedDashboard from "./pages/issueasset/index.tsx";
import ReturnAsset from "./pages/returnasset/index.tsx";
import AddIssueAsset from "./pages/issueasset/addissueasset/index.tsx";
import AddAssetScrap from "./pages/scrap/addscrap/index.tsx";
import LoginPage from "./pages/login/index.tsx";
import RegisterPage from "./pages/register/index.tsx";
import ForgotPasswordPage from "./pages/forgotpassword/index.tsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/ForgetPassword" element={<ForgotPasswordPage />} />
        <Route path="/" element={<NavbarPage />}>
          <Route path="/Dashboard" element={<DashboardPage />} />
          <Route path="/Employee" element={<EmployeeDashboard />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/Asset" element={<AssetPage />} />
          <Route path="/AddAsset" element={<AddAsset />} />
          <Route path="/AssetCategory" element={<AssetCategory />} />
          <Route path="/IssueAsset" element={<IssuedDashboard />} />
          <Route path="/AddIssueAsset" element={<AddIssueAsset />} />
          <Route path="/ReturnAsset" element={<ReturnAsset />} />
          <Route path="/Scrap" element={<ScrapPage />} />
          <Route path="/AddScrap" element={<AddAssetScrap />} />
          <Route path="/AssetHistory" element={<HistoryPage />} />
        </Route>
        <Route path="*" element={<NavbarPage />} />
      </Routes>
    </>
  );
}

export default App;
