import React from 'react';
import docComponents from "doc/docComponents";
import ComponentTestbed from "doc/components/ComponentTestbed";

function ComponentDocPage({
  match: {
    params: {
      component
    }
  }
}) {

  const selectedComponent = docComponents[component];

  if (!selectedComponent) {
    return (
      <p>
        Component not found: {component}
      </p>
    );
  }

  return (
    <div className="ComponentDocPage">
      <ComponentTestbed component={selectedComponent}/>
    </div>
  );
}

export default ComponentDocPage;
