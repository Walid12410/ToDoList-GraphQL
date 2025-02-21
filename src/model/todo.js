import Joi from "joi";
import mongoose from "mongoose";


const ToDoSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true,
        minLength : 1,
        maxLength : 200,
        trim : true,
    },
    description: {
        type: String,
        required : true,
        minLength : 1,
        trim: true
    },
    completed : {
        type: Boolean,
        required: true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},{
    timestamps: true,
    toJSON : {virtuals : true},
    toObject: {virtuals : true}
});


ToDoSchema.virtual("tasks",{
    ref: "Task",
    localField: "_id",
    foreignField: "toDoId"
});

ToDoSchema.virtual("user",{
    ref: "User",
    localField: "userId",
    foreignField: "_id"
});


const ToDo = mongoose.model("ToDo",ToDoSchema);

function validationCreateToDo(obj) {
    const schema = Joi.object({
        title: Joi.string().min(1).max(200).trim().required(),
        description: Joi.string().min(1).trim().required(),
        completed: Joi.boolean().required(),
        userId: Joi.required()
    });

    return schema.validate(obj);
} 

function validationUpdateToDo(obj) {
    const schema = Joi.object({
        title: Joi.string().min(1).max(200).trim().optional(),
        description: Joi.string().min(1).trim().optional(),
        completed: Joi.boolean().optional(),
    });

    return schema.validate(obj);
} 

export {
    ToDo,
    validationCreateToDo,
    validationUpdateToDo
};