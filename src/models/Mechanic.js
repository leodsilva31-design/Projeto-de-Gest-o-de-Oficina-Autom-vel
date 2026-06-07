const mongoose = require("mongoose");

const mechanicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["mecanico", "gestor"],
        default: "mecanico"
    }
});

module.exports = mongoose.model("Mechanic", mechanicSchema);