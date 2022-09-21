function ButtonImg({index,currentIndex}) {
    let active=index===currentIndex
    console.log(index);
    console.log(active);
    return (
        <div key={index} className={`mx-2 rounded w-11 h-2  ${active ? 'bg-green' : 'bg-graybackground' }`}></div>
    );
}

export default ButtonImg;