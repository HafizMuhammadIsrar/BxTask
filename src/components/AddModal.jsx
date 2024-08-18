import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleReload } from "../redux/reloadSlice";

const AddModal = ({
  isOpen,
  closeModal,
  title,
  author,
  no_of_pages,
  published_at,
  id,
}) => {
  const [books, setbooks] = useState();
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title must be at least 2 characters long"),
    author: Yup.string()
      .required("Author is required")
      .min(2, "Author must be at least 2 characters long"),
    no_of_pages: Yup.number()
      .required("Number of pages is required")
      .positive("Number of pages must be a positive number")
      .integer("Number of pages must be an integer"),
    published_at: Yup.date().required("Date is required"),
  });

  const dispatch = useDispatch();

  const initialValues = {
    title: title || "",
    author: author || "",
    no_of_pages: no_of_pages || "",
    published_at: published_at || "",
  };

  const postBooks = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/books/post`,
        data
      );

      console.log("Books", response.data);
      if (response.status === 201) {
        dispatch(toggleReload());
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const updateBooks = async (data, id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/books/update/${id}`,
        data
      );

      console.log("Books", response.data);
      dispatch(toggleReload());
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const onSubmit = (values, { resetForm }) => {
    console.log(values);

    if (id) {
      updateBooks(values, id);
    } else {
      postBooks(values);
    }
    resetForm();
    closeModal();
  };

  return (
    <div>
      {isOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Book
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {() => (
                    <Form className="flex flex-col gap-2 text-left">
                      <div>
                        <label>Title</label>
                        <Field
                          name="title"
                          type="text"
                          placeholder="Add Title"
                          className="w-full border p-2 focus:outline-none"
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                      <div>
                        <label>Author</label>
                        <Field
                          name="author"
                          type="text"
                          placeholder="Add Author"
                          className="w-full border p-2 focus:outline-none"
                        />
                        <ErrorMessage
                          name="author"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                      <div>
                        <label>No_of_pages</label>
                        <Field
                          name="no_of_pages"
                          type="number"
                          placeholder="Add No_of_pages"
                          className="w-full border p-2 focus:outline-none"
                        />
                        <ErrorMessage
                          name="no_of_pages"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                      <div>
                        <label>Date</label>
                        <Field
                          name="published_at"
                          type="date"
                          placeholder="Add Date"
                          className="w-full border p-2 focus:outline-none"
                        />
                        <ErrorMessage
                          name="published_at"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="text-white ms-[16px] bg-[#28a745] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddModal;
