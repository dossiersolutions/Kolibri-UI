import React from "react";
import PropTypes from "introspectable-proptypes";

function Table({type, children}) {
  const types = type.split(" ");
  let tableClassName = "Table";
  if (type) {
    types.forEach((typeName) => {
      tableClassName += (" " + typeName + "-table");
    });
  }

  return (
    <table className={tableClassName} role="grid">
      {children}
    </table>
  );
}

Table.description = `
  A basic, styled html table with some styling options.
`;

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
