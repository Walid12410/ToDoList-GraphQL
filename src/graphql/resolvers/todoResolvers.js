import { ApolloError } from "apollo-server-express"
import { validationCreateToDo, validationUpdateToDo,ToDo } from "../../model/todo.js";
import { User } from "../../model/user.js";
import mongoose from "mongoose";


const toDoResolvers = {
    Query: {
        userToDoList: async (_, { userId, page, limit }) => {
            try {
                const toDoList = await ToDo.find({ userId: userId })
                    .populate("tasks").populate("user")
                    .skip((page - 1) * limit).limit(limit)
                    .sort({ createdAt: -1 });

                return toDoList;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    },

    Mutation: {
        createToDo: async (_, { input }) => {
            try {
                const { error } = validationCreateToDo(input);
                if (error) throw new ApolloError(error.details[0].message, "400");

                if (!mongoose.Types.ObjectId.isValid(input.userId)) {
                    throw new ApolloError("Invalid user id", "400");
                }

                const user = await User.findById(input.userId);
                if (!user) throw new ApolloError("User not found", "404");

                const newToDo = new ToDo({
                    title: input.title,
                    description: input.title,
                    completed: input.completed,
                    userId: input.userId
                });

                await newToDo.save();

                return newToDo;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        updateToDo: async (_, { input, id }) => {
            try {
                const { error } = validationUpdateToDo(input);
                if (error) return new ApolloError(error.details[0].message, "400");

                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new ApolloError("Invalid todo id", "400");
                }

                const updateToDo = await ToDo.findByIdAndUpdate(id,{
                    $set: {
                        title: input.title,
                        description: input.title,
                        completed: input.completed,
                        userId: input.userId
    
                    }
                },{ new: true });

                if (!updateToDo) throw new ApolloError("Not found", "404");
                return updateToDo;
            } catch (error) {
                throw new ApolloError(error.message, "500")
            }
        },

        deleteToDo: async (_, { id }) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new ApolloError("Invalid todo id");
                }

                const ToDoFound = await ToDo.findById(id);
                if (!ToDoFound) throw new ApolloError("Not found", "404");

                await ToDo.findByIdAndDelete(id);
                return true;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    }
}


export default toDoResolvers;