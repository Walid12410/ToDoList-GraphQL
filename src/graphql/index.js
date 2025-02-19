import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import userTypeDefs from "./typeDefs/userTypeDefs";
import toDoTypeDefs from "./typeDefs/toDoTypeDefs";
import userResolvers from "./resolvers/userResolvers";


const typeDefs = mergeTypeDefs([userTypeDefs,toDoTypeDefs]);
const resolvers = mergeResolvers([userResolvers]);

export {
    typeDefs,
    resolvers
}