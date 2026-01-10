import { useEffect, useRef } from "react";
import useEditorStore from "../../utils/editorStore";
import ImageComponent from "../image/ImageComponent";

const Workspace = ({ previewImg }) => {
  const { textOptions, setTextOptions, canvasOptions, setCanvasOptions, setSelectedLayer } =
    useEditorStore();

  useEffect(() => {
    if (canvasOptions.height === 0) {
      const canvasHeight = (375 * previewImg.height) / previewImg.width;
      setCanvasOptions({
        ...canvasOptions,
        height: canvasHeight,
        orientation: canvasHeight > 375 ? "portrait" : "landscape",
      });
    }
  }, [previewImg, canvasOptions, setCanvasOptions]);

  // Drag and Drop Text Logic

  const itemRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    setTextOptions({
      ...textOptions,
      left: e.clientX - offset.current.x,
      top: e.clientY - offset.current.y,
    });
    
  };

  const handleMouseUp = (e) => {
    isDragging.current = false;
  };  
  const handleMouseLeave = (e) => {
    isDragging.current = false;
  }
  const handleMouseDown = (e) => {
    setSelectedLayer("text");
    isDragging.current = true;

    offset.current = {
      x: e.clientX - textOptions.left,
      y: e.clientY - textOptions.top,
    };
  }


  return (
    <div className="workspace">
      <div
        className={"canvas"}
        style={{
          height: canvasOptions.height,
          backgroundColor: canvasOptions.backgroundColor,
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <img src={previewImg.url} alt="" />
        {textOptions.text && (
          <div
            className="text"
            style={{
              fontSize: `${textOptions.fontSize}px`,
              // color: textOptions.color,
              // top: `${textOptions.top}px`,
              top: `${textOptions.top}px`,
              left: `${textOptions.left}px`,
            }}
            onMouseDown={handleMouseDown}
            ref={itemRef}
          >
            <input
              type="text"
              value={textOptions.text}
              onChange={(e) =>
                setTextOptions({ ...textOptions, text: e.target.value })
              }
              style={{
                color: textOptions.color,
              }}
            />
            <div
              className="deleteTextButton"
              onClick={() => setTextOptions({ ...textOptions, text: "" })}
            >
              <ImageComponent path={"/general/delete.svg"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
