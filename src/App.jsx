import { useState, useRef, useEffect } from "react";

const len = 5;

const App = () => {
  const [list, setList] = useState(Array.from({ length: len }, (_, i) => i));
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();

  const handleDragStart = (i) => {
    console.log("dragStart", i);
    dragItem.current = i;
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = (i) => {
    dragItem.current = null;
    console.log("dragEnd", i);
    setDragging(false);
  };

  const handleDragEnter = (i) => {
    if (dragItem.current != i) {
      console.log("dragEnter", i);
      let copiedList = [...list];
      let copiedElem = copiedList[dragItem.current];
      copiedList.splice(dragItem.current, 1);
      copiedList.splice(i, 0, copiedElem);
      setList(copiedList);
      dragItem.current = i;
    }
  };

  const handlePreventDefault = (e) => {
    e.preventDefault();
  };

  const getStyles = (i) => {
    if (dragItem.current == i) return "listItems dragStart";
    return "listItems";
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="listLayout">
        {list.map((item, i) => (
          <div
            onDragStart={() => handleDragStart(i)}
            onDragEnd={() => handleDragEnd(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragOver={handlePreventDefault}
            draggable
            className={dragging ? getStyles(i) : "listItems"}
            key={`item-${item}`}
          >
            item-{item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
