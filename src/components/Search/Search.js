import React from "react";
import PropTypes from "prop-types";

export const Search = ({ handleNameSearchChange, nameSearch }) => (
  <div className="flex-grow-1 mx-lg-3 mb-4 mb-lg-0">
    <input
      type="text"
      placeholder="Поиск по названию репозитория"
      onChange={e => handleNameSearchChange(e.target.value)}
      className="form-control"
      value={nameSearch}
    />
  </div>
);

Search.propTypes = {
  nameSearch: PropTypes.string,
  handleNameSearchChange: PropTypes.func
};
