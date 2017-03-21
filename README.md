# Productivity Application

Kanban style, Trello inspired Productivity application built using the awesome React, AntD, Apollo Client and other fantastic libraries.



![ScreenShot](https://s3.ap-south-1.amazonaws.com/productivityapp/sc.png?ref=2)


## Demo


Host | URL
------------ | -------------
**Amazon S3** | http://proapp.s3-website.ap-south-1.amazonaws.com
**Netlify** | http://productivity.netlify.com


#### Demo Account

**Email Address:** `demo@demo.com`  
**Password:** `P@sSw0rd@123`


*All of the demo deployments use the same backend/api so you can use these interchangeably*


## Installation

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dhruv-kumar-jha/productivity-frontend)


Just clone this repo and then run

```javascript
$ yarn install // or npm install
```

to install all the dependencies.


### After installing

1. Edit `/src/index.ejs` file and change the API endpoint url **`window.__API__ENDPOINT__`** with the API endpoint where you have setup the backend of this app.
2. Run `yarn build:production` or `npm run build:production` to make a production build of the app.

Now you can access the application by running `yarn start:production` or `npm run start:production`
**Or** you can deploy the **public** folder on **S3**, **Netlify** or any static host and access the app from there.

> The recommended way is to use Static Host/CDN to host the application instead of running it via web server.


## Features

Status | Feature | Description
------------ | ------------ | -------------
[x] | Static Application | You can host the app on any Static Host/CDN instead of a server
[x] | Boards | Boards are the gateway to your lists, You can have as many boards as you want
[x] | Lists | Each list can easily be re-arranged and updated, You can add multiple cards to a list
[x] | Cards | Cards are the meat of this app, you can add as many cards as you like, re-arrange them, drag them from one list to another, etc
[x] | Todo List | Each card has Todo List tab, There you can add your todo list items, update them, mark them as completed and so on.
[x] | Card Meta | Each card has meta section where you can specify Duedate, Link, Image and the appropriate icons will appear below card in the list view., If image URL is specified, Image will appear above the card title.
[x] | Custom Background | Each board can have different Background color, To change the background color just edit the board by clicking the Edit icon below the header and there you can update board details along with background color.
[x] | Settings | You can update your details, password in the settings page
[x] | Deploy to Netlify | Added 1 click deploy to Netlify button.


