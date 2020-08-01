import React, { useState, useEffect } from "react";
import { generateColor, copyClipboard } from "../../helper/index";
import "./PaletteDetail.scss";

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

  const removeFromPalette = (code) => {
    const newColorPalette = [...colorPalette];
    const index = newColorPalette.findIndex((c) => c === code);
    newColorPalette.splice(index, 1);
    setColorPalette(newColorPalette);
    updateLocalStorage(newColorPalette);
  };

  const createNewColor = () => {
    const newColor = generateColor();
    const newColorPalette = [...colorPalette, newColor];
    setColorPalette(newColorPalette);
    updateLocalStorage(newColorPalette);
  };

  const updateLocalStorage = (newColorPalette) => {
    const updatedPaletteList = paletteList.map((palette, index) => {
      if (Object.keys(palette)[0] === uuid) {
        palette[uuid] = newColorPalette;
        return palette;
      }
      return palette;
    });

    localStorage.setItem("paletteList", JSON.stringify(updatedPaletteList));
  };

  const renderColorPalette = () => {
    const tempPaletteList = [];
    colorPalette.forEach((palette, index) => {
      const bgStyle = {
        backgroundColor: palette,
      };
      tempPaletteList.push(
        <div className="palette" key={index} style={bgStyle}>
          <div className="wrapper">
            <div className="button">
              <span className="button__line"></span>
              <span className="button__line"></span>
              <span className="button__line"></span>
            </div>
            {colorPalette.length !== 4 && (
              <div className="item" onClick={createNewColor}>
                Create
              </div>
            )}
            {colorPalette.length > 2 && (
              <div className="item" onClick={() => removeFromPalette(palette)}>
                Remove
              </div>
            )}
            <div className="item" onClick={() => copyClipboard(palette)}>
              Copy
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
