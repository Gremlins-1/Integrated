// Require the Bolt package (github.com/slackapi/bolt)
const { App: Index } = require("@slack/bolt");

const app = new Index({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});



// All the room in the world for your code



(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
//Start of thing for the app home. Not sure if it works. Hosting this thing seems to be an issue. Came from the glitch page? All done by the guide.
// app.event('app_home_opened', async ({ event, context }) => {
//     try {
//         /* view.publish is the method that your app uses to push a view to the Home tab */
//         const result = await app.client.views.publish({
//
//             /* retrieves your xoxb token from context */
//             token: context.botToken,
//
//             /* the user that opened your app's app home */
//             user_id: event.user,
//
//             /* the view payload that appears in the app home*/
//             view: {
//                 type: 'home',
//                 callback_id: 'home_view',
//
//                 /* body of the view */
//                 blocks: [
//                     {
//                         "type": "section",
//                         "text": {
//                             "type": "mrkdwn",
//                             "text": "*Welcome to your _App's Home_* :tada:"
//                         }
//                     },
//                     {
//                         "type": "divider"
//                     },
//                     {
//                         "type": "section",
//                         "text": {
//                             "type": "mrkdwn",
//                             "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
//                         }
//                     },
//                     {
//                         "type": "actions",
//                         "elements": [
//                             {
//                                 "type": "button",
//                                 "text": {
//                                     "type": "plain_text",
//                                     "text": "Click me!"
//                                 }
//                             }
//                         ]
//                     }
//                 ]
//             }
//         });
//     }
//     catch (error) {
//         console.error(error);
//     }
// });
// End of the event listener for the home app stuff
// Commenting it out changes nothing...so it is broken
