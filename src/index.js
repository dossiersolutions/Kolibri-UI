import React from 'react';
import ReactDOM from 'react-dom';
import './transpiled_cache/main.css';

import SmallSpinner from "./components/SmallSpinner";

function App() {
  return (
    <div>
      <p>
        <a href="https://github.com/dossiersolutions/kolibri-ui">Kolibri UI on Github</a>
      </p>
      <p>
        Hello, I'm a test component: <SmallSpinner/>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
