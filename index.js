require('dotenv').config();//grab env vers from the .env but idk if this is necessary

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        axios.post('https://slack.com/api/dialog.open', qs.stringify(dialogData)).then((result) => {
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

    }
});