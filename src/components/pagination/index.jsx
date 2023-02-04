import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  return (
    <div>
      <ReactPaginate
        pageCount={props.pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={props.handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      ;
    </div>
  );
};

export default Pagination;
