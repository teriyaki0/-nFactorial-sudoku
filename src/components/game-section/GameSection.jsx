import React from "react";

function GameSection({ gameArray, initArray, cellSelected, handleCellClick }) {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  function isCellSameAsSelectedCell(row, column) {
    return true;
  }

  function selectedCell(indexOfArray, value, highlight) {
    if (value !== "0") {
      if (initArray[indexOfArray] === "0") {
        return (
          <td
            className={`game__cell game__cell--userfilled game__cell--${highlight}selected`}
            key={indexOfArray}
            onClick={() => handleCellClick(indexOfArray)}
          >
            {value}
          </td>
        );
      } else {
        return (
          <td
            className={`game__cell game__cell--filled game__cell--${highlight}selected`}
            key={indexOfArray}
            onClick={() => handleCellClick(indexOfArray)}
          >
            {value}
          </td>
        );
      }
    } else {
      return (
        <td
          className={`game__cell game__cell--${highlight}selected`}
          key={indexOfArray}
          onClick={() => handleCellClick(indexOfArray)}
        >
          {value}
        </td>
      );
    }
  }

  function unselectedCell(indexOfArray, value) {
    if (value !== "0") {
      if (initArray[indexOfArray] === "0") {
        return (
          <td
            className='game__cell game__cell--userfilled'
            key={indexOfArray}
            onClick={() => handleCellClick(indexOfArray)}
          >
            {value}
          </td>
        );
      } else {
        return (
          <td
            className='game__cell game__cell--filled'
            key={indexOfArray}
            onClick={() => handleCellClick(indexOfArray)}
          >
            {value}
          </td>
        );
      }
    } else {
      return (
        <td
          className='game__cell'
          key={indexOfArray}
          onClick={() => handleCellClick(indexOfArray)}
        >
          {value}
        </td>
      );
    }
  }

  return (
    <section className='game'>
      <table className='game__board'>
        <tbody>
          {rows.map((row) => {
            return (
              <tr className='game__row' key={row}>
                {rows.map((column) => {
                  const indexOfArray = row * 9 + column;
                  const value = gameArray[indexOfArray];

                  if (cellSelected === indexOfArray) {
                    return selectedCell(indexOfArray, value, "highlight");
                  }

                  if (
                    cellSelected !== "0" &&
                    isCellSameAsSelectedCell(row, column)
                  ) {
                    return selectedCell(indexOfArray, value, "");
                  } else {
                    return unselectedCell(indexOfArray, value);
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default GameSection;
