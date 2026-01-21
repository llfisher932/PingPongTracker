import { useEffect, useState, type ChangeEvent } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faArrowsRotate,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
//TODO: defaults button
function App() {
  let [player1Score, setPlayer1Score] = useState(0);
  let [player2Score, setPlayer2Score] = useState(0);
  let [winner, setWinner] = useState(false);
  let [servingPlayer, setServingPlayer] = useState("player1");
  let [serveTracker, setServeTracker] = useState(0);
  let [winningNum, setWinningNum] = useState(11);
  let [savedServeNum, setSavedServeNum] = useState(5);
  let [serveCount, setServeCount] = useState(savedServeNum);
  let [settingsMenu, setSettingsMenu] = useState(false);
  let [winningNumBox, setWinningNumBox] = useState("");
  let [serveBox, setServeBox] = useState("");
  let [winningPlayerNum, setWinningPlayerNum] = useState(2);

  let handleWinNumBox = (event: ChangeEvent<HTMLInputElement>) => {
    setWinningNumBox(event.target.value);
  };
  let handleServeBox = (event: ChangeEvent<HTMLInputElement>) => {
    setServeBox(event.target.value);
  };
  let resetGame = () => {
    setServeCount(savedServeNum);
    setServeTracker(0);
    setServingPlayer("player1");
    setWinner(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
  };
  let update1Score = () => {
    if (!winner) {
      setPlayer1Score(player1Score + 1);
      setServeTracker(serveTracker + 1);
    }
  };
  let update2Score = () => {
    if (!winner) {
      setPlayer2Score(player2Score + 1);
      setServeTracker(serveTracker + 1);
    }
  };
  let checkWinner = () => {
    if (
      (player1Score >= winningNum && player1Score >= player2Score + 2) ||
      (player2Score >= winningNum && player2Score >= player1Score + 2)
    ) {
      setWinner(true);
      if (player1Score > player2Score) {
        setWinningPlayerNum(1);
      } else {
        setWinningPlayerNum(2);
      }
    }
  };

  let resetDefaults = () => {
    setWinningNum(11);
    setSavedServeNum(5);
    setServeCount(5);
  };
  let updateServe = () => {
    if (serveTracker >= serveCount) {
      console.log(serveTracker);
      setServeTracker(0);
      servingPlayer == "player1"
        ? setServingPlayer("player2")
        : setServingPlayer("player1");
    }
    if (player1Score >= winningNum - 1 && player2Score >= winningNum - 1) {
      setServeCount(1);
    }
  };
  let applySettings = () => {
    setWinningNum(Number.parseInt(winningNumBox));
    setSavedServeNum(Number.parseInt(serveBox));
    setServeCount(Number.parseInt(serveBox));
  };

  useEffect(() => {
    checkWinner();
  }, [player1Score, player2Score]);
  useEffect(() => {
    updateServe();
  }, [serveTracker]);

  return (
    <div className="flex flex-col h-dvh justify-center items-center text-center">
      {winner ? (
        <div className="flex fixed justify-center items-center text-center text-3xl w-full h-full  pointer-events-none">
          <div className="flex fixed w-full h-full bg-gray-800 z-100 opacity-50"></div>
          <div className="opacity-100 text-white z-105 text-5xl font-bold rotate-90 text-nowrap">
            🥳Player {winningPlayerNum} Won!🥳
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex fixed rotate-90 bg-white w-45 justify-around items-center p-1 rounded-xl right-0 translate-x-11">
        <button
          className="flex"
          onClick={() => {
            setSettingsMenu(!settingsMenu);
          }}
        >
          <FontAwesomeIcon
            icon={faGear}
            className="text-2xl active:bg-gray-400 p-3 rounded-full transition"
          />
        </button>
        <button className="flex" onClick={resetGame}>
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className="text-2xl active:bg-gray-400 p-3 rounded-full transition"
          />
        </button>
        <button
          className="flex"
          onClick={() => {
            servingPlayer == "player1"
              ? setServingPlayer("player2")
              : setServingPlayer("player1");
          }}
        >
          <FontAwesomeIcon
            icon={faArrowRightArrowLeft}
            className="text-2xl active:bg-gray-400 p-3 rounded-full transition"
          />
        </button>
      </div>
      {settingsMenu ? (
        <div className="fixed flex flex-col z-50 bg-white w-[70%] h-[80%] left-0 ml-6 rounded-3xl p-3 items-center">
          <div className="text-center w-full text-3xl font-bold mt-3">
            Settings
          </div>
          <div className="flex flex-col w-[80%] mt-8 gap-6  items-center h-[80%]">
            <div className="flex flex-row items-center justify-evenly text-lg">
              <label htmlFor="winNumBox" className="text-nowrap">
                Score To Win:
              </label>
              <input
                id="winNumBox"
                type="text"
                className="w-[25%] h-10 text-center"
                onChange={handleWinNumBox}
              />
            </div>
            <div className="flex flex-row items-center justify-evenly text-lg text-nowrap">
              <label htmlFor="handleServeBox">Serves:</label>
              <input
                id="handleServeBox"
                type="text"
                className="w-[25%] h-10 text-center"
                onChange={handleServeBox}
              />
            </div>
          </div>
          <div className="flex flex-row w-full justify-evenly">
            <button
              className="bg-blue-600 w-[45%] text-white p-3 rounded-2xl text-xl font-bold active:bg-blue-900 transition duration-75"
              onClick={applySettings}
            >
              Apply
            </button>
            <button
              onClick={resetDefaults}
              className="bg-blue-600 text-white  p-3 w-[45%] rounded-2xl text-xl font-bold active:bg-blue-900 transition duration-75"
            >
              Defaults
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div
        id="player1"
        className={`h-full w-full flex justify-center items-center bg-blue-700 active:bg-blue-800 transition duration-100  font-bold text-9xl ${servingPlayer == "player1" ? "text-yellow-300" : "text-white"}`}
        onClick={update1Score}
      >
        {player1Score}
      </div>
      <div
        id="player2"
        className={`h-full w-full flex justify-center items-center bg-red-700 duration-100 active:bg-red-800 transition font-bold text-9xl ${servingPlayer == "player2" ? "text-yellow-300" : "text-white"}`}
        onClick={update2Score}
      >
        {player2Score}
      </div>
    </div>
  );
}

export default App;
