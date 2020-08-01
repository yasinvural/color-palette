const generateColor = () => {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  /*return (function(m,s,c){return (c ? arguments.callee(m,s,c-1) : '#') +
          s[m.floor(m.random() * s.length)]})(Math,'0123456789ABCDEF',5);*/
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

const copyClipboard = (code) => {
  const textField = document.createElement("textarea");
  textField.innerText = code;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

export { generateColor, isColorTooDark, copyClipboard };
