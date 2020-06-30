import React, { useState, useEffect } from "react";
import "./PaletteList.css";
import Palette from "../Palette/Palette";
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

  const generateColor = () => {
    return (
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
    /*return (function(m,s,c){return (c ? arguments.callee(m,s,c-1) : '#') +
          s[m.floor(m.random() * s.length)]})(Math,'0123456789ABCDEF',5);*/
  };

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
