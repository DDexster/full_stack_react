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

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log(req.body);
        res.send({});
    });
}