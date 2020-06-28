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
  return (
    <div className="palette-container">
      {renderPalette()}
      <div className="details-button">Details</div>
    </div>
  );
};

export default Palette;
