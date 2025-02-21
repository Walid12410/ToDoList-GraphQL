import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import userTypeDefs from "./typeDefs/userTypeDefs.js";
import toDoTypeDefs from "./typeDefs/toDoTypeDefs.js";
import userResolvers from "./resolvers/userResolvers.js";
import toDoResolvers from "./resolvers/todoResolvers.js";
import taskTypeDefs from "./typeDefs/taskTypeDefs.js";
import taskResolvers from "./resolvers/taskResolvers.js";


const typeDefs = mergeTypeDefs([userTypeDefs,toDoTypeDefs,taskTypeDefs]);
const resolvers = mergeResolvers([userResolvers,toDoResolvers,taskResolvers]);

export {
    typeDefs,
    resolvers
}