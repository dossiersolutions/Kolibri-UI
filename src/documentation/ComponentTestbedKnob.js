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
    defaultValue,
    value,
    onChange
  }
) {
  const handleChange = (event) => onChange(event.target.value);

  switch (introspection.kind) {
    case "node":
      return <textarea onChange={handleChange}>
        {value}
      </textarea>;

    case "string":
      return <input type="text" value={value || ""} onChange={handleChange}/>;

    case "bool":
      return <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)}/>;

    case "oneOf":
      const radios = introspection.arg.map((v, i) => (
        <label key={scopeName + "[" + i + "]"}>
          <input
            type="radio"
            name={scopeName + "-radio"}
            checked={v === value}
            onChange={() => onChange(v)}
          />
          <code>{JSON.stringify(v)} </code>
        </label>
      ));

      const canBeOmitted = !defaultValue && !introspection.isRequired;

      const togglerJsx = canBeOmitted && (
        <label>
          <input
            type="checkbox"
            checked={!!value}
            onChange={() => onChange(!value && (defaultValue || introspection.arg[0]))}
          />
          Enabled
        </label>
      );

      return (
        <div>
          {togglerJsx}
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
      return null;

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
