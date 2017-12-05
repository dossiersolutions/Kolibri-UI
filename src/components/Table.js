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

Table.propTypes = {
  /**
   * Available types: <code>striped</code>, <code>hover</code> (leave empty for basic styling/behaviour)
   */
  type: PropTypes.string,
  children: PropTypes.node
};

Table.defaultProps = {
  type: ""
};

Table.description = `
  A basic html table with some styling options.
`;

Table.examples = [
  {
    name: "hello",
    propValues: {
      children: (
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
          <tr>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
          </tr>
        </thead>
      )
    }
  }
];

export default Table;
