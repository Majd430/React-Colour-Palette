import React, { useState } from "react";
import { NavLink } from "react-router";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";
import "./SingleColorPalette.css";

function SingleColorPalette(props) {
  const [format, setFormat] = useState("hex");

  const changeFormat = (val) => {
    setFormat(val);
  };

  const gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  };

  const shades = gatherShades(props.palette, props.colorId);

  const colorBoxes = shades.map((color) => (
    <ColorBox
      key={color.name}
      background={color[format]}
      name={color.name}
      showLink={false}
    />
  ));

  const { paletteName, emoji, id } = props.palette;
  return (
    <div className="SingleColorPalette Palette">
      <NavBar handleChange={changeFormat} showSingleColor={true} />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <NavLink to={`/palette/${id}`} className="back-button">
            Go Back
          </NavLink>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default SingleColorPalette;
