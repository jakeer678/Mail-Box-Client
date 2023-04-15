import React, { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import List from "@mui/material/List";
import IosShareIcon from "@mui/icons-material/IosShare";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { contextStore } from "../UseContext/ContextStore";
import { Button, IconButton } from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

let sidebarList = [
  { Compose: <AttachEmailIcon /> },
  { Inbox: <ForwardToInboxIcon /> },
  { Starred: <IosShareIcon /> },
  { Send: <DraftsIcon /> },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const SideBar = () => {
  const theme = useTheme();

  const { openDrawer, handleDrawerClose,handleClickOpen } = useContext(contextStore);

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
        <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
          {sidebarList.map((item, index) => (
            <div key={index}>
              <div>{item.Compose} </div>
              <div>
                <NavLink to="/inbox"> {item.Inbox}</NavLink>
              </div>
              <div>{item.Starred} </div>
              <div>{item.Send} </div>
            </div>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={openDrawer}>
        <DrawerHeader />
      </Main>
    </div>
  );
};

export default SideBar;
