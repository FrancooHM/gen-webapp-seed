#FVF: Fucking Very Fullstack webapp template

<strong><h1>Stack</h1></strong>
- express ES2015 + Mongoose : <strong>REST API</strong>
- Angular + Materialize + Auth0 : <strong>Backoffice Panel App</strong>
- React ES2015 + Webpack : <strong>Client App</strong>
- NPM + Bower : <strong>Dependencies</strong>
- Babel + Webpack : <strong>Transpiling and bundling</strong>

<strong><h1>Server side</h1></strong>
The express + Mongoose stack uses some specific ES2015 features like classes and imports. You can transpile the sources by:
- npm run build

Because of the transpilation, some of the files must be overwritten from the ./src and not directly from the server sources itself. Including:
- ./app.js (Main express file)
- ./models/*.js (Mongoose schemas)
- ./routes/*.js (Server routes)
- ./lib/*.js (Classes)

Each of these files corresponds to:
- ./src/express/app.js (Main express file)
- ./src/models/*.js (Mongoose schemas)
- ./src/routes/*.js (Server routes)
- ./src/classes/*.js (Classes)

<strong><h1>Client side</h1></strong>
<strong><h2>Backoffice Panel App</h2></strong>
The Angular panel client uses Auth0 authentication service so you must set your Auth0 app credentials at auth0-variables.js:
- AUTH0_CLIENT_ID
- AUTH0_DOMAIN

<strong><h2>Client App</h2></strong>
The React client needs to be traspiled because being React and having ES2015 features. Webpack is configured to do all this stuff and bundle everything in ./public/app/bundle.js.
If you want to and keep Webpack watching and the app running live reloaded you should run it by:
- cd public/app
- webpack-dev-server

Requirements:
- npm i -g webpack
- npm i -g webpack-dev-server (optional for client app serving with reactive building and hot reloading)
