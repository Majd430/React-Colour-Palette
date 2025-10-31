import React, { Component } from "react";
import { NavLink } from "react-router";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./NavBar.css";
// Logo is made by Jared from Udemy
import CoolerLogo from "./CoolerPaletteLogo.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false,
    };
  }

  handleFormatChange = (e) => {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  };

  closeSnackBar = () => {
    this.setState({ open: false });
  };
  render() {
    const { level, changeLevel, showSingleColor } = this.props;
    const { format } = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <NavLink to="/"><img
                        src={CoolerLogo}
                        alt="reactcolorpicker"
                        height="50px"
                    /></NavLink>
        </div>
        {!showSingleColor && (
          <div className="slider-container">
            <span>Level: {level}</span>
            <div className="slider">
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onChangeComplete={changeLevel}
              />
            </div>
          </div>
        )}
        <div className="select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format changed To {format.toUpperCase()}
            </span>
          }
          action={
            <IconButton color="inherit" key="close" aria-label="close">
              <CloseIcon onClick={this.closeSnackBar} />
            </IconButton>
          }
          onClose={this.closeSnackBar}
        />
      </header>
    );
  }
}

export default NavBar;
