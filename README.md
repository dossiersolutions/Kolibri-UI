# Kolibri UI

**User interface component library**

---

**[Component Documentation](https://dossiersolutions.github.io/kolibri-ui/)**

Kolibri UI contains presentational React components that we use to make Dossier ProFile. It also contains a documentation app, a test suite, and a hot-reloading server for developers.

Almost all of this is provided through [create-react-app](https://github.com/facebookincubator/create-react-app). This means we don't have to maintain a build configuration, which saves a lot of work for us, will still providing an awesome development environment.


## Usage

Add as dependency: `yarn add kolibri-ui` or `npm install kolibri-ui`

Import component: `import {SmallSpinner} from "kolibri-ui/components/SmallSpinner";`

Import less for component: `@import "~kolibri-ui/styles/components/SmallSpinner";`

Import less for all components: `@import "~kolibri-ui/styles/main";`

#### Variables supported by less:

TODO


## Developing

### Getting started

- Clone this repo using git
- Install [yarn](https://yarnpkg.com) if you don't have it
- Run `yarn install` inside the kolibri-ui folder

### Commands

- `yarn run` shows a list of the available commands
- `yarn run start` runs the hot reloading server
- `yarn run watch-css` live-rebuilds the less-files
- `yarn run test` runs the test suite
- `yarn run build-app` builds the documentation app
- `yarn run build-lib` builds the component library
- `yarn deploy` deploys the documentation app to Github Pages

Whatever you do, DO NOT RUN `yarn run eject` . The whole point of using create-react-app is to not deal with configuration. At least ask me (jbe) first!

### Testing

Testing is provided by create-react-app, and uses [Jest](https://facebook.github.io/jest/). See this link for documentation on how to write tests, expectations, mocks and so on.

## Documentation

Because this project uses create-react-app to provide its features, [almost everything is documented there](https://github.com/facebookincubator/create-react-app). They also have instructions for how to migrate to newer versions.
