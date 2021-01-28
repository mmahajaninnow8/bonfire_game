import "./App.css";
import logo from "./logo.svg";
import React from "react";
import Routes from "./routes";

const App = () => {
  const highScore = localStorage.getItem('highScore')
  const setHighScoreValue = highScore?highScore:0
  localStorage.setItem('highScore',setHighScoreValue);
  return (
  <div className="">
    <Routes />
  </div>
)};

export default App;
