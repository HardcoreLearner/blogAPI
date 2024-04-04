const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title : { type: String, required: true },
    date: { type: Date, required: true },
    content : { type: String, required: true },
    published : { type: Boolean, required: true, default: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Post", PostSchema);