import express, { Express } from 'express';
import { buildSchema, GraphQLSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express'; // Import from graphql-http
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

// The type is inferred in the following two lines
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); // Middleware for parsing JSON bodies

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
    context: async (req) => ({ req, prisma }), // Injecting `prisma` into the context
}));

app.get('/', async (req, res) => {
    try {
        // Basic query to test connection
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
})

// Close the Prisma connection when the app terminates
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

const PORT: number = Number(process.env.PORT) || 4000; // Ensure PORT is a number
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);

    try {
        // Insert a test user into the User table
        const testUser = await prisma.user.create({
            data: {
                username: 'testuser',
                hash: 'hashedpassword123',
                cash: 10000.00,
            },
        });
        console.log('Test user created:', testUser);
    } catch (error) {
        console.error('Error inserting test user:', error);
    } finally {
        // Disconnect Prisma after user insertion
        await prisma.$disconnect();
    }
});