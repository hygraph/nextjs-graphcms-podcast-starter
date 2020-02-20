const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  let data = req.body;

  const {
    info: {
      fieldName,
      responseData: { subscriber, confirmed, ...responseData }
    }
  } = data;

  if (fieldName !== "upsertPeople" || !subscriber || confirmed) {
    return res.status(422);
  }

  try {
    let { id, fullName, email } = responseData;

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: `Thanks for signing up! Let's make it official!`,
      text: `Thank you for signing up ${fullName}! Just go to ${process.env.URL}/api/subscription/${id} to make this official!`,
      html: `Thank you for signing up ${fullName}! Just click <a href="${process.env.URL}/api/subscription/${id}">confirm</a> to make this official!`
    };
    await sgMail.send(msg);

    res.send(200);
  } catch ({ status = 500, message }) {
    res.status(status).json({ status, message });
  }
};
