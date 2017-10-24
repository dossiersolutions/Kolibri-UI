import React, {Component} from 'react';
import Button from 'components/Button';
import SmallSpinner from "components/SmallSpinner";
import Table from "components/Table";
import ComponentTestbed from "documentation/ComponentTestbed";

/**
 */
function ComponentDocumentation(
  {
    component
  }
) {

  return (
    <div>
      <ComponentTestbed component={component}/>
    </div>
  );
}

export default ComponentDocumentation;
