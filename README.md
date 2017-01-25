# Gulp + Angular Kit

Production-ready starter kit for Angular projects

### Node Modules

- Gulp + Plugins
- Babel
- BrowserSync
- RunSequence

### Bower Components

- Angular
- Angular Route
- Angular Animate
- Angular Sanitize
- Angular UI Bootstrap
- Moment
- Lodash

# Installation
_____

**Contributing to this project:**

`npm install && bower install` - install dependencies

**Starting a new project:**

`npm run kit` - install dependencies & remove git

**One step copy & paste install:**

This will clone the repo, rename the project to "myWebApp" and install everything you'll need.

`git clone https://github.com/worldmedia/wmi-angular-kit.git && mv wmi-angular-kit/ myWebApp && cd myWebApp && npm run kit`

# Usage
_____

Update the following naming conventions:

**src/app.js**: `const _MODULE = 'your-app-name';`

**gulpfile.js**: Change `app.module` to `'your-app-name'`

**/src/index.html**: `ng-app="your-app-name"`

# Serve
_____

`gulp serve`
