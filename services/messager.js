module.exports = ({ subject, recipients }, content) => {
    return {
        from: 'no-reply@surveyve.com',
        subject: subject,
        to: _formatAddresses(recipients),
        html: content,
        trackingSettings: {
            clickTracking: {
                enable: true
            }
        }
    }
}

const _formatAddresses = recipients => {
    return recipients.map(({ email }) => email);
}
// const sendGrid = require('sendgrid');
// const helper = sendGrid.mail;
// const keys = require('../config/keys');
//
//
// class Mailer extends helper.Mail {
//     constructor({ subject, recipients }, content) {
//         super();
//
//         this.sgApi = sendGrid(keys.sendGridKey);
//         this.from_email = new helper.Email('no-reply@surveyve.com');
//         this.subject = subject;
//         this.body = new helper.Content('text/html', content);
//         this.recipients = this.formatAddresses(recipients);
//
//         this.addContent(this.body);
//         this.addClickTracking();
//         this.addRecipients();
//     }
//
//     formatAddresses(recipients) {
//         return recipients.map(({ email }) => {
//             return new helper.Email(email);
//         });
//     }
//
//     addClickTracking() {
//         const trackingSettings = new helper.TrackingSettings();
//         const clickTracking = new helper.ClickTracking();
//
//         trackingSettings.setClickTracking(clickTracking);
//         this.addTrackingSettings(trackingSettings);
//     }
//
//     addRecipients() {
//         const personalize = new helper.Personalization();
//
//         this.recipients.forEach(recipient => {
//             personalize.addTo(recipient);
//         });
//
//         this.addPersonalization(personalize);
//     }
//
//     async send() {
//         const request = this.sgApi.emptyRequest({
//             method: 'POST',
//             path: '/v3/mail/send',
//             body: this.toJSON()
//         });
//
//         console.log(request.body);
//
//         const response = this.sgApi.API(request, function(err, response) {
//             console.log(err, response);
//             if (!err) {
//                 console.log("OK!");
//             } else {
//                 console.log("Error", err);
//             }
//         });
//         return response;
//     }
// }
//
// module.exports = Mailer;
//
