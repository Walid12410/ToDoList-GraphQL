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
},{timestamps: true});


const ToDo = mongoose.model("ToDo",ToDoSchema);
export default ToDo;