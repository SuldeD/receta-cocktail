import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`cursor-pointer pagination-item w-[30px] h-[40px] bg-gray-200 pointer-events-auto flex justify-center items-center ${
            i === currentPage ? "bg-teal-600" : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="w-full flex justify-center pagination mt-[20px]">
      <ul className="pagination-list flex">
        <li
          className={`w-[50px] h-[40px] flex justify-center items-center rounded-l-lg cursor-pointer pagination-item bg-gray-200 mr-[2px] ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          prev
        </li>
        {renderPageNumbers()}
        <li
          className={`w-[50px] h-[40px] flex justify-center items-center rounded-r-lg cursor-pointer pagination-item bg-gray-200 ml-[2px] ${
            currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
