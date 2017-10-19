import React from "react";
import PropTypes from "prop-types";

function Table() {
  const {
    type,
    children
  } = this.props;

  const types = _.split(type, " ");
  let tableClassName = "Table";
  if (type) {
    _.forEach(types, (typeName) => {
      tableClassName += (" " + typeName + "-table");
    });
  }

  return (
    <table className={tableClassName} role="grid">
      {children}
    </table>
  );
}

Table.propTypes = {
  /**
   * Available types: <code>striped</code>, <code>hover</code> (leave empty for basic styling/behaviour)
   */
  type: PropTypes.string
};

Table.defaultProps = {
  type: ""
};

export default Table;
