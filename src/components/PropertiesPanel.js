// import React, { useState, useEffect } from "react";

// function PropertiesPanel({ selectedElement, updateElement, onClose }) {
//   // Define the local state for the selected element's properties
//   const [localProperties, setLocalProperties] = useState({
//     label: "",
//     placeholder: "",
//     required: false,
//     minLength: "",
//     maxLength: "",
//     validationPattern: "",
//   });

//   useEffect(() => {
//     if (selectedElement) {
//       setLocalProperties({
//         label: selectedElement.label || "",
//         placeholder: selectedElement.placeholder || "",
//         required: selectedElement.required || false,
//         minLength: selectedElement.minLength || "",
//         maxLength: selectedElement.maxLength || "",
//         validationPattern: selectedElement.validationPattern || "",
//       });
//     }
//   }, [selectedElement]);

//   // Handle changes to input fields and update local state
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLocalProperties((prev) => ({ ...prev, [name]: value }));
//   };

//   // Toggle the "required" checkbox
//   const toggleRequired = () => {
//     setLocalProperties((prev) => ({ ...prev, required: !prev.required }));
//   };

//   // Save changes to the parent and close the panel
//   const handleSave = () => {
//     if (selectedElement) {
//       updateElement({ ...selectedElement, ...localProperties });
//     }
//     onClose();
//   };

//   // If no selectedElement, render nothing
//   if (!selectedElement) return null;

//   return (
//     <div className="properties-panel">
//       <h3>Properties</h3>
//       <label>
//         Label Name:
//         <input
//           type="text"
//           name="label"
//           value={localProperties.label}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Placeholder:
//         <input
//           type="text"
//           name="placeholder"
//           value={localProperties.placeholder}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Required
//         <input
//           type="checkbox"
//           checked={localProperties.required}
//           onChange={toggleRequired}
//         />
//       </label>
//       <label>
//         Min Length:
//         <input
//           type="number"
//           name="minLength"
//           value={localProperties.minLength}
//           onChange={handleChange}
//           min="0"
//         />
//       </label>
//       <label>
//         Max Length:
//         <input
//           type="number"
//           name="maxLength"
//           value={localProperties.maxLength}
//           onChange={handleChange}
//           min="0"
//         />
//       </label>
//       <label>
//         Validation Pattern (Regex):
//         <input
//           type="text"
//           name="validationPattern"
//           value={localProperties.validationPattern}
//           onChange={handleChange}
//         />
//       </label>
//       <button onClick={handleSave}>Save</button>
//       <button onClick={onClose}>Close</button>
//     </div>
//   );
// }

// export default PropertiesPanel;
import React, { useState, useEffect } from "react";

function PropertiesPanel({ selectedElement, updateElement, onClose }) {
  const [localProperties, setLocalProperties] = useState({
    label: "",
    placeholder: "",
    required: false,
    minLength: "",
    maxLength: "",
    validationPattern: "",
    options: [], // Added to handle dropdown options
  });

  useEffect(() => {
    if (selectedElement) {
      switch (selectedElement.type) {
        case "Text Input":
        case "Textarea":
          setLocalProperties({
            label: selectedElement.label || "",
            placeholder: selectedElement.placeholder || "",
            required: selectedElement.required || false,
            minLength: selectedElement.minLength || "",
            maxLength: selectedElement.maxLength || "",
            validationPattern: selectedElement.validationPattern || "",
            options: selectedElement.options || [],
          });
          break;
        case "Checkbox":
        case "Radio":
        case "File Upload":
        case "Select Dropdown":
          setLocalProperties({
            label: selectedElement.label || "",
            required: selectedElement.required || false,
            options: selectedElement.options || [], // Dropdown options if type is "Select Dropdown"
          });
          break;
        default:
          setLocalProperties({
            label: selectedElement.label || "",
            required: selectedElement.required || false,
            options: selectedElement.options || [],
          });
      }
    }
  }, [selectedElement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProperties((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle the "required" checkbox
  const toggleRequired = () => {
    setLocalProperties((prev) => ({ ...prev, required: !prev.required }));
  };

  // Add an option to the dropdown
  const addOption = () => {
    setLocalProperties((prev) => ({
      ...prev,
      options: [...prev.options, { value: "", label: "" }],
    }));
  };

  // Remove an option from the dropdown
  const removeOption = (index) => {
    setLocalProperties((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  // Handle option changes
  const handleOptionChange = (index, name, value) => {
    const updatedOptions = [...localProperties.options];
    updatedOptions[index] = { ...updatedOptions[index], [name]: value };
    setLocalProperties((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleSave = () => {
    if (selectedElement) {
      updateElement({ ...selectedElement, ...localProperties });
    }
    onClose();
  };

  if (!selectedElement) return null;

  return (
    <div className="properties-panel">
      <h3>Properties</h3>
      <label>
        Label Name:
        <input
          type="text"
          name="label"
          value={localProperties.label}
          onChange={handleChange}
        />
      </label>

      {selectedElement.type !== "Radio Buttons" &&
        selectedElement.type !== "Checkbox" &&
        selectedElement.type !== "File Upload" &&
        selectedElement.type !== "Date Picker" &&
        selectedElement.type !== "Select Dropdown" && (
          <>
            <label>
              Placeholder:
              <input
                type="text"
                name="placeholder"
                value={localProperties.placeholder || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              Min Length:
              <input
                type="number"
                name="minLength"
                value={localProperties.minLength || ""}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Max Length:
              <input
                type="number"
                name="maxLength"
                value={localProperties.maxLength || ""}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Validation Pattern (Regex):
              <input
                type="text"
                name="validationPattern"
                value={localProperties.validationPattern || ""}
                onChange={handleChange}
              />
            </label>
          </>
        )}

      {/* Dropdown Options (only for select dropdown type) */}
      {selectedElement.type === "Select Dropdown" && (
        <>
          <div>
            <label>Options</label>
            {localProperties.options.map((option, index) => (
              <div key={index} className="option-input">
                <input
                  type="text"
                  placeholder="Option Label"
                  className="mb-2"
                  value={option.label || ""}
                  onChange={(e) =>
                    handleOptionChange(index, "label", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Option Value"
                  value={option.value || ""}
                  onChange={(e) =>
                    handleOptionChange(index, "value", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="box fw-bolder mb-2 bg-info"
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button
              className="box fw-bolder mb-2 bg-info"
              type="button"
              onClick={addOption}
            >
              Add Option
            </button>
          </div>
        </>
      )}

      <input
        type="checkbox"
        id="required"
        name="required"
        checked={!!localProperties.required}
        onChange={toggleRequired}
      />
      <label for="required">Required</label>
      <button className="box fw-bolder mb-2 bg-info me-3" onClick={handleSave}>
        Save
      </button>
      <button className="box fw-bolder mb-2 bg-info" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default PropertiesPanel;
