import React from "react";
import { deleteFormbyId } from "../utils/formUtils";
function FormsTable({ formList, setFormList, onEditForm }) {
  const deleteForm = async (formId) => {
    deleteFormbyId(formId, setFormList);
  };

  const editForm = (formId) => {
    onEditForm(formId); // Trigger the onEditForm callback
  };

  return (
    <div className="table-responsive mt-5">
      <h3>Saved Forms</h3>
      <table className="box table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Form Name</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formList.length > 0 ? (
            formList.map((form, index) => (
              <tr key={form.id}>
                <td>{index + 1}</td>
                <td>{form.form_name}</td>
                <td>{new Date(form.created_at).toLocaleString()}</td>
                <td>
                  <button
                    className="box fw-bolder mb-2 bg-primary me-2"
                    onClick={() => editForm(form.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="box fw-bolder mb-2 bg-danger"
                    onClick={() => deleteForm(form.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No forms available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FormsTable;
