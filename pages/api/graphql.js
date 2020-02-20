const { ApolloServer } = require("apollo-server-micro");
const fetch = require("node-fetch");
const { HttpLink } = require("apollo-link-http");
const {
  introspectSchema,
  makeRemoteExecutableSchema,
  transformSchema
} = require("graphql-tools");

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req, res, ...args) => {
  if (req.method === "OPTIONS") return res.status(200).send();

  const link = new HttpLink({
    uri: process.env.GRAPHCMS_ENDPOINT,
    useGETForQueries: true,
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_QUERY_TOKEN}`
    },
    fetch
  });

  const gcmsSchema = await introspectSchema(link);

  const schema = makeRemoteExecutableSchema({
    schema: gcmsSchema,
    link
  });

  const apolloServer = new ApolloServer({
    schema
  });

  const handler = apolloServer.createHandler({ path: "/api/graphql" });
  return handler(req, res, ...args);
};
