// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("key");

const sendEmail = () => {
    client.sendEmail({
        "From": "bamidele.ajewole@stanbicibtc.com",
        "To": "bamideledavid.ajewole@gmail.com",
        "Subject": "Hello from Postmark",
        "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
        "TextBody": "Hello from Postmark!",
        "MessageStream": "outbound"
    });
}

export {
    sendEmail,
}
