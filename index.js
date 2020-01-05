//below this works in browser on local but not on slack
// var express=require('express');
// var app=express();
// var PORT = 1229;
// var server = app.listen(PORT, function () {
//
// });
// app.route("/command").get(function(req,res) {
//     res.send("Test success.");
// })
//
// app.route("/report").get(function(req,res){
//     res.send("Report success.");
// })
//
// app.get('/', function (req, res) {
//     res.send("Hello World!");
// });
//above this works in browser on local but not on slack



//ABOVE THIS IS FROM SCRATCH STRAIGHT FROM NODE DOCS!!!
// // First we need to import the HTTP module. This module contains all the logic for dealing with HTTP requests.
// var http = require('http');
//
// // We define the port we want to listen to. Logically this has to be the same port than we specified on ngrok.
// const PORT=4390;
//
// // We create a function which handles any requests and sends a simple response.
// //I think this is the problem....literally fires everytime
//
// function handleRequest(request, response){
//     //.end || .send
//     response.send('Im supposed to handle things not post all the time. -  Path Hit: ' + request.url);
// }
//
// // We create the web server object calling the createServer function. Passing our request function onto createServer guarantees the function is called once for every HTTP request that's made against the server
// var server = http.createServer(handleRequest);
//
// // Finally we start the server
// server.listen(PORT, function(){
//     // Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://localhost:%s", PORT);
// });
// //everything in below this must be commented out to start express server.
// // Import express and request modules
// var express = require('express');
// var request = require('request');
//
//
// // Instantiates Express and assigns our app variable to it
// var app = express();
//
//
// // define a port we want to listen to
// const PORTTWO=4391;
//
// // Lets start our server
// app.listen(PORTTWO, function () {
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Frankenstein's Monster listening on port " + PORTTWO);
// });
//
//
// // This route handles GET requests to our root ngrok address and responds with the "Ngrok is working message" now says "Hello...."
// app.get('/', function(req, res) {
//     res.send('Hello! Path Hit: ' + req.url);
// });

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
//This is not functional rn.
// app.get('/oauth', function(req, res) {
//     // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
//     if (!req.query.code) {
//         res.status(500);
//         res.send({"Error": "Looks like we're not getting code."});
//         console.log("Looks like we're not getting code.");
//     } else {
//         // If it's there...
//
//         // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
//         request({
//             url: 'https://slack.com/api/oauth.access', //URL to hit
//             qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
//             method: 'GET', //Specify the method
//
//         }, function (error, response, body) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 res.json(body);
//
//             }
//         })
//     }
// });

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
// app.post('/command', function(req, res) {
//     res.send('Report!');
// });


//above this is stuff for hosting through ngrok
const { App } = require('@slack/bolt');
const store = require('./store');

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
});
//
//
//
// app.event('app_home_opened', ({ event, say }) => {
//     // Look up the user from DB
//     let user = store.getUser(event.user);
//
//     if(!user) {
//         user = {
//             user: event.user,
//             channel: event.channel
//         };
//         store.addUser(user);
//
//         say(`Hello <@${event.user}>! I am Romulus. I am currently in development.`);
//     } else {
//         say(`Today is I can't get date to work.`);
//     }
// });
//
//
//
// // Start your app
// (async () => {
//     await app.start(process.env.PORT || 3000);
//     console.log('⚡️ Bolt app is running!');
// })();
// //THIS WORKSSSS!!!!!!!
// app.message('%whoWasRomulus', ({ say }) => say("Romulus was the legendary founder and first king of Rome. Various traditions attribute the establishment of many of Rome's oldest legal, political, religious, and social institutions to Romulus and his contemporaries."));
// //THIS WORKKKKSS!!!!!!!^
// //THIS WORKSSSS!!!!!!!
// app.message(/open the (.*) doors/i, ({ say, context }) => {
//     const doorType = context.matches[1];
//
//     const text = (doorType === 'pod bay') ?
//         'I’m afraid I can’t let you do that.' :
//         `Opening ${doorType} doors`;
//
//     say(text);
// });
//
// //THIS WORKSSSS!!!!!!!
// app.message('%squirrelThis', async ({ message, context }) => {
//     try {
//         await app.client.reactions.add({
//             token: context.botToken,
//             name: 'squirrel',
//             channel: message.channel,
//             timestamp: message.ts,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });
// //THIS WORKKKKSS!!!!!!!^
// //THIS WORKSSSS!!!!!!!
// const music = ["https://www.youtube.com/watch?v=2TvWZEVf6go", "https://www.youtube.com/watch?v=y7e-GC6oGhg", "https://www.youtube.com/watch?v=8c9yOlPVpak", "https://www.youtube.com/watch?v=TDcJJYY5sms"];
//
// const randomMusic = () => music[Math.floor(Math.random() * music.length)];
// //THIS IS HOW YOU GET THE RESULT OF THE FUNCTION TO BE POSTED
// app.message('%music', ({ say }) => say(randomMusic()));
// // app.event('app_mention', ({ say }) => say(randomMusic()));
// //THIS WORKKKKSS!!!!!!!^
//
// const enterReplies = ["Welcome!", "Howdy!", "Hello friend.", "Gotcha", "Hello there.", "I see you"]
// const leaveReplies = ['Goodbye', 'Adios', 'Uh oh']
//
//
// const randomEnterReply = () => enterReplies[Math.floor(Math.random() * enterReplies.length)];
// const randomLeaveReply = () => leaveReplies[Math.floor(Math.random() * leaveReplies.length)];
//
// app.event('member_joined_channel', ({ say }) => say(randomEnterReply()));
// app.event('member_left_channel', ({ say }) => say(randomLeaveReply()));