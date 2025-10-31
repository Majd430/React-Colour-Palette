import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { ReactSortable } from "react-sortablejs";

function DraggableColorList(props) {
  const { colors, setColors, deleteColor } = props;
  return (
    <ReactSortable
      tag="div"
      list={colors}
      setList={setColors}
      style={{ height: "100%" }}
    >
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          name={color.name}
          color={color.color}
          handleClick={() => deleteColor(color.name)}
        />
      ))}
    </ReactSortable>
  );
}

export default DraggableColorList;
