import React from "react";
import { Droppable } from "react-beautiful-dnd";
import FormElement from "./FormElement";

function FormCanvas({ formElements, setSelectedElement, setFormElements }) {
  // Function to remove an element from the canvas
  const handleRemoveElement = (id) => {
    setFormElements((prevElements) =>
      prevElements.filter((el) => el.id !== id)
    );
    setSelectedElement(null);
  };

  return (
    <Droppable
      droppableId="formCanvas"
      isDropDisabled={false}
      isCombineEnabled={false}
      ignoreContainerClipping={false}
    >
      {(provided) => (
        <div
          className="form-canvas"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>Form Canvas</h3>
          {formElements.length === 0 ? (
            <p>Drag components here to build your form.</p>
          ) : (
            formElements.map((element, index) => (
              <React.Fragment key={element.id}>
                <div key={element.id} className="box">
                  <div
                    className="col-10"
                    onClick={() => setSelectedElement(element)}
                  >
                    <div>
                      <span className="me-5">{element.type}</span>

                      <span>{element.label}</span>
                    </div>
                    <div>
                      <FormElement element={element} />
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                      className="box fw-bolder bg-danger float-end"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleRemoveElement(element.id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default FormCanvas;
