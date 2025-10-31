import React, { memo } from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import "./MiniPalette.css";

function MiniPalette({ paletteName, emoji, colors, id, openDialog, ref }) {
  const miniColorBoxes = colors.map((color) => (
    <div
      key={color.name}
      className="MiniPalette-miniColor"
      style={{ backgroundColor: color.color }}
    ></div>
  ));

  const history = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    history(`/palette/${id}`);
  };

  const deletePalette = (e) => {
    e.stopPropagation();
    openDialog(id);
  };
  return (
    <div className="MiniPalette" onClick={handleClick} ref={ref}>
      <DeleteIcon className="MiniPalette-deleteIcon" onClick={deletePalette} />
      <div className="MiniPalette-colors">{miniColorBoxes}</div>
      <h5 className="MiniPalette-title">
        {paletteName} <span className="MiniPalette-emoji">{emoji}</span>
      </h5>
    </div>
  );
}

export default memo(MiniPalette);
