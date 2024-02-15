const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    logourl: {
        type: String,
        required: true,
    },
    /*refuserid: {
        type: mongoose.Types.ObjectId,
        //required: true,
    },*/
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    skills: [String],
    type: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Job", jobSchema);
