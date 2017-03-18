# Productivity Application
Productivity Application - Frontend

### Installation

Just clone this repo
and then do `yarn install` or `npm install` to install all the dependencies.

After installing

1. Edit `/src/index.ejs` file and change the API endpoint url **window.__API__ENDPOINT__** with the API endpoint where you have setup the backend of this app.
2. Run `yarn build:production` or `npm run build:production` to make a production build of the app.

Now you can access the application by doing `yarn start:production` or `npm run start:production` OR you can deploy the public folder on **S3** or any static host and access the app from there.
