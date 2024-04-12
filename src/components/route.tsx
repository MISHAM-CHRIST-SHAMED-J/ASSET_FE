import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PrintIcon from "@mui/icons-material/Print";
import HistoryIcon from "@mui/icons-material/History";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const dropList = [
  {
    link: "/Dashboard",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    link: "/Employee",
    name: "Employee",
    icon: <PersonIcon />,
  },
  {
    link: "/Asset",
    name: "Asset",
    icon: <PrintIcon />,
  },
  {
    link: "/AssetAssignment",
    name: "AssetAssignment",
    icon: <AssignmentIcon />,
  },
  {
    link: "/Scrap",
    name: "Scrap",
    icon: <DeleteIcon />,
  },
  {
    link: "/AssetHistory",
    name: "AssetHistory",
    icon: <HistoryIcon />,
  },
];
