import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AddModal from "./AddModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleReload } from "../redux/reloadSlice";
import IsDeleteModal from "./DeleteModal";
const Table = () => {
  const [books, setbooks] = useState();
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [no_of_pages, setNo_of_pages] = useState();
  const [published_at, setPublished_at] = useState();
  const reload = useSelector((state) => state.reload.isRelaod);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const openDeleteModal = () => setIsDelete(true);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeDeleteModal = () => setIsDelete(false);
  const dispatch = useDispatch();
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/fetch`);
      setbooks(response.data);

      console.log("Books", response.data);
      if (response.status === 200) {
        dispatch(toggleReload());
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const deleteBooks = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/books/delete/${id}`
      );
      if (response.status === 200) {
        fetchBooks(); // Reload the books data
      }
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  useEffect(() => {
    fetchBooks();
  }, [reload]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              title
            </th>
            <th scope="col" className="px-6 py-3">
              author
            </th>
            <th scope="col" className="px-6 py-3">
              no_of_pages
            </th>
            <th scope="col" className="px-6 py-3">
              published_at
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        {books?.map((item) => (
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item?.title}
              </th>

              <td className="px-6 py-4">{item?.author}</td>
              <td className="px-6 py-4">{item?.no_of_pages}</td>
              <td className="px-6 py-4">{item?.published_at}</td>
              <td className="px-6 py-4 flex space-x-4">
                <button
                  onClick={() => {
                    setId(item?._id);
                    setTitle(item?.title);
                    setAuthor(item?.author);
                    setNo_of_pages(item?.no_of_pages);
                    setPublished_at(item?.published_at);
                    openModal();
                  }}
                >
                  <FontAwesomeIcon color="orange" icon={faEdit} />
                </button>
                <button
                  onClick={() => {
                    openDeleteModal();
                    setId(item?._id);
                  }}
                >
                  <FontAwesomeIcon color="red" icon={faTrash} />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <AddModal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        id={id}
        title={title}
        author={author}
        no_of_pages={no_of_pages}
        published_at={published_at}
      />
      <IsDeleteModal
        id={id}
        closeDeleteModal={closeDeleteModal}
        isDelete={isDelete}
      />
    </div>
  );
};

export default Table;
