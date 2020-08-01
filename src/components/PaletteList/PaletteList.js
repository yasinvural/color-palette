import React, { useState, useEffect } from "react";
import "./PaletteList.css";
import Palette from "../Palette/Palette";
import { generateColor } from "../../helper/index";
import { v4 as uuidv4 } from "uuid";

const PaletteList = (props) => {
  const [paletteList, setPaletteList] = useState(Array(15).fill(""));

  useEffect(() => {
    const paletteListFromStorage = JSON.parse(
      localStorage.getItem("paletteList")
    );

    if (!paletteListFromStorage) {
      const newPaletteList = paletteList.map((palette) => {
        const uuid = uuidv4();
        const tempList = [];
        for (let i = 0; i < 4; i++) {
          tempList.push(generateColor());
        }
        return {
          [uuid]: tempList,
        };
      });
      setPaletteList(newPaletteList);
      localStorage.setItem("paletteList", JSON.stringify(newPaletteList));
    } else {
      setPaletteList(paletteListFromStorage);
    }
  }, []);

  const handleDetailClick = (uuid) => {
    props.history.push(`/${uuid}`);
  };
  return (
    <div className="palette-list-container">
      {paletteList.map((palette, index) => (
        <Palette
          key={index}
          palette={palette}
          handleDetailClick={handleDetailClick}
        />
      ))}
    </div>
  );
};

export default PaletteList;
