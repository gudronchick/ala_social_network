import { connect } from "react-redux";
import { getActiveItem, getPageCount } from "../../../selectors/selectors";
import Pagination from "./Pagination";

const mapStateToProps = (state) => {
  return {
    pageCount: getPageCount(state),
    activeItem: getActiveItem(state),
  };
};

export default connect(mapStateToProps, {})(Pagination);
