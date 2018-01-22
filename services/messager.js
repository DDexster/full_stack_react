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
