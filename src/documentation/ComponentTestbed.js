import React, {Component} from 'react';
import PropTypes from "introspectable-proptypes";
import ComponentTestbedKnob from "documentation/ComponentTestbedKnob";
import Table from "components/Table";

class ComponentTestbed extends Component {
  constructor(props) {
    super(props);

    const {
      component: {
        examples,
        defaultProps
      }
    } = props;

    this.state = {
      knobSettings: Object.assign({}, defaultProps)
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

  /* genPropSyntax(componentName, props, defaultProps) {
   *   const result = [];
   *   Object.keys(props).forEach((name) => {
   *     if (props[name] !== defaultProps[name]) {
   *       result.push(name + "={" + JSON.stringify(props[name]) + "}\n");
   *     }
   *   });
   *   return result;
   * }*/

  render() {
    const {
      component: Component,
      component: {
        displayName,
        name,
        propTypes,
        defaultProps
      }
    } = this.props;

    const {
      knobSettings
    } = this.state;

    const knobControls = Object.keys(propTypes).map((propName) =>
      <tr key={propName}>
        <td>
          <label>
            {propName}
          </label>
        </td>
        <td>
          <ComponentTestbedKnob
            scopeName={propName}
            introspection={propTypes && propTypes[propName].introspection}
            value={knobSettings[propName]}
            onChange={(value) => this.setKnobValue(propName, value)}
          />
        </td>
      </tr>
    );

    return (
      <div>
        <h4>Examples:</h4>
        <Component {...knobSettings}/>
        <Table>
          <tbody>
            {knobControls}
          </tbody>
        </Table>
      </div>
    );
  }
}

ComponentTestbed.propTypes = {
  component: PropTypes.func.isRequired
};

export default ComponentTestbed;
