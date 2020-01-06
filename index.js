require('dotenv').config();//grab env vers from the .env but idk if this is necessary

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const signature = require('./verify-signature');
const app = express();

const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

const server = app.listen(5000); //port to listen on

//on post req on actions path
app.post('actions', (req, res) => {
    //payload var is the payload property within the body key of the req obj.
   const payload = JSON.parse(req.body.payload);
   // destruct...set 3 vars extracting the properties from the payload var.
   const {type, user, submission} = payload;

   //verify the request. if its not verified send a 404 status..why not set?
    if (!signature.isVerified(req)) {
        res.sendStatus(404);
        return;
    }

    if (type === 'message_action') {
        //open dialog with bot
        const dialogData = {
            token: process.env.SLACK_BOT_TOKEN,
            trigger_id: payload.trigger_id,
            dialog: JSON.stringify({
                title: 'SaveIt',
                callback_id: 'saveit',
                submit_label: 'SaveIt'
                elements: [
                    {
                        label: 'Message Text',
                        type: 'textarea',
                        name: 'message'
                        value: payload.message.text
                    },
                    {
                        label: 'Importance',
                        type: 'select',
                        name: 'importance',
                        value: 'Medium 💎',
                        options: [
                            {label: 'High', value: 'High 💎💎✨'}
                            { label: 'Medium', value: 'Medium 💎' },
                            { label: 'Low', value: 'Low ⚪️' }
                        ],
                    },
                ]
            })
        };
        //open the dialog by calling dialogs.open methdd and sending the payload
        axios.post('https://slack.com/api/dialog.open', qs.stringify(dialogData))
            .then((result) => {
                if(result.data.error) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    } else if (type === 'dialog_submission') {
        res.send('');

        //save the data in DB. Future functionality?
        db.set(user.id, submission);
        //DM the user a confirmation message
        const attachments = [
            {
                title: 'Saved It!',
                title_link: `http://example.com/${user.id}/clip`,
                fields: [
                    {
                        title: 'Message',
                        value: submission.message
                    },
                    {
                        title: 'Importance',
                        value: submission.importance,
                        short: true
                    },
                ],
            },
        ];
        const message = {
            token: process.env.SLACK_BOT_TOKEN,
            channel: user.id,
            as_user: true, //bot user
            attachments: JSON.stringify(attachments);
        };
        axios.post('https://slack.com/api/chat.postMessage', qs.stringify(message))
            .then((result => {
                console.log(result.data);
            }))
            .catch((err) => {
                console.log(err);
            })
    }
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});