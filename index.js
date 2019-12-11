const { App } = require('@slack/bolt');
const store = require('./store');

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
});



app.event('app_home_opened', ({ event, say }) => {
    // Look up the user from DB
    let user = store.getUser(event.user);

    if(!user) {
        user = {
            user: event.user,
            channel: event.channel
        };
        store.addUser(user);

        say(`Hello <@${event.user}>! I am Romulus. I am currently in development.`);
    } else {
        say(`Today is I can't get date to work.`);
    }
});



// Start your app
(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();
//THIS WORKSSSS!!!!!!!
app.message('%whoWasRomulus', ({ say }) => say("Romulus was the legendary founder and first king of Rome. Various traditions attribute the establishment of many of Rome's oldest legal, political, religious, and social institutions to Romulus and his contemporaries."));
//THIS WORKKKKSS!!!!!!!^
//THIS WORKSSSS!!!!!!!
app.message(/open the (.*) doors/i, ({ say, context }) => {
    const doorType = context.matches[1];

    const text = (doorType === 'pod bay') ?
        'I’m afraid I can’t let you do that.' :
        `Opening ${doorType} doors`;

    say(text);
});

//THIS WORKSSSS!!!!!!!
app.message('%squirrelThis', async ({ message, context }) => {
    try {
        await app.client.reactions.add({
            token: context.botToken,
            name: 'squirrel',
            channel: message.channel,
            timestamp: message.ts,
        });
    } catch (error) {
        console.error(error);
    }
});
//THIS WORKKKKSS!!!!!!!^
//THIS WORKSSSS!!!!!!!
const music = ["https://www.youtube.com/watch?v=2TvWZEVf6go", "https://www.youtube.com/watch?v=y7e-GC6oGhg", "https://www.youtube.com/watch?v=8c9yOlPVpak", "https://www.youtube.com/watch?v=TDcJJYY5sms"];

const randomMusic = () => music[Math.floor(Math.random() * music.length)];
//THIS IS HOW YOU GET THE RESULT OF THE FUNCTION TO BE POSTED
app.message('%music', ({ say }) => say(randomMusic()));
// app.event('app_mention', ({ say }) => say(randomMusic()));
//THIS WORKKKKSS!!!!!!!^

const enterReplies = ["Welcome!", "Howdy!", "Hello friend.", "Gotcha", "Hello there.", "I see you"]
const leaveReplies = ['Goodbye', 'Adios', 'Uh oh']


const randomEnterReply = () => enterReplies[Math.floor(Math.random() * enterReplies.length)];
const randomLeaveReply = () => leaveReplies[Math.floor(Math.random() * leaveReplies.length)];

app.event('member_joined_channel', ({ say }) => say(randomEnterReply()));
app.event('member_left_channel', ({ say }) => say(randomLeaveReply()));
