import React, { useState } from "react";
import { useNavigate } from "react-router";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import "./NewPaletteForm.css";
import seedColors from "./seedColors";

export const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    // padding: theme.spacing(3),
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NewPaletteForm(props) {
  const history = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const [newPaletteName, setNewPaletteName] = useState("");

  const defaultProps = {
    maxColors: 20,
  };

  const fullPalette = colors.length >= defaultProps.maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors(colors.concat(newColor));
  };

  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    history("/");
  };

  const deleteColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const clearPalette = () => {
    setColors([]);
  };
  const addRandomColor = () => {
    const newPalettes = props.palettes.length === 0 ? seedColors : props.palettes; 
    const allColors = newPalettes.map((palette) => palette.colors).flat();
    const filteredColors = allColors.filter((color) => !colors.includes(color));
    let rand = Math.floor(Math.random() * filteredColors.length);
    const randomColor = filteredColors[rand];
    setColors([...colors, randomColor]);
  };

  const { palettes } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        drawerWidth={drawerWidth}
        open={open}
        palettes={palettes}
        handleDrawerOpen={handleDrawerOpen}
        newPaletteName={newPaletteName}
        setNewPaletteName={setNewPaletteName}
        handleSubmit={handleSubmit}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
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
        <div className="NewPaletteForm-container">
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className="NewPaletteForm-buttonContainer">
            <Button
              variant="outlined"
              color="error"
              onClick={clearPalette}
              className="NewPaletteForm-button"
            >
              Clear Palette
            </Button>
            <Button
              variant="outlined"
              color="info"
              className="NewPaletteForm-button"
              onClick={addRandomColor}
              disabled={fullPalette}
            >
              {fullPalette ? "Palette full" : "Add Random Color"}
            </Button>
          </div>
          <ColorPickerForm
            colors={colors}
            fullPalette={fullPalette}
            addNewColor={addNewColor}
          />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          setColors={setColors}
          deleteColor={deleteColor}
        />
      </Main>
    </Box>
  );
}

export default NewPaletteForm;
