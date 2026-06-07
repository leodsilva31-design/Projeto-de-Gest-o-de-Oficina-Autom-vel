const mongoose = require("mongoose");

const interventionSchema = new mongoose.Schema({
    mechanic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mechanic",
        required: true
    },

    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    duration: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Intervention", interventionSchema);