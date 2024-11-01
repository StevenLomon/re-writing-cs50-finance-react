import express, { Express } from 'express';
import { buildSchema, GraphQLSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express'; // Import from graphql-http
import cors from 'cors';

const app: Express = express(); // Typing Express instance
app.use(cors());

// Sample schema
const schema: GraphQLSchema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Resolver
const root = {
    hello: (): string => 'Hello world!', // Explicit return type for resolver function
};

// Using graphql-http's createHandler for Express
app.use('graphql', createHandler({
    schema: schema,
    rootValue: root,
    context: async (req) => ({ req }), // optional context example, if needed
}));

const PORT: number = Number(process.env.PORT) || 4000; // Ensure PORT is a number
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
});