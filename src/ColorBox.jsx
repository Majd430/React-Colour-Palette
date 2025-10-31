import React, { Component } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NavLink } from "react-router";
import { getTextColor } from "./colorHelpers";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  };

  render() {
    const { name, background, colorId, paletteId, showLink } = this.props;
    const { copied } = this.state;
    const dynamicText = getTextColor(background);
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ background }}>
          <div
            style={{ background }}
            className={`copy-overlay ${copied && "show"}`}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1 style={{ color: dynamicText }}>copied!</h1>
            <p style={{ color: dynamicText }}>{background}</p>
          </div>
          <div>
            <div className="box-content">
              <span style={{ color: dynamicText }}>{name}</span>
            </div>
            <button className="copy-button" style={{ color: dynamicText }}>
              COPY
            </button>
          </div>
          {showLink && (
            <NavLink
              to={`/palette/${paletteId}/${colorId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="see-more" style={{ color: dynamicText }}>
                MORE
              </span>
            </NavLink>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
