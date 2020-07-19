import React, { useState, useEffect } from "react";
import "./PaletteDetail.scss";
import { v4 as uuidv4 } from "uuid";

const PaletteDetail = (props) => {
  const paletteList = JSON.parse(localStorage.paletteList);
  const [colorPalette, setColorPalette] = useState([]);
  const { uuid } = props.match.params;
  useEffect(() => {
    const palette = paletteList.find((palette) => {
      const paletteId = Object.keys(palette)[0];
      if (paletteId === uuid) {
        return palette;
      }
    });
    const paletteArr = Object.values(palette).flat();
    setColorPalette(paletteArr);
  }, [uuid]);

  const copyClipboard = (e, code) => {
    const textField = document.createElement("textarea");
    textField.innerText = code;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const removeFromPalette = (code) => {
    const newColorPalette = [...colorPalette];
    const index = newColorPalette.findIndex((c) => c === code);
    newColorPalette.splice(index, 1);
    setColorPalette(newColorPalette);
  };

  const renderColorPalette = () => {
    console.log("render palette");
    const tempPaletteList = [];
    colorPalette.forEach((palette, index) => {
      const bgStyle = {
        backgroundColor: palette,
      };
      tempPaletteList.push(
        <div className="palette" key={index} style={bgStyle}>
          <div className="wrapper">
            <div className="menu">
              <ul className="menu__list">
                <li className="menu__list__item">
                  <div onClick={() => removeFromPalette(palette)}>Remove</div>
                </li>
                <li className="menu__list__item">
                  <div onClick={(e) => copyClipboard(e, palette)}>Copy</div>
                </li>
              </ul>
            </div>
            <div className="button">
              <span className="button__line"></span>
              <span className="button__line"></span>
              <span className="button__line"></span>
            </div>
          </div>
        </div>
      );
    });

    return tempPaletteList;
  };

  return <div className="palette-detail-container">{renderColorPalette()}</div>;
};

export default PaletteDetail;
