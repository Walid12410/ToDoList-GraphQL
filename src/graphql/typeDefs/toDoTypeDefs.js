import gql from "apollo-server-express";

const toDoTypeDefs = gql`
    type ToDo {
        _id: ID!,
        title: String!,
        description: String!,
        userId: User!,
        completed: Boolean!,
        tasks: [Task]
    }

    input CreateToDoInput {
        title: String!,
        description: String!,
        userId: String!,
        completed: Boolean!
    },

    input UpdateToDoInput {
        title: String,
        description: String,
        completed: Boolean
    },

    type Query {
        userToDo(userId: ID!): [ToDo!]!
    },

    type Mutation {
        createToDo(input: CreateToDoInput): ToDo!
        updateToDo(input: UpdateToDoInput): ToDo!
        deleteToDo(_id: ID!): Boolean!
    }
`;


export default toDoTypeDefs;