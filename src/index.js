import React from 'react';
import ReactDOM from 'react-dom';
import './transpiled_cache/main.css';

import DocumentationPage from "documentation/DocumentationPage";

function App() {
  return (
    <DocumentationPage/>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
