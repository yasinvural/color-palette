import React from "react";
import "./Palette.scss";

const Palette = ({ palette }) => {
  const renderPalette = () => {
    const tempPalette = [];
    palette.map((p, i) => {
      const bgStyle = {
        backgroundColor: p,
      };
      tempPalette.push(
        <div
          className="palette"
          key={i}
          style={bgStyle}
          onClick={(e) => copyClipboard(e, p)}
        >
          <div className="code">{p}</div>
          <div className="copied">Copied!</div>
        </div>
      );
    });
    return tempPalette;
  };

  const copyClipboard = (e, code) => {
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
    const textField = document.createElement("textarea");
    textField.innerText = code;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const isColorTooDark = (code) => {
    const color = code.substring(1); // strip #
    const rgb = parseInt(color, 16); // convert rrggbb to decimal
    const red = (rgb >> 16) & 0xff; // extract red
    const green = (rgb >> 8) & 0xff; // extract green
    const blue = (rgb >> 0) & 0xff; // extract blue
    const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // per ITU-R BT.709

    if (luma > 70) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="palette-container">
      {renderPalette()}
      <div className="details-button">Details</div>
    </div>
  );
};

export default Palette;
