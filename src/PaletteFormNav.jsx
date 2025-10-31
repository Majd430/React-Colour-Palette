import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { drawerWidth } from "./NewPaletteForm";
import PaletteMetaForm from "./PaletteMetaForm";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

function PaletteFormNav(props) {
  const {
    open,
    handleDrawerOpen,
    palettes,
    newPaletteName,
    setNewPaletteName,
    handleSubmit,
  } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="default" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="PaletteFormNav-title">
            Create New Palette
          </Typography>
        </Toolbar>
        <PaletteMetaForm
          palettes={palettes}
          newPaletteName={newPaletteName}
          setNewPaletteName={setNewPaletteName}
          handleSubmit={handleSubmit}
        />
      </AppBar>
    </Box>
  );
}

export default PaletteFormNav;
