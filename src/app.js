import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql/index.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

// Connect to database
connectDB();

const app = express();
// app.use(express.json());

// app.use(cors({
//     origin: "*",
//     credentials : true
// }));


// ✅ Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }) // ✅ Allows setting cookies & auth
});

// ✅ Apply middleware before starting the server
await server.start();
server.applyMiddleware({ app, cors: { origin: "*", credentials: true } });


app.listen(process.env.PORT,()=> {
    console.log(`Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`);
});