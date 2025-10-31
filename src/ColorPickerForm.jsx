import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getTextColor } from "./colorHelpers";
import "./ColorPickerForm.css";

function ColorPickerForm(props) {
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return colors.every(({ color }) => color !== currentColor);
    });
  });

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const handleChangeColorName = (evt) => {
    setNewColorName(evt.target.value);
  };

  const handleSubmit = () => {
    const newColor = { color: currentColor, name: newColorName };
    props.addNewColor(newColor);
    setNewColorName("");
  };

  const { fullPalette, colors } = props;
  return (
    <div className="ColorPickerForm">
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className="ColorPickerForm-picker"
        width="100%"
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          id="ColorPickerForm-colorNameInput"
          label="Color Name"
          variant="filled"
          value={newColorName}
          onChange={handleChangeColorName}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Color name is required",
            "Color name must be unique",
            "Color already exists",
          ]}
        />
        <Button
          variant="contained"
          color="success"
          id="ColorPickerForm-addColor"
          style={{
            backgroundColor: fullPalette ? "" : currentColor,
            color: fullPalette ? "" : getTextColor(currentColor),
          }}
          type="submit"
          disabled={fullPalette}
        >
          {fullPalette ? "Palette full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
