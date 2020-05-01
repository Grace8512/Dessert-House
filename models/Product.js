const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Product = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        require: true,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model("Product", Product);
