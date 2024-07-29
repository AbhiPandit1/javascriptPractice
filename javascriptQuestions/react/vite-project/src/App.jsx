import { useState } from 'react';

function App() {
  const [selectedId, setSelectedId] = useState(null);

  const data = [
    { id: '1', buttonText: 'button1', paraText: 'para1' },
    { id: '2', buttonText: 'button2', paraText: 'para2' },
    { id: '3', buttonText: 'button3', paraText: 'para3' },
  ];

  const handleOnclick = (id) => {
    setSelectedId(id);
  };

  return (
    <>
      <div className="bg-black text-white min-h-[100vh] flex justify-between items-center">
        {data.map((item) => (
          <div key={item.id} className="text-center">
            <button
              className={`${
                selectedId === item.id ? 'bg-red-600' : 'bg-blue-600'
              } text-white font-sans rounded-xl h-[3rem] w-[6rem]`}
              onClick={() => handleOnclick(item.id)}
            >
              {item.buttonText}
            </button>
            {selectedId === item.id && (
              <p className="font-sans text-white mt-2">{item.paraText}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
