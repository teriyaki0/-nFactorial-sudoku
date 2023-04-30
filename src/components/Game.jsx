import React, { useEffect, useState } from "react";
import { getUniqueSudoku } from "../utils/UniqueSudoku";
import GameSection from "./game-section/GameSection";
import { VariantsOfNumbers } from "./variants-of-numbers/VariantsOfNumbers";
import { Timer } from "./timer/Timer";

export const Game = () => {
  const [numberSelected, setNumberSelected] = useState("0");
  let [gameArray, setGameArray] = useState([]);
  const [initArray, setInitArray] = useState([]);
  const [solvedArray, setSolvedArray] = useState([]);
  const [cellSelected, setCellSelected] = useState(-1);
  const [won, setWon] = useState(false);
  const [popup, setPopup] = useState(false);

  const difficultLevels = ["Easy", "Medium", "Hard", "Very Hard", "Insane"];
  const [difficult, setDifficult] = useState(difficultLevels[0]);

  useEffect(() => {
    const [temporaryInitArray, temporarySolvedArray] =
      getUniqueSudoku(difficult);
    setWon(false);
    setGameArray(temporaryInitArray);
    setInitArray(temporaryInitArray);
    setSolvedArray(temporarySolvedArray);
  }, [difficult]);

  const isSolved = (index, value) => {
    if (
      gameArray.every((cell, cellIndex) => {
        if (cellIndex === index) {
          return value === solvedArray[cellIndex];
        } else {
          return cell === solvedArray[cellIndex];
        }
      })
    ) {
      return true;
    }
    return false;
  };

  const cellChoice = (index, value) => {
    if (initArray[index] === "0") {
      let tempArray = gameArray.slice();
      tempArray[index] = value;
      setGameArray(tempArray);

      if (isSolved(index, value)) {
        setWon(true);
      }
    }
  };

  const userFillCell = (index, value) => {
    cellChoice(index, value);
  };

  const handleCellClick = (index) => {
    if (numberSelected !== "0") {
      userFillCell(index, numberSelected);
    }
    setCellSelected(index);
  };
  const deleteCell = () => {
    cellChoice(cellSelected, "0");
  };

  const handleClick = (number) => {
    if (cellSelected !== -1) {
      userFillCell(cellSelected, number);
    }
  };

  const wonView = () => {
    setGameArray(solvedArray);
    setWon(true);
  };

  return (
    <div className='container'>
      <div className='header'>
        <Timer won={won} difficult={difficult} />
        <div>
          <span onClick={() => setPopup(!popup)} className='difficult'>
            {difficult}
          </span>

          {popup ? (
            <div className='popup'>
              {difficultLevels.map((levels, index) => {
                return (
                  <div
                    onClick={() => setDifficult(difficultLevels[index])}
                    key={index}
                    className='popup__item'
                  >
                    {levels}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <GameSection
        gameArray={gameArray}
        initArray={initArray}
        handleCellClick={handleCellClick}
        cellSelected={cellSelected}
      />
      <VariantsOfNumbers handleClick={handleClick} />
      <div className='options'>
        <button className='solver' onClick={() => wonView()}>
          Show Solution
        </button>
        <span className='delete' onClick={() => deleteCell()}>
          ❌
        </span>
      </div>
    </div>
  );
};
