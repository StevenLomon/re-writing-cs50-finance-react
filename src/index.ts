import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import cors from 'cors';

const app: Express = express(); // Typing Express instance
app.use(cors());

// Sample schema
const schema: GraphQLSchema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: (): string => 'Hello world!', // Explicit return type for resolver function
};

app.use(
    'graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true, // Is this a typo?
    })
);

const PORT: number = Number(process.env.PORT) || 4000; // Ensure PORT is a number
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
});