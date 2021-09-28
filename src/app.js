import React from "react";
import Header from "./components/header/header";
import TODO from "./components/todo/todo";
import SettingsContext from "./components/todo/context/context";
function App() {
  return (
    <>
      <SettingsContext>
        <Header />
        <TODO />
      </SettingsContext>
    </>
  );
}

export default App;