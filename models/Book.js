const mongoose = require("mongoose");

const BookScheme = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    desc : {
        type: String,
        required : true
    },
    imageurl : {
        type : String,
        required : true
    },
    status : {
        type:String,
        default: "Available",

    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Book = mongoose.model("book", BookScheme);

module.exports = Book; 