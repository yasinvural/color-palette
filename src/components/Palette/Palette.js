import React from "react";
import { isColorTooDark, copyClipboard } from "../../helper/index";
import "./Palette.scss";

const Palette = ({ handleDetailClick, palette }) => {
  const uuid = Object.keys(palette)[0];
  const paletteList = Object.values(palette)[0];

  const renderPalette = () => {
    const tempPalette = [];
    paletteList &&
      paletteList.map((p, i) => {
        const bgStyle = {
          backgroundColor: p,
        };
        tempPalette.push(
          <div
            className="palette"
            key={i}
            style={bgStyle}
            onClick={(e) => copyColor(e, p)}
          >
            <div className="code">{p}</div>
            <div className="copied">Copied!</div>
          </div>
        );
      });
    return tempPalette;
  };

  const copyColor = (e, code) => {
    const copied = e.currentTarget.children[1];
    const isColorDark = isColorTooDark(code);
    if (isColorDark) {
      copied.classList.add("whiteFontColor");
    } else {
      copied.classList.add("blackFontColor");
    }

    const addAnimation = (copied) => {
      copied.classList.add("copyAnimation");
    };
    const removeAnimation = (copied) => {
      setTimeout(() => {
        copied.classList.remove("copyAnimation");
      }, 1000);
    };

    addAnimation(copied);
    removeAnimation(copied);
    copyClipboard(code);
  };

  return (
    <div className="palette-container">
      {renderPalette()}
      <div className="details-button" onClick={() => handleDetailClick(uuid)}>
        Details
      </div>
    </div>
  );
};

export default Palette;
