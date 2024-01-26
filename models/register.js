const monogoose=require("mongoose");

const userSchema = new monogoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,

    },
    dob:String,
    gender:String,
    password: {
        type: String,
        required: true,
    },
});
const UserModel = monogoose.model("user", userSchema);
module.exports = UserModel