const { graphQLClient } = require("../../_client");

const mutation = `
mutation ConfirmUnsubscribe($id:ID) {
    updatePeople(where:{
      id: $id
    }, data:{
      confirmed:false
    }) {
      id
      confirmed
      email
    }
  }
`;

module.exports = async (req, res) => {
  try {
    const {
      query: { id }
    } = req;

    res.status(204).send(await graphQLClient.request(mutation, { id }));
  } catch ({ status = 500, message }) {
    res.status(status).json({ status, message });
  }
};
