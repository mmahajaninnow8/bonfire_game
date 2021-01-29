import React from "react"
import {
  Button
} from "reactstrap";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  let history = useHistory();
  const playGame = () => {
    history.push("/game");
  }
  return (
    <div >
      <>
        <div className="text-center">
          <h1>Press button to start game</h1>
          <Button onClick={playGame}>
            play game
          </Button>
        </div>

      </>
    </div>
  )
}