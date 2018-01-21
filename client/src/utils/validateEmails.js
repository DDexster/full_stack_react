const REG_EXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
    const invalidEmails = emails.split(',').map(email => email.trim()).filter(email => !REG_EXP.test(email));

    return invalidEmails.length ? `These emails are invalid: ${invalidEmails}` : null;
};