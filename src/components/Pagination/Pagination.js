import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-pagination-bootstrap";

export const AppPagination = ({
  currentPage = 0,
  itemsPerPage,
  total = 0,
  handlePageChange
}) =>
  total ? (
    <div className="d-flex justify-content-center">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={total >= 1000 ? 1000 : total} // После 1000 запросы не возвращают данные
        pageRangeDisplayed={5}
        onChange={pageNumber => {
          handlePageChange(pageNumber);
        }}
      />
    </div>
  ) : null;

AppPagination.propTypes = {
  currentPage: PropTypes.number,
  total: PropTypes.number,
  itemsPerPage: PropTypes.number,
  handlePageChange: PropTypes.func
};
