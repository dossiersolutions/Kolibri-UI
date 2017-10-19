import React from 'react';
import PropTypes from "introspectable-proptypes";

/**
  A component for entering input values that will be passed as component props, to see what
   happens to the component.
*/
function ComponentTestbedKnob(
  {
    scopeName,
    introspection,
    value,
    onChange
  }
) {
  const handleChange = (event) => onChange(event.target.value);

  switch (introspection.kind) {

    case "string":
      return <input type="text" value={value} onChange={handleChange}/>;

    case "bool":
      return <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)}/>;

    case "oneOf":
      return (
        <div>
          {introspection.arg.map((v) =>
            <label>
              <input type="radio" name="TODO" checked={false} onChange={(event) => undefined}/>
              <code>{JSON.stringify(v)} </code>
            </label>
          )}
        </div>
      );

    case "oneOfType":
      return introspection.arg.map((item, index) =>
        <ComponentTestbedKnob
          introspection={item.introspection || item}
          value={value[index]}
          onChange={(value) => {
            const newVal = value.slice();
            newVal[index] = value;
            return newVal;
          }}
        />);

    case "func":
      return "(func)"

    default:
      return "Unsupported propType (" + introspection.kind + ")";
  }
}

ComponentTestbedKnob.propTypes = {
  scopeName: PropTypes.string.isRequired,
  introspection: PropTypes.shape({kind: PropTypes.string.isRequired}).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
};

ComponentTestbedKnob.defaultProps = {
  value: undefined
};

export default ComponentTestbedKnob;
