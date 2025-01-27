import axios from "axios";

export const setCsrfToken = async () => {
  try {
    // Request the CSRF token from the Laravel backend
    const response = await axios.get(
      "http://127.0.0.1:8000/sanctum/csrf-cookie",
      {
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );

    // If the response contains a CSRF token, set it in the headers
    const csrfToken = response.data.csrfToken;

    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

export const saveForm = async (
  e,
  formTitle,
  formData,
  setFormList,
  onClose,
  setFormElements
) => {
  e.preventDefault();
  await setCsrfToken();
  try {
    const formDatas = {
      form_name: formTitle,
      form_data: formData,
    };

    const response = await axios.post("http://127.0.0.1:8000/save", formDatas);

    fetchForms(setFormList);
    setFormElements([]);
    onClose(); // Close the modal after submission
  } catch (error) {
    console.error(
      "Error submitting the form:",
      error.response || error.message
    );
  }
};
export const updateForm = async (
  e,
  formTitle,
  formData,
  setFormList,
  onClose,
  setFormElements,
  editingFormId,
  setEditingFormId
) => {
  e.preventDefault();
  await setCsrfToken();
  try {
    const updatedForm = {
      form_name: formTitle, // Replace with the actual form name
      form_data: formData,
    };

    await axios.put(
      `http://127.0.0.1:8000/update/${editingFormId}`,
      updatedForm
    );

    alert("Form updated successfully!");
    setEditingFormId(null); // Reset the editing form ID
    fetchForms(setFormList);
    setFormElements([]);
    onClose();
  } catch (error) {
    console.error("Error updating form:", error);
    alert("Failed to update the form. Please try again.");
  }
};

export const fetchForms = async (setFormList) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/list");
    setFormList(response.data); // Assuming the API returns an array of forms
  } catch (error) {
    console.error("Error fetching forms:", error);
  }
};

export const getFormById = async (
  formId,
  setEditingFormId,
  setFormElements,
  setEditingFormTitle
) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/forms/${formId}`);
    const formTitle = response.data.form_name;
    const formData = response.data.form_data;

    // Map the form data to formElements
    const mappedElements = Object.keys(formData).map((key) => {
      const elementData = formData[key].element;
      return {
        id: parseInt(key, 10), // Convert the ID to a number
        type: elementData.type,
        label: elementData.label,
        required: elementData.required,
        placeholder: elementData.placeholder || "",
        minLength: elementData.minLength || null,
        maxLength: elementData.maxLength || null,
        validationPattern: elementData.validationPattern || null,
        options: elementData.options || [],
      };
    });
    setEditingFormTitle(formTitle);
    setEditingFormId(formId);
    setFormElements(mappedElements);
  } catch (error) {
    console.error("Error fetching form:", error);
    alert("Failed to fetch the form. Please try again.");
  }
};

export const deleteFormbyId = async (formId, setFormList) => {
  try {
    const confirmation = window.confirm(
      "Are you sure you want to delete this form?"
    );
    if (!confirmation) return;
    await setCsrfToken();
    // API call to delete the form
    await axios.delete(`http://127.0.0.1:8000/delete/${formId}`);

    // Update the form list after deletion
    setFormList((prevList) => prevList.filter((form) => form.id !== formId));
    alert("Form deleted successfully!");
  } catch (error) {
    console.error("Error deleting form:", error);
    alert("Failed to delete the form. Please try again.");
  }
};
