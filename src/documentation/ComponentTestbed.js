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
      <tr key={propName}>
        <td>
          <label>
            {propName}
          </label>
        </td>
        <td>
          <ComponentTestbedKnob
            introspection={propTypes && propTypes[propName].introspection}
            value={knobs[propName] || ""}
            onChange={(value) => this.setKnobValue(propName, value)}
          />
        </td>
      </tr>
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
        examples,
        defaultProps
      }
    } = this.props;

    const {
      knobs
    } = this.state;

    const knobControls = defaultProps && Object.keys(defaultProps).map((propName) => this.knobFor(propName));
    const componentJsx = <Component {...knobs}/>;

    const necessaryProps = this.genPropSyntax(knobs, defaultProps);

    return (
      <div>
        <h4>Examples:</h4>
        {componentJsx}
        <Table>
          <tbody>
            {knobControls}
          </tbody>
        </Table>
        <pre>
          <code>
           {necessaryProps}
          </code>
        </pre>
      </div>
    );
  }
}

export default ComponentTestbed;
