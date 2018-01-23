const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const messager = require('../services/messager');
const emailTemplate = require('../services/emailTemplates/emailTemplate');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

const Survey = mongoose.model('survey');

module.exports = app => {
    app.get('/api/surveys/:surveyID/:choice', (req, res) => {
       res.send("Thank you for your vote!");
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, body, subject, recipients } = req.body;

        // Create Survey instance
        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        //Pass survey to mailer object
        const message = await messager(survey, emailTemplate(survey));

        //Send the survey
        sgMail.setApiKey(keys.sendGridKey);
        try {
            await sgMail.send(message);
            console.log("Survey sent:", message);

            await survey.save();

            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            console.error("Error: ", err);
            res.status(422).send(err);
        }
    });

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
                                    .select({ recipients: false });
        res.send(surveys);
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        // Create path matcher        
        const p = new Path('/api/surveys/:surveyId/:choice');
        // Map through webhook events and make an formatted array of usefull data
        // (then) Clear an array from 'undefined' data
        // (then) Remove duplicate records
        // (then) Process surveys with claryfied events
        _.chain(req.body)
            .map(body => {
                const match = p.test(new URL(body.url).pathname);
                if (match) {
                    return { email: body.email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }
                ).exec();
            }).values();

        res.send({});
    });
}