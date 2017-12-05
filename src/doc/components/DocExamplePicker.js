import React from 'react';

function DocExamplePicker({componentName, examples, onPick}) {

  const exampleExample = `${componentName}.examples = [
    {
      name: "My example",
      propValues: {
        ...
      }
    }
  ];`;

  if (!examples || !examples.length) {
    return (
        <div className="DocExamplePicker">
        <h4>No examples</h4>
        <p>You can can easily add some by opening the file, pasting the code below at the end of the file buf before the propTypes, and filling in some propValues:</p>
        <pre dangerouslySetInnerHTML={{__html: exampleExample}}/>
        </div>
    );
  }

  const exampleJsx = examples
    .map((example, i) => {

      if (!example.name || !example.propValues) {
        throw new Error("Invalid example in " + componentName + ": All examples must include a name and some propValues");
      }

      return <button
        key={example.name + "-" + i}
        onClick={() => onPick(example)}
      >
        {example.name}
      </button>
    });

  return (
    <div className="DocExamplePicker">
      <h4>Example configurations:</h4>
      {exampleJsx}
    </div>
  );
}


export default DocExamplePicker;
