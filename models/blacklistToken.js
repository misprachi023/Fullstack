const mongoose=require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    }
});
const BlacklistTokenModel = mongoose.model("blacklist", blacklistTokenSchema);
module.exports = BlacklistTokenModel