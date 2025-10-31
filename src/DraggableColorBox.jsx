import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTextColor } from "./colorHelpers";
import "./DraggableColorBox.css";

function DraggableColorBox(props) {
  const dynamicText = getTextColor(props.color);

  return (
    <div className="DraggableColorBox" style={{ backgroundColor: props.color }}>
      <button className="drag-button" style={{ color: dynamicText }}>
        DRAG
      </button>
      <div className="DraggableColorBox-boxContent">
        <span style={{ color: dynamicText }}>{props.name}</span>
        <DeleteIcon
          className="DraggableColorBox-deleteIcon"
          onClick={props.handleClick}
        />
      </div>
    </div>
  );
}

export default DraggableColorBox;
