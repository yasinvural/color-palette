import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import PaletteList from "./components/PaletteList/PaletteList";
import PaletteDetail from "./components/PaletteDetail/PaletteDetail";

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={PaletteList} />
      <Route path="/:uuid" component={PaletteDetail} />
    </div>
  );
}

export default App;
