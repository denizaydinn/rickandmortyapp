import React from 'react';

const Pagination = ({ totalCharacters, charactersPerPage, currentPage, onPageChange, onPageSizeChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <select onChange={(e) => onPageSizeChange(e.target.value)}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => onPageChange(number)}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
