# Productivity Application

Be More Productive!

![ScreenShot](public/images/screenshot.jpg)

This application was inspired by the awesome Trello and Kanban style of managing things. You can use this to manage anything and everything., This has lot of customizations available per board, list and card to make it your own.

I built this application using Progressive Enhancements in mind, Although not perfect the app works well in desktop, mobile and tablet devices., You can easily add this app to your mobile device (just open the url from mobile device) and use it directly without opening the browser.


## Demo


Host | URL
------------ | -------------
**Netlify** | https://productivity.netlify.com
**Amazon S3** | http://proapp.s3-website.ap-south-1.amazonaws.com
**Public Board Demo** | http://proapp.s3-website.ap-south-1.amazonaws.com/public/boards/58d383b20f4a2800178ef63e <br /> https://productivity.netlify.com/public/boards/58d383b20f4a2800178ef63e


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


### After installing the dependencies


1. Configure Backend API URL
	1. Either create a new Environment variable named **`API_ENDPOINT`** with its value as the Backend API URL, you can use `https://pro-app-api.herokuapp.com` for testing purposes. **OR**
	2. Edit `/src/index.ejs` file and change the API endpoint url **`window.__API__ENDPOINT__`** `https://pro-app-api.herokuapp.com` with the API endpoint where you have setup the backend of this app
2. Run `yarn build:production` or `npm run build:production` to make a production build of the app.


Now you can access the application by running `yarn start:production` or `npm run start:production`
**Or** you can deploy the **public** folder on **S3**, **Netlify** or any static host and access the app from there.

> The recommended way is to use Static Host/CDN to host the application instead of running it via web server.


## Features

Status | Feature | Description
------------ | ------------ | -------------
:white_check_mark: | Static Application | You can host the app on any Static Host/CDN instead of a server
:white_check_mark: | Boards | Boards are the gateway to your lists, You can have as many boards as you want
:white_check_mark: | Lists | Each list can easily be re-arranged and updated, You can add multiple cards to a list
:white_check_mark: | Cards | Cards are the meat of this app, you can add as many cards as you like, re-arrange them, drag them from one list to another, etc
:white_check_mark: | Todo List | Each card has Todo List tab, There you can add your todo list items, update them, mark them as completed and so on.
:white_check_mark: | Card Meta | Each card has meta section where you can specify Duedate, Link, Image and the appropriate icons will appear below card in the list view., If image URL is specified, Image will appear above the card title.
:white_check_mark: | Custom Background | Each board, list and card can have different Background color, Boards can have background images as well. To change the background color of board just edit the board by clicking the Edit icon below the header and there you can update board details along with background color.
:white_check_mark: | Settings | You can update your details, password and preferred language in the settings page
:white_check_mark: | Deploy to Netlify | Added 1 click deploy to Netlify button.
:white_check_mark: | Public Boards | Now you can make boards public, Public boards are accessible to all the users with the board URL., By default all boards are private.
:white_check_mark: | Code Splitting | Split the code into different files and only load those files when necessary., Enable tree shaking so we only include the code we're actually using in the app.
:white_check_mark: | Lists Spacing | Now you can add spaces between lists, You can add space before and after a list. (might be useful to some of you)
:white_check_mark: | Customizations | Now you have more control over specifying background colors, you can either select it using colorpicker or enter it manually, it can be `Color Names`, `HEX`, `RGB` or `RGBA`.
:white_check_mark: | Multiple Languages | Added support for multiple languages, Current translation of **Chinese** langugae is done using Google Translate.
:white_check_mark: | Card Positioning | Now you can top and bottom margin to any card, Giving your more flexibility and control over the UI.
:white_check_mark: | Loading Indicator | Since the project makes use of Webpack code splitting, Sometimes it felt like clicks were unresponsive, Now you can see loading message whenever new script(s) is being loaded.
:white_check_mark: | GraphQL Fragments | Have started using fragments wherever necessary, This will help with app performance when you have lots of Boards.
:white_check_mark: | Board Groups | This will help you with Grouping different boards together and I personally think this will benefit us a lot, You can Add groups by going to the settings page.
:white_check_mark: | Responsive | The app is responsive in mobile devices (although not perfect), More mobile specific enhancements will be made in future.
:white_check_mark: | Service Worker | Now all the assets will be cached locally so you can use this app with slow internet connections (all the data still loads from server).
:white_check_mark: | Add To Device | The app is responsive in mobile devices (although not perfect), More mobile specific enhancements will be made in future.
[ ] | Offline Support | Make the app work without internet (coming soon).


## Feature Requests

I am open to feature requests, If you have any specific feature in mind which you think might be helpful to the community as well, Just `create a new issue` or `email me`.

