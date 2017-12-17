const keys = require('../../config/keys');

module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>${survey.title}</h3>
                    <p>Please leave your feedback</p>
                    <p>${survey.body}</p>  
                    <div>
                        <a href="${keys.redirectLink}/api/surveys/thanks" style="margin-right: 10px">Yes</a>
                        <a href="${keys.redirectLink}/api/surveys/thanks">No</a>
                    </div>
                </div>
            </body>
        </html>`
}