import React from "react";

export const VariantsOfNumbers = ({ handleClick }) => {
  return (
    <div className='row'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
        return (
          <div
            className='number'
            key={number}
            onClick={() => handleClick(number.toString())}
          >
            {number}
          </div>
        );
      })}
    </div>
  );
};
