import { useState, useRef, useEffect } from 'react';

function bannerFunctions() {
  const slideRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOneNextClick = (featuredImg) => {
    const productsLength = featuredImg.length;
    if (currentIndex === productsLength - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    slideRef.current.classList.add('fade-anim');
  };

  const handleOnePrevClick = (featuredImg) => {
    const productsLength = featuredImg.length;
    if (currentIndex === 0) {
      setCurrentIndex(productsLength - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    slideRef.current.classList.add('fade-anim');
  };

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim');
  };

  useEffect(() => {
    slideRef.current.addEventListener('animationend', removeAnimation);
  }, [currentIndex]);

  return {
    handleOneNextClick,
    handleOnePrevClick,
    currentIndex,
    slideRef,
  };
}
export default bannerFunctions;
