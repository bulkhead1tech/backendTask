import mongoose from "mongoose";

const task = mongoose.Schema({
    title: {
      type: String,
      required: true,
      },
    description: {
        type: String,
        required: true
      },
    deadline:{
        type: Date,
        required:true
    },
    priority:{
        type: Number,
        default: 0,
    },
    progress:{
        type:Boolean,
        default:false,
    }
 


}, {collection: "task"});
mongoose.models= {};
const Task = mongoose.model('task', task);
export default Task