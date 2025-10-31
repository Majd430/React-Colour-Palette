import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./PaletteMetaForm.css";

function PaletteMetaForm(props) {
  const [open, setOpen] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const { palettes, newPaletteName, setNewPaletteName, handleSubmit } = props;

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEmoji = () => {
    setOpenEmoji(true);
    handleClose();
  };

  const handleCloseEmoji = () => {
    setOpenEmoji(false);
  };

  const handleChangePaletteName = (evt) => {
    setNewPaletteName(evt.target.value);
  };

  const savePalette = (emoji) => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    handleSubmit(newPalette);
    handleCloseEmoji();
  };

  return (
    <div>
      <div className="PaletteMetaForm-navButtons">
        <NavLink to="/">
          <Button
            variant="contained"
            color="secondary"
            className="PaletteMetaForm-button"
          >
            Back Home
          </Button>
        </NavLink>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          className="PaletteMetaForm-button"
        >
          Save Palette
        </Button>
      </div>

      <Dialog open={openEmoji} onClose={handleCloseEmoji}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker data={data} onEmojiSelect={savePalette} theme="light" />
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose a palette name</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={3} className="PaletteMetaForm-dialog">
            Please enter a name for your new beautiful palette. Make sure it's
            unique!
          </DialogContentText>
          <ValidatorForm
            onSubmit={handleClickOpenEmoji}
            id="palette-name-form"
          >
            <TextValidator
              label="Palette Name"
              variant="filled"
              fullWidth
              value={newPaletteName}
              onChange={handleChangePaletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Palette name is required",
                "Palette name already exists",
              ]}
            />
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            form="palette-name-form"
          >
            Save Palette Name
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
