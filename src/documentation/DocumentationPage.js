import React from 'react';
import Button from 'widgets/Button';
import SmallSpinner from "components/SmallSpinner";


function DocumentationPage() {
  return (
    <div className="DocumentationPage">
      <p>
        <a href="https://github.com/dossiersolutions/kolibri-ui">Kolibri UI on Github</a>
      </p>
      <p>
        Some test components:
      </p>
      <SmallSpinner/>
      <Button>
        Hello!
      </Button>
    </div>
  );
}

export default DocumentationPage;
