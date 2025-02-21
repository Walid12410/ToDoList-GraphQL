import { ApolloError } from "apollo-server-express";
import { User, validationLogin, validationSignup, validationUpdateUser } from "../../model/user.js";
import { generateToken } from "../../lib/generateToken.js";
import bcrypt from "bcryptjs";
import { ToDo } from "../../model/todo.js";

const userResolvers = {
    Query: {
        getUser: async (_, { id }) => {
            try {
                const user = await User.findById(id);
                if (!user) throw new ApolloError("User not found", "404");

                const userToDo = await ToDo.find({ userId: id })
                    .skip((1 - 1 )* 10).limit(10).populate("tasks");

                // Return the user object along with its associated ToDos
                return {
                    ...user.toObject(),
                    ToDos: userToDo
                };
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    },

    Mutation: {
        signup: async (_, { input }, { res }) => {
            try {
                // validation check
                const { error } = validationSignup(input);
                if (error) throw new ApolloError(error.details[0].message);
                // check user if exists
                const checkUser = await User.findOne({ email: input.email });
                if (checkUser) throw new ApolloError("User already exists", "400");
                // bcrypt password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(input.password, salt);
                // save user
                const newUser = new User({
                    username: input.username,
                    email: input.email,
                    number: input.number,
                    password: hashedPassword
                });
                await newUser.save();
                // create token and return
                const token = generateToken(newUser._id, res);
                return { token, user: newUser };
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        login: async (_, { input }, { res }) => {
            try {
                // validation check
                const { error } = validationLogin(input);
                if (error) throw new ApolloError(error.details[0].message, "400");
                // check user if found
                const checkUser = await User.findOne({ email: input.email });
                if (!checkUser) throw new ApolloError("Incorrect Email Or Password", "400");
                // check password if match
                const isPasswordMatch = await bcrypt.compare(input.password, checkUser.password);
                if (!isPasswordMatch) throw new ApolloError("Incorrect Email Or Password", "400");
                // generate token
                const token = generateToken(checkUser._id, res);
                return { token, user: checkUser };
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        },

        editProfile: async (_, { input, id }) => {
            try {
                const { error } = validationUpdateUser(input);
                if (error) throw new ApolloError(error.details[0].message, "400");

                if (input.password) {
                    const salt = await bcrypt.genSalt(10);
                    input.password = await bcrypt.hash(input.password, salt);
                }

                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    { $set: input },
                    { new: true }
                );

                if (!updatedUser) throw new ApolloError("User not found", "404");
                return updatedUser;
            } catch (error) {
                throw new ApolloError(error.message, "500");
            }
        }
    },

};


export default userResolvers;