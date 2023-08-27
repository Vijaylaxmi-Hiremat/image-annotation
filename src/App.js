import React, {useState} from "react";
import ImageDisplay from './ImageDisplay';
import ImageNavigation from './ImageNavigation';

const images = ["image 1.jpg", "image 2.jpg", "image 3.webp", "image 4.jpg", "image 5.jpg"];

function App(){
  const [currentIndex, setCurrentIndex] = useState(0);
  const [annotations, setAnnotations] = ({});

 const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex-1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex+1, images.length-1));
  };

  const handleSaveAnnotations = (imageBoxes) => {
    // Update the annotations state with the new bounding box data
    const updatedAnnotations = { ...annotations };
    updatedAnnotations[images[currentIndex]] = imageBoxes;
    setAnnotations(updatedAnnotations);
  };

  const handleExportAnnotations = (annotationsToExport) => {
    const jsonContent = JSON.stringify(annotationsToExport, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'annotations.json';
    a.click();
  };

  return(
    <div>
      <ImageNavigation
      currentIndex = {currentIndex}
      totalImages = {images.length}
      onPrev = {handlePrevClick}
      onNext = {handleNextClick}
      />
      <ImageDisplay imageUrl={`/images/${images[currentIndex]}`} 
      annotations={annotations} 
      onSave={handleSaveAnnotations}
      onSubmit={handleExportAnnotations}/>
    </div>
  )
}

export default App

