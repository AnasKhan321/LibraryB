const mongoose = require("mongoose");

const BorrowSchema = mongoose.Schema({
    uemail: {
        type:String,
        required: true
    },
    bid : {
        type: String,
        required : true
    },
   
    date: {
        type: Date,
        default: Date.now,
    },
});
const Borrow = mongoose.model("borrow", BorrowSchema);

module.exports = Borrow; 