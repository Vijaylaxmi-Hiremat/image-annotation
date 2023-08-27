import React from "react";

const ImageNavigation = ({ currentIndex, totalImages, onPrev, onNext }) => {
    return(
        <div>
         <button onClick={ onPrev } disabled={ currentIndex === 0 }>Previous</button>
         <span>{currentIndex+1}/{totalImages}</span>
         <button onClick={ onNext } disabled={ currentIndex === totalImages - 1 }>next</button>
        </div>
    )
}

export default ImageNavigation;