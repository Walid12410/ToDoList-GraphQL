import { ApolloError } from "apollo-server-express";
import { Task, validationCreateTask, validationUpdateTask } from "../../model/task.js"
import { ToDo } from "../../model/todo.js";
import mongoose from "mongoose";


const taskResolvers = {
    Mutation: {
        createTask: async (_, { input }) => {
            try {
                const { error } = validationCreateTask(input);
                if (error) throw new ApolloError(error.details[0].message, "400");

                if (!mongoose.Types.ObjectId.isValid(input.toDoId)) {
                    throw new ApolloError("Invalid id", "400");
                }

                const checkToDo = await ToDo.findOne({ _id: input.toDoId });
                if (!checkToDo) throw new ApolloError("Not found", "404");

                const newTask = new Task({
                    toDoId: input.toDoId,
                    title: input.title,
                    description: input.description,
                    status: input.status
                });

                await newTask.save();

                return newTask;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        updateTask: async (_, { input, id }) => {
            try {
                const { error } = validationUpdateTask(input);
                if (error) throw new ApolloError(error.details[0].message, "400");

                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new ApolloError("Invalid todo id", "400");
                }

                const updateTask = await Task.findByIdAndUpdate(
                    id,
                    { input },
                    { new: true }
                );

                if (!updateTask) throw new ApolloError("Not found", "404");
                return updateTask;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        deleteTask: async (_, { id }) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new ApolloError("Invalid todo id");
                }

                const TaskFound = await Task.findById(id);
                if (!TaskFound) throw new ApolloError("Not found", "404");

                await Task.findByIdAndDelete(id);
                return true;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    }
}

export default taskResolvers;