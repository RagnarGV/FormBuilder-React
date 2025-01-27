import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveForm, updateForm } from "../utils/formUtils";
// Configure Axios to include the CSRF token
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

axios.defaults.withCredentials = false;
function PreviewModal({
  isOpen,
  formElements,
  setFormElements,
  onClose,
  editingFormId,
  setEditingFormId,
  setFormList,
  editingFormTitle,
}) {
  const [formData, setFormData] = useState({});
  const [formTitle, setFormTitle] = useState("");
  useEffect(() => {
    if (isOpen) {
      const initialData = {};
      formElements.forEach((element) => {
        initialData[element.id] = { element, value: "" };
      });
      setFormData(initialData);
      setFormTitle(editingFormTitle);
    }
  }, [isOpen, formElements]);
  const handleInputChange = (id, element, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: { element, value },
    }));
  };

  const handleFormTitle = (e) => {
    setFormTitle(e.target.value);
  };

  const renderPreviewElement = (element) => {
    const formElement = formData[element.id] || {};

    switch (element.type) {
      case "Text Input":
        return (
          <input
            type="text"
            placeholder={element.placeholder || ""}
            required={element.required || false}
            minLength={element.minLength || undefined}
            maxLength={element.maxLength || undefined}
            pattern={element.validationPattern || undefined}
            value={formElement.value || ""}
            onChange={(e) =>
              handleInputChange(element.id, element, e.target.value)
            }
            className="form-control"
          />
        );
      case "Textarea":
        return (
          <textarea
            placeholder={element.placeholder || ""}
            required={element.required || false}
            minLength={element.minLength || undefined}
            maxLength={element.maxLength || undefined}
            value={formElement.value || ""}
            onChange={(e) =>
              handleInputChange(element.id, element, e.target.value)
            }
            className="form-control"
          ></textarea>
        );
      case "Select Dropdown":
        return (
          <select
            value={formElement.value || ""}
            onChange={(e) =>
              handleInputChange(element.id, element, e.target.value)
            }
            className="form-control"
          >
            <option value="" disabled>
              {element.placeholder || "Select an option"}
            </option>
            {element.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "Checkbox":
        return (
          <div className="form-check">
            <input
              type="checkbox"
              required={element.required || false}
              checked={!!formElement.value}
              onChange={(e) =>
                handleInputChange(element.id, element, e.target.checked)
              }
              className="form-check-input"
            />
            <label className="form-check-label">{element.label}</label>
          </div>
        );
      case "Radio Buttons":
        return (
          <div>
            <input
              type="radio"
              name={`radio-${element.id}`}
              value={element.label}
              onChange={(e) =>
                handleInputChange(element.id, element, e.target.value)
              }
              className="form-check-input"
            />
          </div>
        );
      case "Date Picker":
        return (
          <input
            type="date"
            required={element.required || false}
            value={formElement.value || ""}
            onChange={(e) =>
              handleInputChange(element.id, element, e.target.value)
            }
            className="form-control"
          />
        );
      case "File Upload":
        return (
          <input
            type="file"
            value={formElement.value || ""}
            onChange={(e) =>
              handleInputChange(
                element.id,
                element,
                e.target.files[0]?.name || ""
              )
            }
            className="form-control"
          />
        );
      default:
        return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    saveForm(e, formTitle, formData, setFormList, onClose, setFormElements);
  };

  const saveUpdatedForm = async (e) => {
    e.preventDefault();
    updateForm(
      e,
      formTitle,
      formData,
      setFormList,
      onClose,
      setFormElements,
      editingFormId,
      setEditingFormId
    );
  };

  return (
    <div
      className={`modal fade box ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog box">
        <div className="modal-content box">
          <div className="modal-header">
            <h5 className="modal-title">Form Preview</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={editingFormId ? saveUpdatedForm : handleSubmit}>
              <label className="form-label">Form Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={handleFormTitle}
                required
                className="form-control mb-3"
              />
              {formElements.map((element) => (
                <div key={element.id} className="form-preview-element mb-3">
                  <label className="form-label">{element.label}</label>
                  {renderPreviewElement(element)}
                </div>
              ))}

              <button type="submit" className="box fw-bolder bg-primary me-3">
                Save
              </button>
              <button
                type="button"
                onClick={editingFormId ? saveUpdatedForm : handleSubmit}
                className="box fw-bolder bg-primary "
              >
                Save without testing
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
