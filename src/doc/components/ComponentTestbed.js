import React, {Component} from 'react';
import PropTypes from "introspectable-proptypes";
import {renderToStaticMarkup} from 'react-dom/server';
import Table from "components/Table";
import ColumnLayout from "components/ColumnLayout";
import ComponentTestbedKnob from "doc/components/ComponentTestbedKnob";
import DocExamplePicker from "doc/components/DocExamplePicker";


class ComponentTestbed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {
      component
    } = this.props;

    if (component !== nextProps.component) {
      this.initialize(nextProps);
    }
  }

  initialize(props) {
    const {
      component: {
        examples,
        defaultProps
      }
    } = props;

    const firstExampleValues = examples && examples.length && examples[0].propValues;

    this.setState({
      knobSettings: Object.assign({}, firstExampleValues || defaultProps),
      useSalvia: true
    });
  }

  setKnobValue(name, value) {
    const {
      knobSettings
    } = this.state;

    this.setState({
      knobSettings: Object.assign({}, knobSettings, {[name]: value})
    });
  }

  getPropSyntax(componentName, props, defaultProps={}) {
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

        if (!introspection) {
          return <p>Missing introspection for {componentName}.{propName}. Not using "prop-types" package?</p>
        }

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
                href="#setDefault"
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
              <th>Value</th>
            </tr>
            {knobControls}
          </tbody>
        </Table>
      );
    }
    else
    {
      knobsJsx = <p>{componentName} does not seem to have any props.</p>
    }


    return (
      <div className="ComponentTestbed">
        <div style={{ margin: "2em 0em"}}>

          <ColumnLayout desktopSize={3}>
            <div>
              <div className={useSalvia ? "salvia" : null}>
                <ExaminedComponent {...knobSettings}/>
              </div>
              <hr style={{margin: "2em 0", border: "1px solid #ddd"}}/>
              <pre className="component-code">
                <code>
                  {this.getPropSyntax(componentName, knobSettings, defaultProps)}
                </code>
              </pre>
            </div>
          </ColumnLayout>

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
                Salvia wrap
              </label>
            </div>

          </ColumnLayout>
        </div>

        <DocExamplePicker
          examples={examples}
          componentName={componentName}
          onPick={(example) => this.setState({knobSettings: example.propValues})}
        />

        {knobsJsx}

      </div>
    );
  }
}

ComponentTestbed.propTypes = {
  component: PropTypes.func.isRequired
};

export default ComponentTestbed;
