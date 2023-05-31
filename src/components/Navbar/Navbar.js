import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authSliceActions } from "../store/AuthSlice";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";
import { contextStore } from "../UseContext/ContextStore";
import { AppBar } from "@mui/material";
import SideBar from "./SideBar";
import AlertDialog from "../MailBox/AlertDialog";

export default function Navbar() {
  const { handleDrawerOpen } = useContext(contextStore);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const isLogin = useSelector((state) => state.auth.idToken);

  const logout = () => {
    dispatch(authSliceActions.logout());
    redirect("/login");
  };

  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {isLogin && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              color="white"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <NavLink to="/" className="link">
                Home
              </NavLink>
            </Typography>

            {isLogin && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink to="/mailbox" className="link">
                  MailBox
                </NavLink>
              </Typography>
            )}

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {!isLogin && (
                <Button color="inherit">
                  <NavLink to="/login" className="link">
                    Login
                  </NavLink>
                </Button>
              )}
            </Typography>

            {isLogin && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button color="inherit" onClick={logout}>
                  <NavLink to="/login" className="link">
                    Logout
                  </NavLink>
                </Button>
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <div>
          <SideBar />
        </div>
        <AlertDialog />
      </Box>
    </div>
  );
}
