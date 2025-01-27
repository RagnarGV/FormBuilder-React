import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const elements = [
  "Text Input",
  "Textarea",
  "Select Dropdown",
  "Checkbox",
  "Radio Buttons",
  "Date Picker",
  "File Upload",
];

function Sidebar() {
  return (
    <>
      <Droppable
        droppableId="sidebar"
        isDropDisabled
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided) => (
          <div
            className="sidebar bg-light border-end vh-100 position-fixed"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ width: "250px", padding: "15px" }}
          >
            <h3 className="text-center">Form Components</h3>
            {elements.map((element, index) => (
              <Draggable key={element} draggableId={element} index={index}>
                {(provided) => (
                  <div
                    className="fs-5 fw-bolder mb-2  p-4 bg-info"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {element}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
}

export default Sidebar;
