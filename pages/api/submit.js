const { graphQLClient } = require("./_client");

const mutation = `
mutation CreateSubscriber($fullName:String, $email:String) {
    upsertPeople(where: {
      email: $email
    }, create :{
      status: PUBLISHED,
      fullName: $fullName,
      subscriber: true
      email: $email
    }, update :{
      fullName: $fullName,
      email: $email
    }) {
      fullName
    }
  }
`;

module.exports = async (req, res) => {
  try {
    res.status(201).send(await graphQLClient.request(mutation, req.body));
  } catch ({ status = 500, message, ...rest }) {
    res.status(status).json({ status, message });
  }
};
