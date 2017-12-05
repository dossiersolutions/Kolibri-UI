import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import './transpiled_cache/main.css';

import DocApp from "doc/components/DocApp";


ReactDOM.render((
    <HashRouter>
      <DocApp/>
    </HashRouter>
) , document.getElementById('root'));
