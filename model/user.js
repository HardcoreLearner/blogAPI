const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname : { type: String, required: true },
    lname : { type: String, required: true },
    email : { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true, enum: ["normal", "author", "admin"], default: "normal" }
});

module.exports = mongoose.model("User", UserSchema);