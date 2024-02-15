//everything related to jobs will be done here

const express = require('express');
const router = express.Router();
const Job = require("../models/job");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtverify = require("../middleware/authmiddleware");

router.post("/createjob", jwtverify, async (req, res) => {
    try {
        const { companyName, title, description, logourl,
            salary, location, about, information, size, duration,
            skills, type, mode } = req.body;

        if (!companyName || !title || !description || !logourl || !salary || !location || !about
            || !information || !size || !duration || !skills.length || !type || !mode) {
            return res.status(400).json({ errorMessage: "Bad Request" })
        }

        jobdetails = new Job({
            companyName,
            title,
            description,
            logourl,
            salary,
            location,
            about,
            information,
            size,
            duration,
            skills,
            type,
            mode,
            //refuserid: req.body.userId,
        });

        await jobdetails.save();

        res.json({ message: "New job added to database" });

    } catch (error) {
        console.log(error);
    }
});

router.put("/editjob/:jobid", jwtverify, async (req, res) => {
    try {
        const { companyName, title, description, logourl,
            salary, location, about, information, size, duration,
            skills, type, mode } = req.body;

        const jobid = req.params.jobid;

        if (!companyName || !title || !description || !logourl || !salary || !location || !about
            || !information || !size || !duration || !skills.length || !type || !mode) {
            return res.status(400).json({ errorMessage: "Bad Request" })
        }

        await Job.updateOne({ _id: jobid },
            {
                $set: {
                    companyName,
                    title,
                    description,
                    logourl,
                    salary,
                    location,
                    about,
                    information,
                    size,
                    duration,
                    skills,
                    type,
                    mode
                },
            }
        );

        res.json({ message: "Job details updated successfully" });

    } catch (error) {
        console.log(error);
    }
});

router.get("/job-description/:jobId", async (req, res) => {
    try {

        const jobid = req.params.jobId;

        if (!jobid) {
            return res.status(400).json({ errorMessage: "Bad Request" })
        }

        const jobInfo = await Job.findById(jobid);

        res.json({ data: jobInfo });

    } catch (error) {
        console.log(error);
    }
});

router.get("/all", async (req, res) => {
    try {

        const title = req.query.title || "";
        const skills = req.query.skills;
        const filterskills = skills?.split(",");

        let filter = {};

        if (filterskills) {
            filter = { skills: { $in: [...filterskills] } }
        }

        const jobDetails = await Job.find(
            {
                title: { $regex: title, $options: "i" },
                ...filter,
            } //on giving i , it ignores case-sensitivity

            /*{
                companyName : 1,
                _id : 0,
            }*/);


        if (jobDetails.length == 0)
            res.status(404).json({ data: "No such jobs found based on the given filter" });
        else
            res.json({ data: jobDetails });

    } catch (error) {
        console.log(error);
    }
});

router.get("/alljobs", async (req, res) => {
    try {

        const jobDetails = await Job.find();


        if (jobDetails.length == 0)
            res.status(404).json({ data: "No such jobs found based on the given filter" });
        else
            res.json({ data: jobDetails });

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;