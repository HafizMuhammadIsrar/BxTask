import React, { useState } from "react";
import AddModal from "./AddModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {" "}
      <div className=" flex bg-[#435d7d] p-5 text-white justify-between items-center">
        <div className="title text-[30px] font-semibold ">Books Portal</div>
        <div className="button  ">
          {/* <button className=" bg-[#dc3545] px-3 py-1 ">Delete</button> */}
          <button className=" bg-[#28a745] px-3 py-1 " onClick={openModal}>
            Add Book{" "}
          </button>
        </div>
      </div>
      <AddModal isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
    </>
  );
};

export default Header;
