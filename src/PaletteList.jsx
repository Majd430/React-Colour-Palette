import React, { createRef, useState } from "react";
import { NavLink } from "react-router";
import MiniPalette from "./MiniPalette";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { blue, red } from "@mui/material/colors";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./PaletteList.css";

function PaletteList(props) {
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const handleClick = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteID(id);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteID("");
  };

  const handleDelete = () => {
    deletePalette(deleteID);
    handleClose();
  };
  const { palettes, deletePalette } = props;

  return (
    <div className="PaletteList">
      <div className="PaletteList-container">
        <nav className="PaletteList-nav">
          <h1 className="PaletteList-heading">React Colors</h1>
          <div className="PaletteList-navButtons">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClick}
              className="PaletteList-button"
            >
              Reset Palette
            </Button>
            <NavLink to="/palette/new">
              <Button
                variant="contained"
                color="primary"
                className="PaletteList-button"
              >
                Create Palette
              </Button>
            </NavLink>
          </div>
        </nav>
        <TransitionGroup className="PaletteList-palettes">
          {palettes.map((palette) => {
            const nodeRef = createRef(null);
            return (
              <CSSTransition
                key={palette.id}
                nodeRef={nodeRef}
                classNames="fade"
                timeout={500}
              >
                <MiniPalette
                  {...palette}
                  key={palette.id}
                  ref={nodeRef}
                  id={palette.id}
                  openDialog={handleClickOpen}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete this palette?</DialogTitle>
        <List>
          <ListItem>
            <ListItemButton onClick={handleDelete}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleClose}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default PaletteList;
