const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
    content : { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Comment", CommentSchema);