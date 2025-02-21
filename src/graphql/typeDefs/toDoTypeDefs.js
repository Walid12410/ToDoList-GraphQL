
const toDoTypeDefs =`
    type ToDo {
        _id: ID!,
        title: String!,
        description: String!,
        userId: ID!,
        completed: Boolean!,
        tasks: [Task]
        user: [User]
    }

    input CreateToDoInput {
        title: String!,
        description: String!,
        userId: ID!,
        completed: Boolean!
    },

    input UpdateToDoInput {
        title: String,
        description: String,
        completed: Boolean
    },

    type Query {
        userToDoList(userId: ID!, page: Int = 1, limit: Int = 10): [ToDo!]!
    },

    type Mutation {
        createToDo(input: CreateToDoInput): ToDo!
        updateToDo(input: UpdateToDoInput, id: ID!): ToDo!
        deleteToDo(id: ID!): Boolean!
    }
`;

export default toDoTypeDefs;