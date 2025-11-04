import React from "react";
import { NavLink } from "react-router";
import Button from "@mui/material/Button";
import "./Palette.css";

function PaletteFooter(props) {
  const { paletteName, emoji } = props;
  return (
    <footer className="Palette-footer">
      <div className="PaletteFooter-navButtons">
        <NavLink to="/">
          <Button
            variant="contained"
            color="secondary"
            className="PaletteFooter-button"
          >
            Back Home
          </Button>
        </NavLink>
      </div>
      <div>
        {paletteName} <span className="emoji">{emoji}</span>
      </div>
    </footer>
  );
}

export default PaletteFooter;
