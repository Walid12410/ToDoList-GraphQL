import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    toDoId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDo",
        required: true
    },
    title : {
        type: String,
        minLength : 1,
        maxLength : 200,
        trim: true,
        required: true
    },
    decription : {
        type: String,
        minLength : 1,
        trim: true,
        required : true
    },
    status: {
        type: String,
        trim: true,
        require: true
    }
},{timestamps : true})


export default mongoose.model("Task",TaskSchema);