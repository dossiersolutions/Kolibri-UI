import React, {Component} from 'react';
import Button from 'components/Button';
import SmallSpinner from "components/SmallSpinner";
import Table from "components/Table";
import ComponentTestbed from "documentation/ComponentTestbed";

const documentedComponents = [
  Button,
  SmallSpinner,
  Table
];

/**
*/
function ComponentDocumentation(
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

function ComponentPicker({onPick}) {

  const buttons = documentedComponents.map((component) => {
    const componentName = component.displayName || component.name;
    return (
      <span key={componentName}><button onClick={() => onPick(component)}>{componentName}</button> </span>
    );
  });

  return (
    <div>
      {buttons}
    </div>
  );
}

class Documentation extends Component
{
  constructor(props) {
    super(props);

    this.handlePickComponent = this.handlePickComponent.bind(this);

    this.state = {
      pickedComponent: Button
    };
  }

  handlePickComponent(pickedComponent) {
    this.setState({
      pickedComponent
    });
  }

  render() {

    const {
      pickedComponent
    } = this.state;

    return (
      <div className="DocumentationPage">
        <header>
          <h1>Kolibri UI</h1>
          <p>
            <a href="https://github.com/dossiersolutions/kolibri-ui">Kolibri UI on Github</a>
          </p>
        </header>

        <ComponentPicker onPick={this.handlePickComponent}/>

        <ComponentDocumentation
          component={pickedComponent}
          key={Button.displayName || Button.name}
        />
      </div>
    );
  }
}

export default Documentation;
