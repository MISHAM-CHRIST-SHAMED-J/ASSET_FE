import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardPage from "./dashboard";
import { dropList } from "./route";
import LogoutIcon from "@mui/icons-material/Logout";
import { Popover } from "@mui/material";
import logoImg from "../assets/logo.webp";
import loginImg from "../assets/login.png";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth: number = 230;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function NavbarPage() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color="inherit">
          <Toolbar
            sx={{
              pr: "24px",
              display: "flex",
              justifyContent: "space-between",
              ...(open && { justifyContent: "flex-end" }),
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div>
              <span onClick={handleClick}>
                <img
                  width={30}
                  height={36}
                  src={loginImg}
                  alt=""
                  onClick={() => {}}
                />
              </span>
              <Popover
                id={id}
                open={openPop}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 1.5 }} className="flexCen">
                  <PersonIcon fontSize="small" />
                  &nbsp; PROFILE
                </Typography>
                <Divider />
                <Typography
                  sx={{ p: 1.5 }}
                  className="flexCen"
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  {" "}
                  <LogoutIcon fontSize="small" /> &nbsp; LOGOUT
                </Typography>
              </Popover>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            height: "100vh",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img src={logoImg} width="50px" height="50px" alt="" />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List
            className="navigationBox"
            component="nav"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {dropList.map((item: any, index: any) => {
              return (
                <Link
                  key={index}
                  to={item?.link}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <ListItemButton
                    sx={{
                      background:
                        location.pathname === item?.link
                          ? "#bdbdbd"
                          : "inherit",
                    }}
                  >
                    <ListItemIcon>{item?.icon}</ListItemIcon>
                    <ListItemText primary={item?.name} />
                  </ListItemButton>
                </Link>
              );
            })}
          </List>
          <Divider />
          <Link to={""} style={{ textDecoration: "none", color: "black" }}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: [0],
                width: "100%",
                fontWeight: "lighter",
                fontSize: "15px",
                color: "gray",
              }}
            >
              <p>Elsha Tech &copy; Copyright {new Date().getFullYear()}</p>
            </Toolbar>
          </Link>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {location.pathname === "/" ? <DashboardPage /> : <Outlet />}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
