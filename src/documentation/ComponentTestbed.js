import React, {Component} from 'react';
import PropTypes from "introspectable-proptypes";
import {renderToStaticMarkup} from 'react-dom/server';
import ComponentTestbedKnob from "documentation/ComponentTestbedKnob";
import Table from "components/Table";
import ColumnLayout from "components/ColumnLayout";

class ComponentTestbed extends Component {
  constructor(props) {
    super(props);

    const {
      component: {
        examples,
        defaultProps,
        displayName,
        name,
        description
      }
    } = props;

    const initialKnobSettings = examples && examples.length && examples[0].values;

    this.state = {
      knobSettings: Object.assign({}, initialKnobSettings || defaultProps),
      useSalvia: true
    };
  }

  setKnobValue(name, value) {
    const {
      knobSettings
    } = this.state;

    this.setState({
      knobSettings: Object.assign({}, knobSettings, {[name]: value})
    });
  }

  getPropSyntax(componentName, props, defaultProps) {
    let propStr = "";
    Object.keys(props).forEach((name) => {
      if (name !== "children" && props[name] !== defaultProps[name]) {
        propStr += "  " + name + "={" + JSON.stringify(props[name]) + "}\n";
      }
    });
    return props.children
         ? "<" + componentName + "\n" + propStr + "/>\n  " + renderToStaticMarkup(props.children) +
           "\n</" + componentName + ">"
         : "<" + componentName + "\n" + propStr + "\n/>";
  }

  render() {
    const {
      component: ExaminedComponent,
      component: {
        displayName,
        name,
        description,
        examples,
        propTypes,
        defaultProps
      }
    } = this.props;

    const {
      knobSettings,
      useSalvia
    } = this.state;

    const componentName = displayName || name;

    let knobsJsx;

    if (propTypes) {
      const knobControls = Object.keys(propTypes).map((propName) => {

        const introspection = propTypes && propTypes[propName].introspection;
        const defaultValue = defaultProps && defaultProps[propName];

        return (
          <tr key={propName}>
            <td>
              <code>{propName}</code>
            </td>
            <td>
              <code>{introspection.kind} {introspection.isRequired && "(required)"}</code>
            </td>
            <td>
              <a
                href="#"
                onClick={(e) => e.preventDefault() || this.setKnobValue(propName, defaultValue)}
              >
                <code>{JSON.stringify(defaultValue)}</code>
              </a>
            </td>
            <td>
              <ComponentTestbedKnob
                scopeName={propName}
                introspection={introspection}
                value={knobSettings[propName]}
                defaultValue={defaultValue}
                onChange={(value) => this.setKnobValue(propName, value)}
              />
            </td>
          </tr>
        );
      });

      knobsJsx = (
        <Table>
          <tbody>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Playground</th>
            </tr>
            {knobControls}
          </tbody>
        </Table>
      );
    }
    else
    {
      knobsJsx = <p>This component does not have any PropTypes defined.</p>
    }

    const exampleButtonsJsx = examples && examples.map((example, i) => {
      const name = example.name || "(no name)"

      return (
        <button
          key={name + "-" + i}
          onClick={() => this.setState({knobSettings: example.values})}
        >
          {name}
        </button>
      );
    });


    return (
      <div>
        <div style={{ margin: "2em 0em"}}>

          <ColumnLayout desktopSize={3}>
            <h3>{componentName}</h3>
            <p>{description}</p>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={useSalvia}
                  onChange={() => this.setState({useSalvia: !useSalvia})}
                />
                Use Salvia
              </label>
              <div>
                <p>
                  <strong>Examples:</strong>
                </p>
                {exampleButtonsJsx}
              </div>
            </div>

          </ColumnLayout>

          <ColumnLayout desktopSize={3}>
            <div style={{padding: "2em", backgroundColor: "#eee"}}>
              <div className={useSalvia ? "salvia" : null}>
                <ExaminedComponent {...knobSettings}/>
              </div>
              <hr style={{margin: "2em 0", border: "1px solid #ddd"}}/>
              <pre>
                <code>
                  {this.getPropSyntax(componentName, knobSettings, defaultProps)}
                </code>
              </pre>
            </div>
          </ColumnLayout>
        </div>


        {knobsJsx}

      </div>
    );
  }
}

ComponentTestbed.propTypes = {
  component: PropTypes.func.isRequired
};

export default ComponentTestbed;
