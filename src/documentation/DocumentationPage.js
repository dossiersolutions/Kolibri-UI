import React, {Component} from 'react';
import Button from 'components/Button';
import SmallSpinner from "components/SmallSpinner";
import Table from "components/Table";
import ComponentTestbed from "documentation/ComponentTestbed";

/**
*/
function Documentation(
  {
    component,
    component: {
      displayName,
      name,
      description
    }
  }
) {

  const componentName = displayName || name;

  return (
    <div>
        <h3>{componentName}</h3>
        {description}
        <ComponentTestbed component={component}/>
    </div>
  );
}


function DocumentationPage() {
  return (
    <div className="DocumentationPage">
      <p>
        <a href="https://github.com/dossiersolutions/kolibri-ui">Kolibri UI on Github</a>
      </p>
      <p>
        Some test components:
      </p>
      {
        [
          Button,
          SmallSpinner,
          Table
        ].map((component) =>
          <Documentation
            component={component}
            key={component.displayName || component.name}
          />)
      }
    </div>
  );
}

export default DocumentationPage;
