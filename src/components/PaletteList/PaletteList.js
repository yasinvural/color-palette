import React, { useState, useEffect } from "react";
import "./PaletteList.css";
import Palette from "../Palette/Palette";

const PaletteList = () => {
  const [paletteList, setPaletteList] = useState(
    Array(15).fill(Array(4).fill(""))
  );
  useEffect(() => {
    const newPaletteList = paletteList.map((palette) => {
      return palette.map((item) => {
        return generateColor();
      });
    });

    setPaletteList(newPaletteList);
  }, []);

  const generateColor = () => {
    return (
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
    /*return (function(m,s,c){return (c ? arguments.callee(m,s,c-1) : '#') +
          s[m.floor(m.random() * s.length)]})(Math,'0123456789ABCDEF',5);*/
  };

  return (
    <div className="palette-list-container">
      {paletteList.map((palette, index) => (
        <Palette key={index} palette={palette} />
      ))}
    </div>
  );
};

export default PaletteList;
