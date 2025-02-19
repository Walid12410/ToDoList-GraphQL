import Joi from "joi";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        required: false,
        minLength: 6,
        maxLength: 20
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 8,
        maxLength: 20
    }
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);

function validationSignup(obj) {
    const schema = Joi.object({
        username : Joi.string().min(2).max(50).trim().required(),
        email: Joi.string().email(),
        number: Joi.number().min(6).max(20).trim().required(),
        password: Joi.string().min(8).max(20).trim().required()
    });

    return schema.validate(obj);
}


function validationLogin(obj) {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(8).max(20).trim().required()
    });

    return schema.validate(obj);
}

function validationUpdateUser(obj) {
    const schema = Joi.object({
        username : Joi.string().min(2).max(50).trim().optional(),
        number: Joi.number().min(6).max(20).trim().optional(),
        password: Joi.string().min(8).max(20).trim().optional(),
    });

    return schema.validate(obj);
}


export {
    User,
    validationSignup,
    validationLogin,
    validationUpdateUser
};