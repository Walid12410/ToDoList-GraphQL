import Joi from "joi";
import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    toDoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDo",
        required: true
    },
    title: {
        type: String,
        minLength: 1,
        maxLength: 200,
        trim: true,
        required: true
    },
    description: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        require: true
    }
}, { timestamps: true })


const Task = mongoose.model("Task",TaskSchema);


function validationCreateTask(obj) {
    const schema = Joi.object({
        toDoId: Joi.required(),
        title: Joi.string().min(1).max(200).trim().required(),
        description: Joi.string().min(1).trim().required(),
        status: Joi.string().min(1).max(50).trim().required()
    });

    return schema.validate(obj);
} 

function validationUpdateTask(obj) {
    const schema = Joi.object({
        title: Joi.string().min(1).max(200).trim().optional(),
        description: Joi.string().min(1).trim().optional(),
        status: Joi.string().min(1).max(50).trim().optional()
    });

    return schema.validate(obj);
} 


export { 
    Task,
    validationCreateTask,
    validationUpdateTask
}