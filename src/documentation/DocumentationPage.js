import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'components/Button';
import SmallSpinner from "components/SmallSpinner";

function getPropType(prop) {
  var determinedType, isRequired;


  Object.keys(PropTypes).forEach((typeName) => {
    if (prop === PropTypes[typeName]) {
      determinedType = typeName;
      isRequired = false;
    }
  });

  Object.keys(PropTypes).forEach((typeName) => {
    if (prop === PropTypes[typeName].isRequired) {
      determinedType = typeName;
      isRequired = true;
    }
  });


  return {type: determinedType, isRequired};
}

function Knob({type, value, onChange}) {
  const handleChange = (event) => onChange(event.target.value);

  switch (type.type) {
    case "string":
      return <input type="text" value={value} onChange={handleChange}/>;
    case "bool":
      return <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)}/>;
    default:
      return "Unsupported propType (" + type.type + ")";
  }
}

class ComponentTestbed extends Component {
  constructor(props) {
    super(props);

    const {
      component: {
        examples,
        defaultProps
      }
    } = props;

    if (examples && examples.length) {
      this.state = {
        knobs: Object.assign({}, defaultProps, examples[0])
      };
    }
    else {
      this.state = {
        knobs: Object.assign({}, defaultProps)
      };
    }
  }

  setKnobValue(name, value) {
    const {
      knobs
    } = this.state;

    this.setState({
      knobs: Object.assign({}, knobs, {[name]: value})
    });
  }

  knobFor(propName) {
    const {
      component: {
        propTypes
      }
    } = this.props;

    const {
      knobs
    } = this.state;

    return (
      <div key={propName}>
        <label>
          {propName}
          <Knob
            type={propTypes && getPropType(propTypes[propName])}
            value={knobs[propName] || ""}
            onChange={(value) => this.setKnobValue(propName, value)}
          />
        </label>
      </div>
    );
  }

  genPropSyntax(props, defaultProps) {
    const result = [];
    Object.keys(props).forEach((name) => {
      if (props[name] !== defaultProps[name]) {
        result.push(name + "={" + JSON.stringify(props[name]) + "}\n");
      }
    });
    return result;
  }

  render() {
    const {
      component: Component,
      component: {
        displayName,
        name,
        description,
        examples,
        defaultProps
      }
    } = this.props;

    const {
      knobs
    } = this.state;

    const componentName = displayName || name;
    const knobControls = defaultProps && Object.keys(defaultProps).map((propName) => this.knobFor(propName));
    const componentJsx = <Component {...knobs}/>;

    const necessaryProps = this.genPropSyntax(knobs, defaultProps);

    return (
      <div>
        <h3>{componentName}</h3>
        {description}
        <h4>Examples:</h4>
        {componentJsx}
        {knobControls}
        <pre>
          <code>
           {necessaryProps}
          </code>
        </pre>
      </div>
    );
  }
}

function Documentation(
  {
    component
  }
) {
  return <ComponentTestbed component={component}/>
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
        ].map((component) => <Documentation component={component} key={component.displayName || component.name}/>)
      }
    </div>
  );
}

export default DocumentationPage;
