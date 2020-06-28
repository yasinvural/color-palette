import React from "react";
import { Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import PaletteList from './components/PaletteList/PaletteList';

function App() {
  return <div className="App">
    <Route path="/" component={NavBar} />
    <Route exact path="/" component={PaletteList} />
  </div>;
}

export default App;
