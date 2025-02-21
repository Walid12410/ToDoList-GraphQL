
const taskTypeDefs = `
    type Task {
        _id: ID!,
        toDoId: ID!,
        title: String!,
        description: String!,
        status: String!,
    },

    input CreateTask {
        toDoId: ID!,
        title: String!,
        description: String!,
        status: String!
    },

    input UpdateTask {
        title: String,
        description: String,
        status: String
    },

    type Mutation {
        createTask(input: CreateTask): Task!,
        updateTask(input: UpdateTask, id: ID!): Task!,
        deleteTask(id: ID!): Boolean!
    }
`;

export default taskTypeDefs;