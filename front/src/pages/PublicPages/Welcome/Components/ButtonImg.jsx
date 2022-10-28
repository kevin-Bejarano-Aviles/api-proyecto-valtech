function ButtonImg({ index, currentIndex }) {
  const active = index === currentIndex;

  return (
    <div
      key={index}
      className={`mx-2 rounded w-11 h-2  ${
        active ? 'bg-green' : 'bg-graybackground'
      }`}
    ></div>
  );
}

export default ButtonImg;
