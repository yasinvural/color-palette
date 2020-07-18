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

  const renderColorPalette = () => {
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
                  <div>Remove</div>
                </li>
                <li className="menu__list__item">
                  <div>Copy</div>
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
