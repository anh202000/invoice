import React, { useEffect, useState } from 'react';

const Pagination = ({ currentPage, pageSize, totalItems, onPageChange }: any) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const maxDisplayedPages = 6;
  const halfDisplayedPages = maxDisplayedPages / 2;

  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(
    Math.min(totalPages, maxDisplayedPages)
  );

  const handlePageChange = (pageNumber: any) => {
    const newStartPage = Math.max(
      1,
      Math.min(pageNumber - halfDisplayedPages, totalPages - maxDisplayedPages + 1)
    );
    const newEndPage = Math.min(
      totalPages,
      Math.max(pageNumber + halfDisplayedPages, maxDisplayedPages)
    );
    setStartPage(newStartPage);
    setEndPage(newEndPage);
    onPageChange(pageNumber);
  };

  const createPageItems = () => {
    const items = [];
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          className={i === Number(currentPage) ? 'border border-4 border-danger' : 'border-secondary'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return items;
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(Number(currentPage) + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageChange(Number(currentPage) - 1);
    }
  };

  return (
    <div className="text-center">
      <button
        className="prev"
        disabled={currentPage === 1}
        onClick={handlePrevClick}
      >
        &lt;
      </button>
      {createPageItems()}
      <button
        className="next"
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
