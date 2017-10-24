import React from 'react';
import ReactDOM from 'react-dom';
import './transpiled_cache/main.css';

import Documentation from "documentation/Documentation";

function App() {
  return (
    <Documentation/>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
