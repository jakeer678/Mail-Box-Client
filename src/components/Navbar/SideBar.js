// import { Button } from "@mui/material";
// import React, { useContext } from "react";
// import { contextStore } from "../UseContext/ContextStore";

// const SideBar = () => {
//   const { handleClickOpen } = useContext(contextStore);
//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         compose
//       </Button>
//     </div>
//   );
// };

// export default SideBar;

import React, { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import List from "@mui/material/List";
import IosShareIcon from "@mui/icons-material/IosShare";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { contextStore } from "../UseContext/ContextStore";
import { IconButton } from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const SideBar = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const theme = useTheme();
  const total = useSelector((state) => state.mailBox.mails);
  const totalNum = total.length;
  const { openDrawer, handleDrawerClose, handleClickOpen } =
    useContext(contextStore);

  const getData = async () => {
    const email = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    console.log(email, "kkkk");

    try {
      const response = await fetch(
        `https://mailbox-2ed6d-default-rtdb.firebaseio.com/${email}.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data ");
      }

      const data = await response.json();
      console.log(data, "ssss");

      let count = 0;
      for (let key in data) {
        if (!data[key].read) {
          count++;
        }
      }
      setUnreadCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
        <button onClick={handleClickOpen}>Compose</button>
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
          <div>
            <NavLink to="/inbox">
              <AttachEmailIcon />
              Inbox {totalNum}({unreadCount} unread)
            </NavLink>
          </div>
          <div>
            <NavLink to="/sentmail">
              <IosShareIcon />
              Sent mail
            </NavLink>
          </div>
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <Main open={openDrawer}>
        <DrawerHeader />
      </Main>
    </div>
  );
};

export default SideBar;
