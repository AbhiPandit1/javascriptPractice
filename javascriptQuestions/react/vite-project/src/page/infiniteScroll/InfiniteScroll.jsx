import useHandleScroll from './UseHandleSroll';
const InfiniteScroll = () => {
  const { data } = useHandleScroll();

  return (
    <div className="min-h-[100vh] max-w-[100vw] overflow-hidden bg-black text-white font-sans">
      <div className="grid grid-cols-1 m-auto">
        {data.map((card) => (
          <div
            key={card.id}
            className="min-h-[20%] text-[4rem] m-20 min-w-full flex"
          >
            {card.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
