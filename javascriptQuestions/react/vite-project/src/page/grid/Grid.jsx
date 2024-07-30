import React, { useState } from 'react';

const Grid = () => {
  const [addIndex, setAddIndex] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const grid = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  // Function to handle adding an index and checking for the deactivation condition
  const addEvent = (index) => {
    setAddIndex((prev) => {
      if (!prev.includes(index)) {
        const updatedAddIndex = [index, ...prev];

        // Check if we need to deactivate
        if (updatedAddIndex.length === grid.flat().filter(Boolean).length) {
          setIsDeactivating(true);
          subtractEvent().then(() => {
            if (updatedAddIndex.length > 0) {
              setAddIndex([]);
            }
          });
        }
        return updatedAddIndex;
      }
      return prev;
    });
  };
  console.log(addIndex);

  // Function to handle the subtraction event with timeouts
  const subtractEvent = () => {
    const indicesToRemove = [...addIndex].reverse();
    return new Promise((resolve) => {
      indicesToRemove.forEach((index, i) => {
        setTimeout(() => {
          setAddIndex((prev) => {
            const newOrder = prev.filter((idx) => idx !== index);
            if (newOrder.length === 0) {
              setIsDeactivating(false);
              resolve(); // Resolve the promise once all indices are removed
            }
            return newOrder;
          });
        }, i * 1000);
      });
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
          } m-auto ${isDeactivating ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !isDeactivating && addEvent(index)}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
