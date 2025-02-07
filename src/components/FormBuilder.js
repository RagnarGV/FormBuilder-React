import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import FormCanvas from "./FormCanvas";
import PropertiesPanel from "./PropertiesPanel";
import PreviewModal from "./PreviewModal";
import { DragDropContext } from "react-beautiful-dnd";
import FormsTable from "./FormsTable";
import { fetchForms, getFormById } from "../utils/formUtils";
function FormBuilder() {
  const [formElements, setFormElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formList, setFormList] = useState([]);
  const [editingFormId, setEditingFormId] = useState(null);
  const [editingFormTitle, setEditingFormTitle] = useState("");

  useEffect(() => {
    fetchForms(setFormList);
  }, []);

  const fetchFormById = async (formId) => {
    getFormById(formId, setEditingFormId, setFormElements, setEditingFormTitle);
  };

  const onClearCanvas = async () => {
    setEditingFormId(null);
    setEditingFormTitle("");
    setSelectedElement(null);
    setFormElements([]);
  };

  const onDragEnd = (result) => {
    const { destination } = result;

    // Dropped outside the canvas
    if (!destination || destination.droppableId !== "formCanvas") return;

    // Add a new element to the form canvas
    const newElement = {
      id: Date.now(),
      type: result.draggableId,
      label: result.draggableId,
      required: false,
    };
    setFormElements([...formElements, newElement]);
  };

  const updateElement = (updatedElement) => {
    const updatedFormElements = formElements.map((el) =>
      el.id === updatedElement.id ? updatedElement : el
    );
    setFormElements(updatedFormElements);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Sidebar />
        <div style={{ marginLeft: "250px", padding: "15px" }}>
          <FormCanvas
            formElements={formElements}
            setFormElements={setFormElements}
            setSelectedElement={setSelectedElement}
          />
        </div>
      </DragDropContext>
      <div style={{ marginLeft: "250px", padding: "15px" }}>
        <PropertiesPanel
          selectedElement={selectedElement}
          updateElement={updateElement}
          onClose={() => setSelectedElement(null)}
        />
        {formElements.length > 0 && (
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="box text-black fw-bolder bg-info mt-4 me-2"
          >
            Preview Form
          </button>
        )}
        <button
          onClick={() => onClearCanvas()}
          className="box text-black fw-bolder bg-info mt-4"
        >
          Clear Canvas
        </button>
        <PreviewModal
          isOpen={isPreviewOpen}
          formElements={formElements}
          setFormElements={setFormElements}
          onClose={() => setIsPreviewOpen(false)}
          editingFormId={editingFormId}
          setEditingFormId={setEditingFormId}
          setFormList={setFormList}
          editingFormTitle={editingFormTitle}
        />
        <div>
          <FormsTable
            formList={formList}
            setFormList={setFormList}
            onEditForm={fetchFormById}
          />
        </div>
      </div>
    </div>
  );
}

export default FormBuilder;
