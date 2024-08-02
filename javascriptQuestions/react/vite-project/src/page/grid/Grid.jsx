import React, { useState } from 'react';

const Grid = () => {
  const [addIndex, setAddIndex] = useState([]);
  const grid = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const addEvent = (index) => {
    if (!addIndex.includes(index)) {
      setAddIndex([index, ...addIndex]);
    }
    if (addIndex.length + 1 === grid.flat().filter(Boolean).length) {
      subtractEvent();
    }
  };

  const subtractEvent = () => {
    const indicesToRemove = [...addIndex];
    indicesToRemove.reverse().forEach((index, i) => {
      setTimeout(() => {
        setAddIndex((prev) => prev.filter((_, idx) => idx !== prev.length - 1));
      }, i * 1000);
    });
  };

  return (
    <div
      className={`h-[100vh] max-h-[100vh] bg-black grid grid-cols-${grid[0].length} grid-rows-${grid.length} m-auto`}
    >
      {grid.flat().map((cell, index) => (
        <div
          key={index}
          className={`h-[10rem] w-[10rem] border-2 ${
            addIndex.includes(index)
              ? 'bg-green-700'
              : cell === 1
              ? 'bg-red-700'
              : 'bg-white'
          } m-auto`}
          onClick={() => addEvent(index)}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
