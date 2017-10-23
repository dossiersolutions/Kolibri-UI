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
      /* console.log(value);*/

      const radios = introspection.arg.map((v, i) => {
        const oldValue = value && value[i];

        const handleChange = (event) => {
          const newValue = (value || []).slice();
          newValue[i] = !oldValue;
          onChange(newValue);
          /* console.log(i, v);*/
        };

        return (
          <label key={scopeName + "[" + i + "]"}>
            <input
              type="radio"
              name={scopeName + "-radio"}
              checked={oldValue}
              onChange={handleChange}
            />
            <code>{JSON.stringify(v)} </code>
          </label>
        );
      });

      return (
        <div>
          {radios}
        </div>
      );

    case "oneOfType":
      return introspection.arg.map((item, index) =>
        {
          const newScope = scopeName + "[" + index + "]";

          return (
            <ComponentTestbedKnob
              key={newScope}
              scopeName={newScope}
              introspection={item.introspection || item}
              value={value[index]}
              onChange={(value) => {
                  const newVal = value.slice();
                  newVal[index] = value;
                  return newVal;
              }}
            />
          );
        }
      );

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
