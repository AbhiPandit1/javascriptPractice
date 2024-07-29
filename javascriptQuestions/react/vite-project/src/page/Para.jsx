const Para = ({ buttonText, paraText }) => {
  return (
    <div>
      <button className="bg-blue-600 text-white font-sans rounded-xl h-[3rem] w-[6rem] ">
        {buttonText}
      </button>
      <p className="font-sans text-white text-2xl">{paraText}</p>
    </div>
  );
};

export default Para;
