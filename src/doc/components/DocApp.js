import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import ColumnLayout from "components/ColumnLayout";
import ComponentPicker from "doc/components/ComponentPicker";
import ComponentDocPage from "doc/components/ComponentDocPage";
import DocWelcomePage from "doc/components/DocWelcomePage";


class DocApp extends Component
{
  render() {

    return (
      <div className="DocApp">

        <ColumnLayout desktopSize={1} tabletSize={6}>
          <header>
            <h1>Kolibri UI</h1>
            <p>
              <a href="https://github.com/dossiersolutions/kolibri-ui">Source on Github</a>
            </p>
          </header>
          <Switch>
            <Route path="/components/:component" component={ComponentPicker}/>
            <Route component={ComponentPicker}/>
          </Switch>
        </ColumnLayout>

        <ColumnLayout desktopSize={5} tabletSize={6}>
          <Switch>
            <Route path="/components/:component" component={ComponentDocPage}/>
            <Route component={DocWelcomePage}/>
          </Switch>

          {/* <ComponentDocumentation
              component={pickedComponent}
              key={Button.displayName || Button.name}
              /> */}
        </ColumnLayout>
      </div>
    );
  }
}

export default DocApp;
