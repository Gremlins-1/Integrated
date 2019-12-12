// // import http module
// var http = require('http');
//
// // ngrok listener port. consider updating this to 443 for TLS?
// const PORT=1229;
//
// // requests come in and response.end goes out. this works with slash commands but for it to work with Events API i need to get it to send back the proper challenge.
// function handleRequest(request, response){
//     response.end('Ngrok is working! -  Path Hit: ' + request.url);
// }
//
// //serve is created by passing handleRequest look above...into the createServer method. Function is called with every HTTP request.
// var server = http.createServer(handleRequest);
//
// // start server?
// server.listen(PORT, function(){
//     // Callback triggered when server is successfully listening.?
//     console.log("Server listening on: http://localhost:%s", PORT);
// });
// //import express and request
// var express = require('express');
// var request = require('request');
// // instantiates express and assigns it to the const app was originally var
// const app = express();
//
//
// // Again, we define a port we want to listen to
//
//
// // start app?
// app.listen(PORT, function () {
//     //Callback triggered when app is successfully listening?
//     console.log("Example app listening on port " + PORT);
// });
//
//
// // This route handles GET requests to our root (NOTICE THE '/') ngrok address and responds with the same "Ngrok is working message" we used before. MAYBE THIS IS THE ONE FOR CHALLENGE.
// app.get('/', function(req, res) {
//     res.send('Ngrok is working! Path Hit: ' + req.url);
// });
//
// // This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
// //OAUTH IS SUPER GREAT BUT IS NOT A CONCERN AT THIS PHASE.
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
//             qs: {code: req.query.code, client_id: process.env.SLACK_CLIENT_ID, client_secret: process.env.SLACK_CLIENT_SECRET}, //Query string data
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
//
// // Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
// app.post('/command', function(req, res) {
//     res.send('Your ngrok tunnel is up and running!');
// });
//


// above this is the express server for /commands it is hosted on my machine using ngrok
//
//
//
//
// // below this line is turned on for events and is used inside glitch rn
// //
// //
// //
// // start the party by creating the App CLASS? and requiring all the awesome slack API's. they are part of the bolt framework. refer to package-lock if interested.
// const { App } = require('@slack/bolt');
// //require our store that we have not made yet.
// const store = require('./store');
// //instantiate the object app as a member of the App class. pass in an object with our private key for signing messages and our OAUTH bot token. we are using the environment variables to do this so we dont blast our keys/tokens to the world. Be sure to put .env in the .gitignore
// const app = new App({
//     signingSecret: process.env.SLACK_SIGNING_SECRET,
//     token: process.env.SLACK_BOT_TOKEN
// });
//
//
// //
// //
// //
// //
// //uses the event api listener to trigger on the app_home_opened eventName. the function takes in the event then calls the function.
// app.event('app_home_opened', ({ event, say }) => {
//     // Look up the user from DB. This will work one day but today is not that day. An interesting note is that there seems to be some cache. I have not timed it but for a few mins/hours the system believes user is true. (click the app a bunch and watch). the app home functionality is not turned on and it is in beta. what is funny is that this still works for dms to the app.
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
// // Start your app with async. Based on the watching a youtube vid from JSConf this allows the app to start but makes it wait outside of the stack within the web api, once the async timer expires it then goes to the queue where it waits for the stack to be clear before executing.
// (async () => {
//     await app.start(process.env.PORT || 3000);
//     console.log('⚡️ Bolt app is running!');
// })();
// //THIS WORKSSSS!!!!!!!
// app.message('%whoWasRomulus', ({ say }) => say("Romulus was the legendary founder and first king of Rome. Various traditions attribute the establishment of many of Rome's oldest legal, political, religious, and social institutions to Romulus and his contemporaries."));
// //THIS WORKKKKSS!!!!!!!^
// //THIS WORKSSSS!!!!!!!
// app.message(/this is the (.*)/i, ({ say, context }) => {
//     const mando = context.matches[2];
// //make this send a picture of mando if correct.
//     const text = (mando === 'way') ?
//         'This is the way.' :
//         `We do not take Imperial Credits here`;
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
