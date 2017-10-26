/**

 Development bundle configuration

 Since we are using un-ejected create-react-app (react-scripts),
 the deployed bundle is a minified production bundle by default.

 However, since this is a documentation app intended to be used by developers,
 we actually want to build it with NODE_ENV="development" and no minification.

 Therefore we use the dev config from react-scripts to build directly.

 */

require("react-scripts/config/env");

const defaultConfig = require("react-scripts/config/webpack.config.dev");

const config = Object.assign({}, defaultConfig);

config.output.publicPath = "/kolibri-ui";

module.exports = config;
