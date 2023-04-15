import React from "react";
import { contextStore } from "./ContextStore";

const ContextProvider = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <contextStore.Provider
      value={{
        open: open,
        handleClickOpen: handleClickOpen,
        handleClose: handleClose,
        openDrawer: openDrawer,
        handleDrawerOpen: handleDrawerOpen,
        handleDrawerClose: handleDrawerClose,
      }}
    >
      {props.children}
    </contextStore.Provider>
  );
};

export default ContextProvider;
