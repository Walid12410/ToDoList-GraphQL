import gql from "apollo-server-express";

const userTypeDefs = gql`
    type User {
        _id: ID!,
        username: String!,
        email: String!,
        number: Int!,
        password: String!,
        ToDos: [ToDo]
    }

    type AuthPayload {
        token: String!,
        user: User!
    },

    input SignupInput {
        username: String!,
        email: String!,
        number: Int!,
        password: String!
    },

    input LoginInput {
        email: String!,
        password: String!
    }

    input EditProfileInput {
        username: String,
        number: Int,
        password: String
    },

    type Query {
        getUser(id: ID!): User
    }

    type Mutation {
        signup(input: SignupInput!): AuthPayload!
        login(input: LoginInput!) : AuthPayload!
        editProfile(input: EditProfileInput!,id: ID!) : User!
    }
`;

export default userTypeDefs;