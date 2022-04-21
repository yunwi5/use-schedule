const key = process.env.SENDGRID_API_KEY || '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';
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(key);

const client = require("@sendgrid/client");
client.setApiKey(key);

const headers = {
    Authorization: `Bearer ${key}`,
};

async function getBatchId() {
    const request = {
        url: `/v3/mail/batch`,
        method: "POST",
        headers: headers,
    };

    const result = await client
        .request(request)
        .then(([response, body]) => {
            // console.log(response.body);
            return response.body;
        })
        .catch((err) => console.error(err));
    return result.batch_id;
}

async function sendEmail(subject, body) {
    const dateNow = new Date();
    const dateRemindered = addMinutes(dateNow, 1);
    const unixDateInMs = dateRemindered.getTime();
    const unixDateInSeconds = Math.floor(unixDateInMs / 1000);

    const batchId = await getBatchId();
    console.log(`batchId: ${batchId}`);
    // sendgrid send_at should be scheduled with second based UNIX time
    // JavaScript Unix date is in milliseconds, so converting to seconds is required.
    const email = {
        to: "hoyiker360@arpizol.com",
        from: "1009jyk@gmail.com",
        subject: subject, // Price is low or Price is high
        text: body,
        batch_id: batchId,
        send_at: unixDateInSeconds,
        html: body,
    };
    // send email
    await sgMail.send(email);
    // cancel email right after
    // await cancelEmail(batchId);
    console.log('All completed.')
}

async function cancelEmail(batchId) {
    const data = {
        "batch_id": batchId,
        "status": "pause"
    };
    const request = {
        url: `/v3/user/scheduled_sends`,
        method: 'POST',
        headers: headers,
        body: data
    }

    try {
        const result = await client.request(request);
        console.log(result[0].statusCode);
    } catch (err) {
        console.log(err.message);
    }
}

sendEmail("Your task is due today 3!", "Make sure you do the task today!");

function addMinutes(date, minutes) {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(dateCopy.getMinutes() + minutes);
    return dateCopy;
}