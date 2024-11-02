const Todo = require('../models/todo');
const User = require('../models/User');

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status, priority, tags, createdBy } = req.body;

        const savedTask = await Todo.create({ title, description, dueDate, status, priority, tags, createdBy });

        const updateValue = await User.findByIdAndUpdate(createdBy, { $push: { tasks: savedTask._id } }, { new: true }).populate('tasks').exec()
        res.status(201).json(
            {
                success: true,
                data: updateValue,
                message: "task Created Successfully"
            }
        )
    } catch (err) {
        console.error(err);
        res.status(500).json(
            {
                success: false,
                message: "Server side Error"
            }
        )
    }

}


exports.getTasks = async(req, res)=>{
    try{
        const users = await User.find().populate("tasks")
        console.log(users);
        res.status(200).json(
            {
                success: true,
                message: "All post fetched successfully",
                data: users
            }
        )
    }catch(err){
        console.error(err);
        res.status(404).json(
            {
                success: false,
                message: "Data not found"
            }
        )
    }
}

exports.updateStatus = async(req, res) =>{
    try{
        const {id, status}  = req.body;
        const updatedTask = await Todo.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }
        res.status(200).json({
            success: true,
            message: "Task status updated successfully.",
            data: updatedTask
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

exports.deleteTask = async(req, res)=>{
    try{
        const {userId, taskId} = req.body;
        const deletedTask = await Todo.findByIdAndDelete({user: userId, _id:taskId});
        const updated = await User.findByIdAndUpdate(userId, {$pull: {tasks: deletedTask._id}}, {new: true})
        res.status(200).json(
            {
                success: true,
                data:updated,
                message: "task deleted Successfully"
            }
        )
    }
    catch(err){
        console.error(err);
        res.status(500).json(
            {
                success: false,
                message: "Data not deleted"
            }
        )
    }
}


