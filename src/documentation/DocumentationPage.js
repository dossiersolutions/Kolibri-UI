import React from 'react';
import Button from 'widgets/Button';
import SmallSpinner from "components/SmallSpinner";



function Documentation({component}) {

  const componentName = component.displayName || component.name;

  return (
  <div>
    <h3>{componentName}</h3>
    {component.description}
    <h4>Examples:</h4>
    {component.examples}
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
          SmallSpinner
        ].map((component) => <Documentation component={component}/>)
      }
    </div>
  );
}

export default DocumentationPage;
