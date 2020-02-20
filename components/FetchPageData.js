const { GraphQLClient } = require("graphql-request");

const FetchPageData = async (context, route = "About", extraData) => {
  const query = `
    query PageContent($label: String){
      page(where: {
          label: $label
      }) {
          content
          }
          ${extraData ? extraData : ""}
      }
    `;

  const graphQLClient = new GraphQLClient(`${process.env.URL}/api/graphql`);

  const request = await graphQLClient.request(query, {
    label: route
  });

  return request;
};

export default FetchPageData;
