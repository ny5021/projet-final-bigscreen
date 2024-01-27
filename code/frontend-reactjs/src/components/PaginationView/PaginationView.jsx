import ReactPaginate from "react-paginate";

const PaginationView = ({ onPageChange, pageCount }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">>"
      nextLinkClassName="page-link"
      nextClassName="page-item"
      pageLinkClassName="page-link"
      activeLinkClassName="active"
      activeClassName="active"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<<"
      previousLinkClassName="page-link"
      previousClassName="page-item"
      pageClassName="page-item"
      containerClassName="pagination pagination-sm"
    />
  );
};

export default PaginationView;
