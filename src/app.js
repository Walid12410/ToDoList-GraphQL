import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql";

dotenv.config();

// Connect to database
connectToDB();

const app = express();
app.use(express.json());

app.use(cors({
    credential : true
}));

// ✅ Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }) // ✅ Allows setting cookies & auth
});

// ✅ Apply middleware before starting the server
await server.start();
server.applyMiddleware({ app, cors: false });


app.listen(process.env.PORT,()=> {
    console.log(`Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`);
});