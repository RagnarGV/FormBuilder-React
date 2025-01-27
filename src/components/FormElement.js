import React from "react";

function FormElement({ element, onClick }) {
  const renderElement = () => {
    switch (element.type) {
      case "Text Input":
        return (
          <input
            type="text"
            className="form-control"
            placeholder={element.placeholder}
            required={element.required}
            minLength={element.minLength}
            maxLength={element.maxLength}
            pattern={element.validationPattern}
            onClick={onClick}
            disabled
          />
        );
      case "Textarea":
        return (
          <textarea
            placeholder={element.label}
            className="form-control"
            required={element.required}
            minLength={element.minLength}
            maxLength={element.maxLength}
            pattern={element.validationPattern}
            onClick={onClick}
            disabled
          />
        );
      case "Select Dropdown":
        return (
          <select className="form-control" disabled={element.disabled}>
            {element.options &&
              element.options.map((options) => (
                <option value={options.value}>{options.label}</option>
              ))}
            ;
          </select>
        );
      case "Checkbox":
        return (
          <label>
            <input type="checkbox" disabled />
          </label>
        );
      case "Radio Buttons":
        return (
          <label>
            <input type="radio" disabled />
          </label>
        );
      case "Date Picker":
        return <input type="date" className="form-control" disabled />;
      case "File Upload":
        return <input type="file" className="form-control" disabled />;
      default:
        return null;
    }
  };

  return (
    <div className="form-element" onClick={onClick}>
      {renderElement()}
    </div>
  );
}

export default FormElement;
