import React, {useState, useRef} from "react";
import { Stage, Layer, Rect, Transformer} from 'react-konva'

const ImageDisplay =({imageUrl, annotations, onSave, onSubmit}) => {
    const [boxes, setBoxes] = useState([]);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const trRef = useRef();

    const handleStageClick = (e) => {
        if(e.target === e.target.getStage()){
            setSelectedBoxIndex(null);
            return;
        }
        if(selectedBoxIndex != null) return;
        const newBox = {
            x: e.evt.layerX,
            y: e.evt.layerY,
            width: 100,
            height: 100,
        };
        setBoxes([...boxes, newBox]);
        setSelectedBoxIndex(boxes.length);
    }

    const handleBoxClick=(index)=>{
        setSelectedBoxIndex(index);
    }

    const handleSaveClick = () => {
        onSave(boxes); // Pass the current state of boxes to the onSave function
    };

    const handleExportAnnotations = () => {
        const annotationsToExport = annotations[imageUrl] || [];
        onSubmit(annotationsToExport);
      };

    
    return (
        <div>
            <Stage width={800} height={600} onClick={handleStageClick}>
                <Layer>
                  <img src={imageUrl} alt="" />
                  {boxes.map((box, index) => (
                    <Rect
                     key={index}
                     x={box.x}
                     y={box.y}
                     width={box.width}
                     height={box.height}
                     fill={index === selectedBoxIndex ? "blue" : "black"}
                     onClick={() => handleBoxClick(index)}
                     draggable
                    />
                  ))}
                  <Transformer
                  ref = {trRef}
                  selectedShapeName="box"
                  keepRatio={false}
                  enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                  />
                </Layer>
            </Stage>
            <button onClick={handleSaveClick}>Save Bounding Boxes</button>
            <button onClick={handleExportAnnotations}>Submit</button>
        </div>
    )
};

export default ImageDisplay;
