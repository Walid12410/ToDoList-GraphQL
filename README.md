# ToDo List Application

A simple ToDo list application built with **GraphQL**, **Express.js**, and **MongoDB**. The app includes user authentication via JWT (JSON Web Token), allowing users to register, log in, and manage their tasks securely.

## Features

- **User Authentication**: Sign up, login, and token-based authentication using JWT.
- **GraphQL API**: Fetch and manage tasks and user data with GraphQL queries and mutations.
- **MongoDB**: A NoSQL database for storing user data and tasks.
- **Task Management**: Users can create, update, and delete tasks, and track task completion status.
- **Pagination**: Ability to paginate the user’s ToDo list using query parameters.

## Technologies Used

- **GraphQL**: Query language for your API and runtime for executing those queries.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user and task data.
- **JWT (JSON Web Token)**: Authentication system using tokens to secure endpoints.
- **Mongoose**: MongoDB object modeling tool for Node.js.

## Getting Started

To get a copy of the project up and running on your local machine for development and testing, follow these steps.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (LTS version)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or MongoDB Atlas)
- [Postman](https://www.postman.com/) (optional for testing API endpoints)

### Installing

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/ToDoList-GraphQL.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ToDoList-GraphQL-app
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file to store your environment variables (for example, MongoDB URI, JWT secret):

    ```bash
    touch .env
    ```

    Example `.env` file:

    ```env
    MONGO_URI=mongodb://localhost:27017/todolist
    JWT_SECRET=your_jwt_secret_key
    PORT=4000
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

Your server should now be running at `http://localhost:4000`.

## API Endpoints

### Authentication

- **Sign Up** (Mutation): `mutation signup(input: SignupInput!)`
- **Login** (Mutation): `mutation login(input: LoginInput!)`

### User Queries

- **Get User** (Query): `query getUser(id: ID!)`
  - Returns user data along with their ToDo list.

### ToDo Queries & Mutations

- **Create ToDo** (Mutation): `mutation createToDo(input: CreateToDoInput)`
  - Creates a new ToDo task for the authenticated user.
  
- **Update ToDo** (Mutation): `mutation updateToDo(input: UpdateToDoInput, id: ID!)`
  - Updates a specific ToDo task with the provided ID.

- **Delete ToDo** (Mutation): `mutation deleteToDo(id: ID!)`
  - Deletes a specific ToDo task with the provided ID.
  
- **Get User’s ToDo List** (Query): `query userToDoList(userId: ID!, page: Int = 1, limit: Int = 10)`
  - Returns the list of ToDo tasks for a given user with pagination support.

- **And More...**
