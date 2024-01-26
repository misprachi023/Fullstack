const mongoose=require("mongoose");

const noteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    id: String,
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const NotesModel = mongoose.model("note", noteSchema);
module.exports = NotesModel
